import os
import logging
import redis
from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, request, jsonify, render_template, session, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_caching import Cache
from werkzeug.security import generate_password_hash, check_password_hash
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
import psycopg2
from transformers import pipeline
import requests
import json
from celery import Celery
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Initialize Sentry for error tracking
sentry_sdk.init(
    dsn=os.getenv('SENTRY_DSN'),
    integrations=[
        FlaskIntegration(auto_enabling_integrations=False),
        SqlalchemyIntegration(),
    ],
    traces_sample_rate=1.0,
    environment=os.getenv('FLASK_ENV', 'production')
)

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://localhost/business_magician')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']

# Redis configuration for caching and session management
app.config['CACHE_TYPE'] = 'redis'
app.config['CACHE_REDIS_URL'] = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.from_url(os.getenv('REDIS_URL', 'redis://localhost:6379/1'))

# Celery configuration for background tasks
app.config['CELERY_BROKER_URL'] = os.getenv('REDIS_URL', 'redis://localhost:6379/2')
app.config['CELERY_RESULT_BACKEND'] = os.getenv('REDIS_URL', 'redis://localhost:6379/3')

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
cors = CORS(app, origins=["https://vr4deaf.org", "https://*.vr4deaf.org"])
cache = Cache(app)

# Initialize Redis for JWT blacklist
redis_client = redis.from_url(os.getenv('REDIS_URL', 'redis://localhost:6379/4'))

# Rate limiting
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["1000 per hour", "100 per minute"]
)

# Initialize Celery
def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)
    return celery

celery = make_celery(app)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(name)s %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize AI models
try:
    job_matcher = pipeline("text-classification", model="microsoft/DialoGPT-medium")
    business_advisor = pipeline("text-generation", model="gpt2")
    logger.info("AI models loaded successfully")
except Exception as e:
    logger.error(f"Failed to load AI models: {e}")
    job_matcher = None
    business_advisor = None

# Database Models
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(50), nullable=False, default='job_seeker')
    phone = db.Column(db.String(20))
    disability_type = db.Column(db.String(100))
    accommodation_needs = db.Column(db.Text)
    profile_data = db.Column(db.JSON, default={})
    is_active = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
    two_factor_enabled = db.Column(db.Boolean, default=False)
    two_factor_secret = db.Column(db.String(32))
    last_login = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    job_applications = db.relationship('JobApplication', backref='user', lazy=True)
    business_plans = db.relationship('BusinessPlan', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'user_type': self.user_type,
            'phone': self.phone,
            'disability_type': self.disability_type,
            'accommodation_needs': self.accommodation_needs,
            'profile_data': self.profile_data,
            'is_active': self.is_active,
            'is_verified': self.is_verified,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'created_at': self.created_at.isoformat()
        }

class JobListing(db.Model):
    __tablename__ = 'job_listings'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(255), nullable=False, index=True)
    description = db.Column(db.Text, nullable=False)
    company = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    remote_friendly = db.Column(db.Boolean, default=False)
    salary_range = db.Column(db.String(100))
    job_type = db.Column(db.String(50), default='full-time')
    industry = db.Column(db.String(100), index=True)
    accessibility_features = db.Column(db.JSON, default=[])
    requirements = db.Column(db.JSON, default=[])
    benefits = db.Column(db.JSON, default=[])
    contact_email = db.Column(db.String(255))
    application_deadline = db.Column(db.Date)
    is_active = db.Column(db.Boolean, default=True, index=True)
    vr_approved = db.Column(db.Boolean, default=False)
    deaf_friendly = db.Column(db.Boolean, default=False, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    applications = db.relationship('JobApplication', backref='job', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'company': self.company,
            'location': self.location,
            'remote_friendly': self.remote_friendly,
            'salary_range': self.salary_range,
            'job_type': self.job_type,
            'industry': self.industry,
            'accessibility_features': self.accessibility_features,
            'requirements': self.requirements,
            'benefits': self.benefits,
            'application_deadline': self.application_deadline.isoformat() if self.application_deadline else None,
            'is_active': self.is_active,
            'vr_approved': self.vr_approved,
            'deaf_friendly': self.deaf_friendly,
            'created_at': self.created_at.isoformat()
        }

class BusinessResource(db.Model):
    __tablename__ = 'business_resources'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(255), nullable=False, index=True)
    description = db.Column(db.Text)
    resource_type = db.Column(db.String(50), nullable=False, index=True)
    category = db.Column(db.String(100), index=True)
    content = db.Column(db.Text)
    url = db.Column(db.String(500))
    file_path = db.Column(db.String(500))
    accessibility_features = db.Column(db.JSON, default=[])
    target_audience = db.Column(db.JSON, default=[])
    difficulty_level = db.Column(db.String(20), default='beginner')
    estimated_time = db.Column(db.String(50))
    is_active = db.Column(db.Boolean, default=True, index=True)
    view_count = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'resource_type': self.resource_type,
            'category': self.category,
            'content': self.content,
            'url': self.url,
            'accessibility_features': self.accessibility_features,
            'target_audience': self.target_audience,
            'difficulty_level': self.difficulty_level,
            'estimated_time': self.estimated_time,
            'view_count': self.view_count,
            'rating': self.rating,
            'created_at': self.created_at.isoformat()
        }

