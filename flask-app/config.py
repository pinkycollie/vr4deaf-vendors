import os
from datetime import timedelta

class Config:
    """Base configuration class"""
    
    # Basic Flask config
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://localhost/business_magician')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 10,
        'pool_recycle': 120,
        'pool_pre_ping': True,
        'max_overflow': 20
    }
    
    # JWT configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
    
    # Redis configuration
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    CACHE_TYPE = 'redis'
    CACHE_REDIS_URL = REDIS_URL
    CACHE_DEFAULT_TIMEOUT = 300
    
    # Session configuration
    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_KEY_PREFIX = 'business_magician:'
    
    # Celery configuration
    CELERY_BROKER_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/2')
    CELERY_RESULT_BACKEND = os.getenv('REDIS_URL', 'redis://localhost:6379/3')
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_ACCEPT_CONTENT = ['json']
    CELERY_TIMEZONE = 'UTC'
    CELERY_ENABLE_UTC = True
    
    # Email configuration
    SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')
    SMTP_USE_TLS = True
    
    # File upload configuration
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx'}
    
    # Rate limiting
    RATELIMIT_STORAGE_URL = REDIS_URL
    RATELIMIT_STRATEGY = 'fixed-window'
    RATELIMIT_HEADERS_ENABLED = True
    
    # Security headers
    SECURITY_HEADERS = {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    }
    
    # CORS configuration
    CORS_ORIGINS = [
        'https://vr4deaf.org',
        'https://*.vr4deaf.org',
        'https://generator.360magicians.com'
    ]
    
    # AI/ML configuration
    HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')
    AI_MODEL_CACHE_DIR = os.getenv('AI_MODEL_CACHE_DIR', './models')
    
    # Monitoring
    SENTRY_DSN = os.getenv('SENTRY_DSN')
    
    # VR4Deaf integration
    VR4DEAF_API_URL = os.getenv('VR4DEAF_API_URL', 'https://api.vr4deaf.org')
    VR4DEAF_API_KEY = os.getenv('VR4DEAF_API_KEY')
    
    # Google Workspace integration
    GOOGLE_WORKSPACE_DOMAIN = os.getenv('GOOGLE_WORKSPACE_DOMAIN')
    GOOGLE_SERVICE_ACCOUNT_KEY = os.getenv('GOOGLE_SERVICE_ACCOUNT_KEY')
    
    # Liveblocks integration
    LIVEBLOCKS_SECRET_KEY = os.getenv('LIVEBLOCKS_SECRET_KEY')

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False
    
    # Less strict rate limiting for development
    RATELIMIT_ENABLED = False
    
    # Disable HTTPS requirement for development
    JWT_COOKIE_SECURE = False
    SESSION_COOKIE_SECURE = False

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    
    # Strict security settings for production
    JWT_COOKIE_SECURE = True
    JWT_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    
    # Production database settings
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 20,
        'pool_recycle': 300,
        'pool_pre_ping': True,
        'max_overflow': 40
    }

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True
    
    # Use in-memory database for testing
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    
    # Disable rate limiting for tests
    RATELIMIT_ENABLED = False
    
    # Use fake Redis for testing
    CACHE_TYPE = 'simple'
    
    # Disable email sending in tests
    SMTP_USERNAME = None

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production