class JobApplication(db.Model):
    __tablename__ = 'job_applications'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    job_id = db.Column(db.String(36), db.ForeignKey('job_listings.id'), nullable=False)
    status = db.Column(db.String(50), default='applied', index=True)
    cover_letter = db.Column(db.Text)
    resume_path = db.Column(db.String(500))
    accommodation_requests = db.Column(db.Text)
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'job_id': self.job_id,
            'status': self.status,
            'cover_letter': self.cover_letter,
            'accommodation_requests': self.accommodation_requests,
            'applied_at': self.applied_at.isoformat(),
            'job': self.job.to_dict() if self.job else None
        }

class BusinessPlan(db.Model):
    __tablename__ = 'business_plans'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    business_type = db.Column(db.String(100))
    industry = db.Column(db.String(100))
    target_market = db.Column(db.Text)
    financial_projections = db.Column(db.JSON, default={})
    marketing_strategy = db.Column(db.Text)
    operational_plan = db.Column(db.Text)
    funding_requirements = db.Column(db.JSON, default={})
    accessibility_considerations = db.Column(db.Text)
    vr_eligible = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default='draft')
    completion_percentage = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'business_type': self.business_type,
            'industry': self.industry,
            'target_market': self.target_market,
            'financial_projections': self.financial_projections,
            'marketing_strategy': self.marketing_strategy,
            'operational_plan': self.operational_plan,
            'funding_requirements': self.funding_requirements,
            'accessibility_considerations': self.accessibility_considerations,
            'vr_eligible': self.vr_eligible,
            'status': self.status,
            'completion_percentage': self.completion_percentage,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# JWT Token Blacklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    token_in_redis = redis_client.get(jti)
    return token_in_redis is not None

# Authentication decorators
def role_required(allowed_roles):
    def decorator(f):
        @wraps(f)
        @jwt_required()
        def decorated_function(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if not user or user.user_type not in allowed_roles:
                return jsonify({'error': 'Insufficient permissions'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Background tasks with Celery
@celery.task
def send_email_notification(to_email, subject, body, html_body=None):
    """Send email notification using SMTP"""
    try:
        smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.getenv('SMTP_PORT', '587'))
        smtp_username = os.getenv('SMTP_USERNAME')
        smtp_password = os.getenv('SMTP_PASSWORD')
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = smtp_username
        msg['To'] = to_email
        
        # Add text part
        text_part = MIMEText(body, 'plain')
        msg.attach(text_part)
        
        # Add HTML part if provided
        if html_body:
            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(msg)
        server.quit()
        
        logger.info(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        return False

@celery.task
def process_job_matching(user_id, job_preferences):
    """Background task for AI-powered job matching"""
    try:
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}
        
        # Get user profile and preferences
        profile_text = f"{user.profile_data.get('skills', '')} {user.profile_data.get('experience', '')} {job_preferences}"
        
        # Get active job listings
        jobs = JobListing.query.filter_by(is_active=True).all()
        
        matched_jobs = []
        for job in jobs:
            job_text = f"{job.title} {job.description} {' '.join(job.requirements or [])}"
            
            # Simple matching algorithm (can be enhanced with ML)
            match_score = calculate_job_match_score(profile_text, job_text, user.disability_type)
            
            if match_score > 0.6:  # 60% match threshold
                matched_jobs.append({
                    'job': job.to_dict(),
                    'match_score': match_score,
                    'match_reasons': generate_match_reasons(profile_text, job_text)
                })
        
        # Sort by match score
        matched_jobs.sort(key=lambda x: x['match_score'], reverse=True)
        
        # Cache results
        cache_key = f"job_matches_{user_id}"
        cache.set(cache_key, matched_jobs[:20], timeout=3600)  # Cache for 1 hour
        
        # Send notification to user
        if matched_jobs:
            send_email_notification.delay(
                user.email,
                f"New Job Matches Found - {len(matched_jobs)} opportunities",
                f"We found {len(matched_jobs)} job opportunities that match your profile. Log in to view them.",
                render_template('emails/job_matches.html', user=user, matches=matched_jobs[:5])
            )
        
        return {'matched_jobs': len(matched_jobs), 'top_matches': matched_jobs[:5]}
    except Exception as e:
        logger.error(f"Job matching failed for user {user_id}: {e}")
        return {'error': str(e)}

def calculate_job_match_score(profile_text, job_text, disability_type):
    """Calculate job match score based on profile and job requirements"""
    # Simple keyword matching (can be enhanced with NLP/ML)
    profile_words = set(profile_text.lower().split())
    job_words = set(job_text.lower().split())
    
    common_words = profile_words.intersection(job_words)
    base_score = len(common_words) / max(len(profile_words), len(job_words))
    
    # Boost score for accessibility-friendly jobs
    accessibility_boost = 0.0
    if disability_type == 'deaf-hoh' and any(word in job_text.lower() for word in ['asl', 'sign language', 'deaf', 'accessible']):
        accessibility_boost = 0.2
    
    return min(base_score + accessibility_boost, 1.0)

def generate_match_reasons(profile_text, job_text):
    """Generate reasons why a job matches a user's profile"""
    reasons = []
    profile_words = set(profile_text.lower().split())
    job_words = set(job_text.lower().split())
    
    common_skills = profile_words.intersection(job_words)
    if common_skills:
        reasons.append(f"Matching skills: {', '.join(list(common_skills)[:5])}")
    
    return reasons

# API Routes

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for monitoring"""
    try:
        # Check database connection
        db.session.execute('SELECT 1')
        
        # Check Redis connection
        redis_client.ping()
        
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'version': '1.0.0',
            'services': {
                'database': 'connected',
                'redis': 'connected',
                'ai_models': 'loaded' if job_matcher else 'unavailable'
            }
        }), 200
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 503

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
@limiter.limit("5 per minute")
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'name', 'user_type']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 409
        
        # Create new user
        user = User(
            email=data['email'].lower().strip(),
            name=data['name'].strip(),
            user_type=data['user_type'],
            phone=data.get('phone', '').strip(),
            disability_type=data.get('disability_type'),
            accommodation_needs=data.get('accommodation_needs'),
            profile_data=data.get('profile_data', {})
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        # Send welcome email
        send_email_notification.delay(
            user.email,
            "Welcome to Business Magician Platform",
            f"Welcome {user.name}! Your account has been created successfully.",
            render_template('emails/welcome.html', user=user)
        )
        
        logger.info(f"New user registered: {user.email}")
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Registration failed: {e}")
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/auth/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=data['email'].lower().strip()).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        if not user.is_active:
            return jsonify({'error': 'Account is deactivated'}), 401
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        logger.info(f"User logged in: {user.email}")
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f"Login failed: {e}")
        return jsonify({'error': 'Login failed'}), 500

@app.route('/api/auth/logout', methods=['POST'])
@jwt_required()
def logout():
    """User logout endpoint"""
    try:
        jti = get_jwt()['jti']
        redis_client.set(jti, "", ex=timedelta(hours=24))
        
        return jsonify({'message': 'Successfully logged out'}), 200
    except Exception as e:
        logger.error(f"Logout failed: {e}")
        return jsonify({'error': 'Logout failed'}), 500

# Job Listings API
@app.route('/api/jobs', methods=['GET'])
@cache.cached(timeout=300)  # Cache for 5 minutes
def get_jobs():
    """Get job listings with filtering and pagination"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 20, type=int), 100)
        
        # Build query with filters
        query = JobListing.query.filter_by(is_active=True)
        
        # Filter by location
        if request.args.get('location'):
            query = query.filter(JobListing.location.ilike(f"%{request.args.get('location')}%"))
        
        # Filter by industry
        if request.args.get('industry'):
            query = query.filter_by(industry=request.args.get('industry'))
        
        # Filter by remote work
        if request.args.get('remote') == 'true':
            query = query.filter_by(remote_friendly=True)
        
        # Filter by deaf-friendly jobs
        if request.args.get('deaf_friendly') == 'true':
            query = query.filter_by(deaf_friendly=True)
        
        # Filter by VR approved
        if request.args.get('vr_approved') == 'true':
            query = query.filter_by(vr_approved=True)
        
        # Search by title or description
        if request.args.get('search'):
            search_term = f"%{request.args.get('search')}%"
            query = query.filter(
                db.or_(
                    JobListing.title.ilike(search_term),
                    JobListing.description.ilike(search_term),
                    JobListing.company.ilike(search_term)
                )
            )
        
        # Order by creation date (newest first)
        query = query.order_by(JobListing.created_at.desc())
        
        # Paginate results
        jobs = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'jobs': [job.to_dict() for job in jobs.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': jobs.total,
                'pages': jobs.pages,
                'has_next': jobs.has_next,
                'has_prev': jobs.has_prev
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Failed to get jobs: {e}")
        return jsonify({'error': 'Failed to retrieve jobs'}), 500

@app.route('/api/jobs/<job_id>', methods=['GET'])
def get_job(job_id):
    """Get specific job listing"""
    try:
        job = JobListing.query.get_or_404(job_id)
        
        if not job.is_active:
            return jsonify({'error': 'Job listing not found'}), 404
        
        return jsonify({'job': job.to_dict()}), 200
        
    except Exception as e:
        logger.error(f"Failed to get job {job_id}: {e}")
        return jsonify({'error': 'Failed to retrieve job'}), 500

@app.route('/api/jobs', methods=['POST'])
@jwt_required()
@role_required(['admin', 'employer'])
@limiter.limit("10 per hour")
def create_job():
    """Create new job listing"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'description', 'company']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        job = JobListing(
            title=data['title'].strip(),
            description=data['description'].strip(),
            company=data['company'].strip(),
            location=data.get('location', '').strip(),
            remote_friendly=data.get('remote_friendly', False),
            salary_range=data.get('salary_range', '').strip(),
            job_type=data.get('job_type', 'full-time'),
            industry=data.get('industry', '').strip(),
            accessibility_features=data.get('accessibility_features', []),
            requirements=data.get('requirements', []),
            benefits=data.get('benefits', []),
            contact_email=data.get('contact_email', '').strip(),
            application_deadline=datetime.strptime(data['application_deadline'], '%Y-%m-%d').date() if data.get('application_deadline') else None,
            deaf_friendly=data.get('deaf_friendly', False),
            vr_approved=data.get('vr_approved', False)
        )
        
        db.session.add(job)
        db.session.commit()
        
        # Clear jobs cache
        cache.delete_memoized(get_jobs)
        
        logger.info(f"New job created: {job.title} at {job.company}")
        
        return jsonify({
            'message': 'Job created successfully',
            'job': job.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to create job: {e}")
        return jsonify({'error': 'Failed to create job'}), 500

# Job Applications API
@app.route('/api/jobs/<job_id>/apply', methods=['POST'])
@jwt_required()
@limiter.limit("5 per hour")
def apply_for_job(job_id):
    """Apply for a job"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Check if job exists and is active
        job = JobListing.query.get_or_404(job_id)
        if not job.is_active:
            return jsonify({'error': 'Job listing is no longer active'}), 400
        
        # Check if user already applied
        existing_application = JobApplication.query.filter_by(
            user_id=current_user_id,
            job_id=job_id
        ).first()
        
        if existing_application:
            return jsonify({'error': 'You have already applied for this job'}), 409
        
        # Create application
        application = JobApplication(
            user_id=current_user_id,
            job_id=job_id,
            cover_letter=data.get('cover_letter', '').strip(),
            accommodation_requests=data.get('accommodation_requests', '').strip()
        )
        
        db.session.add(application)
        db.session.commit()
        
        # Send confirmation email to user
        user = User.query.get(current_user_id)
        send_email_notification.delay(
            user.email,
            f"Application Submitted - {job.title}",
            f"Your application for {job.title} at {job.company} has been submitted successfully.",
            render_template('emails/application_confirmation.html', user=user, job=job)
        )
        
        logger.info(f"Job application submitted: User {current_user_id} applied for job {job_id}")
        
        return jsonify({
            'message': 'Application submitted successfully',
            'application': application.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to apply for job {job_id}: {e}")
        return jsonify({'error': 'Failed to submit application'}), 500

@app.route('/api/applications', methods=['GET'])
@jwt_required()
def get_user_applications():
    """Get user's job applications"""
    try:
        current_user_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 20, type=int), 100)
        
        applications = JobApplication.query.filter_by(user_id=current_user_id)\
            .order_by(JobApplication.applied_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'applications': [app.to_dict() for app in applications.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': applications.total,
                'pages': applications.pages,
                'has_next': applications.has_next,
                'has_prev': applications.has_prev
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Failed to get applications for user {current_user_id}: {e}")
        return jsonify({'error': 'Failed to retrieve applications'}), 500

# Business Resources API
@app.route('/api/resources', methods=['GET'])
@cache.cached(timeout=600)  # Cache for 10 minutes
def get_business_resources():
    """Get business resources with filtering"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 20, type=int), 100)
        
        # Build query with filters
        query = BusinessResource.query.filter_by(is_active=True)
        
        # Filter by resource type
        if request.args.get('type'):
            query = query.filter_by(resource_type=request.args.get('type'))
        
        # Filter by category
        if request.args.get('category'):
            query = query.filter_by(category=request.args.get('category'))
        
        # Filter by difficulty level
        if request.args.get('difficulty'):
            query = query.filter_by(difficulty_level=request.args.get('difficulty'))
        
        # Search by title or description
        if request.args.get('search'):
            search_term = f"%{request.args.get('search')}%"
            query = query.filter(
                db.or_(
                    BusinessResource.title.ilike(search_term),
                    BusinessResource.description.ilike(search_term)
                )
            )
        
        # Order by rating and view count
        query = query.order_by(BusinessResource.rating.desc(), BusinessResource.view_count.desc())
        
        # Paginate results
        resources = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'resources': [resource.to_dict() for resource in resources.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': resources.total,
                'pages': resources.pages,
                'has_next': resources.has_next,
                'has_prev': resources.has_prev
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Failed to get resources: {e}")
        return jsonify({'error': 'Failed to retrieve resources'}), 500

@app.route('/api/resources/<resource_id>', methods=['GET'])
def get_business_resource(resource_id):
    """Get specific business resource and increment view count"""
    try:
        resource = BusinessResource.query.get_or_404(resource_id)
        
        if not resource.is_active:
            return jsonify({'error': 'Resource not found'}), 404
        
        # Increment view count
        resource.view_count += 1
        db.session.commit()
        
        return jsonify({'resource': resource.to_dict()}), 200
        
    except Exception as e:
        logger.error(f"Failed to get resource {resource_id}: {e}")
        return jsonify({'error': 'Failed to retrieve resource'}), 500

# AI-Powered Features
@app.route('/api/ai/job-match', methods=['POST'])
@jwt_required()
@limiter.limit("5 per hour")
def ai_job_matching():
    """AI-powered job matching"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Check cache first
        cache_key = f"job_matches_{current_user_id}"
        cached_matches = cache.get(cache_key)
        
        if cached_matches:
            return jsonify({
                'matches': cached_matches,
                'cached': True
            }), 200
        
        # Start background job matching task
        job_preferences = data.get('preferences', '')
        task = process_job_matching.delay(current_user_id, job_preferences)
        
        return jsonify({
            'message': 'Job matching in progress',
            'task_id': task.id,
            'status': 'processing'
        }), 202
        
    except Exception as e:
        logger.error(f"AI job matching failed for user {current_user_id}: {e}")
        return jsonify({'error': 'Job matching failed'}), 500

@app.route('/api/ai/business-advice', methods=['POST'])
@jwt_required()
@limiter.limit("10 per hour")
def ai_business_advice():
    """AI-powered business advice"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('question'):
            return jsonify({'error': 'Question is required'}), 400
        
        question = data['question'].strip()
        user = User.query.get(current_user_id)
        
        # Prepare context for AI
        context = f"User profile: {user.disability_type or 'Not specified'} disability, "
        context += f"interested in {user.profile_data.get('interests', 'business')}. "
        context += f"Question: {question}"
        
        # Generate advice using AI model (if available)
        if business_advisor:
            try:
                response = business_advisor(context, max_length=200, num_return_sequences=1)
                advice = response[0]['generated_text'].replace(context, '').strip()
            except Exception as ai_error:
                logger.warning(f"AI model failed, using fallback: {ai_error}")
                advice = generate_fallback_business_advice(question, user.disability_type)
        else:
            advice = generate_fallback_business_advice(question, user.disability_type)
        
        # Log the interaction
        logger.info(f"Business advice provided to user {current_user_id}: {question[:50]}...")
        
        return jsonify({
            'question': question,
            'advice': advice,
            'disclaimer': 'This advice is AI-generated and should be used as guidance only. Please consult with business professionals for specific decisions.'
        }), 200
        
    except Exception as e:
        logger.error(f"Business advice failed for user {current_user_id}: {e}")
        return jsonify({'error': 'Failed to generate business advice'}), 500

def generate_fallback_business_advice(question, disability_type):
    """Generate fallback business advice when AI model is unavailable"""
    advice_templates = {
        'funding': "Consider exploring VR funding options, small business grants, and microloans. Many programs specifically support entrepreneurs with disabilities.",
        'marketing': "Focus on digital marketing strategies that are accessible. Use social media, email marketing, and ensure your website is fully accessible.",
        'accessibility': "Make accessibility a core part of your business model. This can be a competitive advantage and help you serve underserved markets.",
        'networking': "Connect with disability business networks, chambers of commerce, and industry associations. Online networking can be very effective.",
        'planning': "Start with a solid business plan. Use free resources like SCORE mentoring and SBA business plan templates."
    }
    
    question_lower = question.lower()
    for key, template in advice_templates.items():
        if key in question_lower:
            return template
    
    # Default advice
    default_advice = "Consider your unique perspective and experiences as strengths in your business. "
    if disability_type == 'deaf-hoh':
        default_advice += "The deaf community represents an underserved market with specific needs you understand well."
    
    return default_advice + " Focus on solving problems you've personally experienced."

# Business Plans API
@app.route('/api/business-plans', methods=['GET'])
@jwt_required()
def get_business_plans():
    """Get user's business plans"""
    try:
        current_user_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 20, type=int), 100)
        
        plans = BusinessPlan.query.filter_by(user_id=current_user_id)\
            .order_by(BusinessPlan.updated_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'business_plans': [plan.to_dict() for plan in plans.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': plans.total,
                'pages': plans.pages,
                'has_next': plans.has_next,
                'has_prev': plans.has_prev
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Failed to get business plans for user {current_user_id}: {e}")
        return jsonify({'error': 'Failed to retrieve business plans'}), 500

@app.route('/api/business-plans', methods=['POST'])
@jwt_required()
@limiter.limit("5 per hour")
def create_business_plan():
    """Create new business plan"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('title'):
            return jsonify({'error': 'Title is required'}), 400
        
        plan = BusinessPlan(
            user_id=current_user_id,
            title=data['title'].strip(),
            description=data.get('description', '').strip(),
            business_type=data.get('business_type', '').strip(),
            industry=data.get('industry', '').strip(),
            target_market=data.get('target_market', '').strip(),
            financial_projections=data.get('financial_projections', {}),
            marketing_strategy=data.get('marketing_strategy', '').strip(),
            operational_plan=data.get('operational_plan', '').strip(),
            funding_requirements=data.get('funding_requirements', {}),
            accessibility_considerations=data.get('accessibility_considerations', '').strip()
        )
        
        db.session.add(plan)
        db.session.commit()
        
        logger.info(f"New business plan created by user {current_user_id}: {plan.title}")
        
        return jsonify({
            'message': 'Business plan created successfully',
            'business_plan': plan.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to create business plan for user {current_user_id}: {e}")
        return jsonify({'error': 'Failed to create business plan'}), 500

@app.route('/api/business-plans/<plan_id>', methods=['PUT'])
@jwt_required()
def update_business_plan(plan_id):
    """Update business plan"""
    try:
        current_user_id = get_jwt_identity()
        plan = BusinessPlan.query.filter_by(id=plan_id, user_id=current_user_id).first_or_404()
        
        data = request.get_json()
        
        # Update fields
        if 'title' in data:
            plan.title = data['title'].strip()
        if 'description' in data:
            plan.description = data['description'].strip()
        if 'business_type' in data:
            plan.business_type = data['business_type'].strip()
        if 'industry' in data:
            plan.industry = data['industry'].strip()
        if 'target_market' in data:
            plan.target_market = data['target_market'].strip()
        if 'financial_projections' in data:
            plan.financial_projections = data['financial_projections']
        if 'marketing_strategy' in data:
            plan.marketing_strategy = data['marketing_strategy'].strip()
        if 'operational_plan' in data:
            plan.operational_plan = data['operational_plan'].strip()
        if 'funding_requirements' in data:
            plan.funding_requirements = data['funding_requirements']
        if 'accessibility_considerations' in data:
            plan.accessibility_considerations = data['accessibility_considerations'].strip()
        if 'status' in data:
            plan.status = data['status']
        if 'completion_percentage' in data:
            plan.completion_percentage = min(max(data['completion_percentage'], 0), 100)
        
        plan.updated_at = datetime.utcnow()
        db.session.commit()
        
        logger.info(f"Business plan updated by user {current_user_id}: {plan.title}")
        
        return jsonify({
            'message': 'Business plan updated successfully',
            'business_plan': plan.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to update business plan {plan_id} for user {current_user_id}: {e}")
        return jsonify({'error': 'Failed to update business plan'}), 500

# Analytics and Reporting
@app.route('/api/analytics/dashboard', methods=['GET'])
@jwt_required()
@role_required(['admin'])
@cache.cached(timeout=1800)  # Cache for 30 minutes
def get_analytics_dashboard():
    """Get analytics dashboard data for admins"""
    try:
        # User statistics
        total_users = User.query.count()
        active_users = User.query.filter_by(is_active=True).count()
        new_users_this_month = User.query.filter(
            User.created_at >= datetime.utcnow().replace(day=1)
        ).count()
        
        # Job statistics
        total_jobs = JobListing.query.count()
        active_jobs = JobListing.query.filter_by(is_active=True).count()
        deaf_friendly_jobs = JobListing.query.filter_by(deaf_friendly=True, is_active=True).count()
        vr_approved_jobs = JobListing.query.filter_by(vr_approved=True, is_active=True).count()
        
        # Application statistics
        total_applications = JobApplication.query.count()
        applications_this_month = JobApplication.query.filter(
            JobApplication.applied_at >= datetime.utcnow().replace(day=1)
        ).count()
        
        # Business plan statistics
        total_business_plans = BusinessPlan.query.count()
        completed_plans = BusinessPlan.query.filter_by(status='completed').count()
        
        # Resource statistics
        total_resources = BusinessResource.query.count()
        most_viewed_resources = BusinessResource.query.filter_by(is_active=True)\
            .order_by(BusinessResource.view_count.desc()).limit(5).all()
        
        return jsonify({
            'users': {
                'total': total_users,
                'active': active_users,
                'new_this_month': new_users_this_month,
                'activity_rate': round((active_users / total_users * 100) if total_users > 0 else 0, 2)
            },
            'jobs': {
                'total': total_jobs,
                'active': active_jobs,
                'deaf_friendly': deaf_friendly_jobs,
                'vr_approved': vr_approved_jobs,
                'deaf_friendly_percentage': round((deaf_friendly_jobs / active_jobs * 100) if active_jobs > 0 else 0, 2)
            },
            'applications': {
                'total': total_applications,
                'this_month': applications_this_month,
                'average_per_job': round((total_applications / total_jobs) if total_jobs > 0 else 0, 2)
            },
            'business_plans': {
                'total': total_business_plans,
                'completed': completed_plans,
                'completion_rate': round((completed_plans / total_business_plans * 100) if total_business_plans > 0 else 0, 2)
            },
            'resources': {
                'total': total_resources,
                'most_viewed': [{'title': r.title, 'views': r.view_count} for r in most_viewed_resources]
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Failed to get analytics dashboard: {e}")
        return jsonify({'error': 'Failed to retrieve analytics'}), 500

# VR Integration API
@app.route('/api/vr/eligibility-check', methods=['POST'])
@jwt_required()
@limiter.limit("3 per hour")
def vr_eligibility_check():
    """Check VR eligibility for business plans"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        user = User.query.get(current_user_id)
        
        # Basic eligibility criteria
        eligibility_score = 0
        factors = []
        
        # Disability documentation
        if user.disability_type:
            eligibility_score += 30
            factors.append("Disability type documented")
        
        # Business plan completeness
        if data.get('business_plan_complete'):
            eligibility_score += 25
            factors.append("Business plan completed")
        
        # Financial need
        if data.get('financial_need') in ['high', 'medium']:
            eligibility_score += 20
            factors.append("Demonstrated financial need")
        
        # Employment history
        if data.get('employment_challenges'):
            eligibility_score += 15
            factors.append("Employment challenges documented")
        
        # Support system
        if data.get('support_system'):
            eligibility_score += 10
            factors.append("Support system in place")
        
        # Determine eligibility
        eligible = eligibility_score >= 70
        
        # Generate recommendations
        recommendations = []
        if not user.disability_type:
            recommendations.append("Obtain disability documentation")
        if not data.get('business_plan_complete'):
            recommendations.append("Complete comprehensive business plan")
        if eligibility_score < 70:
            recommendations.append("Consider working with VR counselor to strengthen application")
        
        result = {
            'eligible': eligible,
            'score': eligibility_score,
            'factors': factors,
            'recommendations': recommendations,
            'next_steps': [
                "Contact local VR office",
                "Gather required documentation",
                "Schedule assessment appointment"
            ] if eligible else [
                "Address eligibility gaps",
                "Strengthen business plan",
                "Consult with VR counselor"
            ]
        }
        
        logger.info(f"VR eligibility check for user {current_user_id}: {eligibility_score}% eligible")
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"VR eligibility check failed for user {current_user_id}: {e}")
        return jsonify({'error': 'Eligibility check failed'}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    logger.error(f"Internal server error: {error}")
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({'error': 'Rate limit exceeded', 'retry_after': str(e.retry_after)}), 429

# Database initialization
@app.before_first_request
def create_tables():
    """Create database tables"""
    try:
        db.create_all()
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Failed to create database tables: {e}")

if __name__ == '__main__':
    # Run the application
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info(f"Starting Business Magician Flask App on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)
