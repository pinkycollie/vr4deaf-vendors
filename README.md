# VR4DEAF - Comprehensive Vocational Rehabilitation Platform

A cutting-edge platform designed specifically for deaf communities, providing unified end-to-end vocational rehabilitation services with AI integration, automation, and comprehensive support systems.

## 🎯 Mission

VR4DEAF focuses on vocational rehabilitation services for deaf clients, integrating cutting-edge technologies, AI/LLM capabilities, and comprehensive support systems to create a unified platform that serves multiple apps, platforms, and projects within the deaf community ecosystem.

## ✨ Key Features

### 🤖 AI-Powered Services
- **Vuri AI Assistant**: Intelligent chatbot with deaf community expertise
- **AI Resume Builder**: Automated resume optimization and generation
- **Smart Workflow Automation**: AI-driven case management and routing

### 🏢 Comprehensive VR Services
- **Multi-State VR Office Directory**: Complete database of VR offices across all states
- **Texas VR Services**: Specialized Texas Workforce Commission integration
- **Funding Information**: Comprehensive VR funding and eligibility guidance
- **Service Matching**: Intelligent matching of clients to appropriate services

### 📋 Advanced Form Systems
- **VR Interest Forms**: Multi-step intake forms with Google Sheets integration
- **Lead Scoring & Routing**: Automated priority assignment and VR office routing
- **Real-time Validation**: Comprehensive form validation with accessibility features

### 🛡️ Enterprise-Grade Infrastructure
- **Redundancy & Backup Systems**: Multi-layer backup with automated disaster recovery
- **Service Failover**: Circuit breaker patterns with automatic endpoint switching
- **Webhook Management**: Comprehensive webhook system with logging and rate limiting
- **Health Monitoring**: Real-time system status and performance tracking

### ♿ Accessibility First
- **ASL Support Widget**: Integrated sign language support
- **Screen Reader Optimization**: Full WCAG compliance
- **High Contrast Modes**: Accessibility-focused design patterns
- **Keyboard Navigation**: Complete keyboard accessibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Google Cloud Platform account (for Sheets integration)
- Vercel account (for deployment)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/vr4deaf.git
cd vr4deaf

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
\`\`\`

### Environment Variables

\`\`\`env
# Database
DATABASE_URL=postgresql://...
POSTGRES_URL=postgresql://...

# Authentication
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# AI Services
GROQ_API_KEY=your-groq-api-key

# Storage & Backup
BLOB_READ_WRITE_TOKEN=your-blob-token
PRIMARY_STORAGE_URL=your-primary-storage
SECONDARY_STORAGE_URL=your-secondary-storage
OFFSITE_STORAGE_URL=your-offsite-storage

# Google Integration
GOOGLE_CLIENT_EMAIL=your-service-account-email
GOOGLE_PRIVATE_KEY=your-private-key
VR_FORMS_SPREADSHEET_ID=your-spreadsheet-id

# Redis/KV Store
KV_URL=your-kv-url
KV_REST_API_TOKEN=your-kv-token

# API Configuration
NEXT_PUBLIC_API_URL=https://your-domain.com/api
\`\`\`

## 📚 API Documentation

### Core Endpoints

- `GET /api/states` - List all states with VR services
- `GET /api/states/[code]/vr-offices` - Get VR offices by state
- `POST /api/forms/vr-interest` - Submit VR interest form
- `POST /api/vuri/chat` - Chat with Vuri AI assistant
- `GET /api/services` - List available VR services
- `POST /api/automation/start-journey` - Start automated workflow

### Webhook Endpoints

- `POST /api/webhooks/[toolId]` - Receive webhook events
- `GET /api/webhooks/logs` - Retrieve webhook logs
- `POST /api/webhooks/test` - Test webhook configuration

### Health & Monitoring

- `GET /api/health` - System health check
- `GET /api/system-status` - Detailed system status
- `GET /api/webhooks/stats` - Webhook statistics

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **AI/ML**: Groq API, Custom AI workflows
- **Storage**: Vercel Blob, Multi-tier backup system
- **Caching**: Redis/KV Store
- **Monitoring**: Custom health check system

### Key Components
- **Automation Engine**: Workflow management and AI integration
- **Backup Manager**: Multi-layer redundancy and disaster recovery
- **Form System**: Advanced form handling with validation
- **Webhook Manager**: Secure webhook processing with rate limiting
- **State Management**: Comprehensive state and VR office data

## 🌟 Texas VR Integration

Special integration with Texas Workforce Commission:
- Direct TWC VR office connections
- Texas-specific eligibility requirements
- Automated referral systems
- Texas red/blue branding compliance

## 🔧 Development

### Project Structure
\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── docs/              # Documentation pages
│   ├── forms/             # Form pages
│   └── webhooks/          # Webhook management
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── automation/        # Workflow automation
│   ├── backup/           # Backup systems
│   ├── forms/            # Form handling
│   └── routing/          # Route management
└── public/               # Static assets
\`\`\`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite
- `npm run db:migrate` - Run database migrations

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain WCAG 2.1 AA accessibility standards
- Write comprehensive tests for new features
- Update documentation for API changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.vr4deaf.org](https://docs.vr4deaf.org)
- **Issues**: [GitHub Issues](https://github.com/your-org/vr4deaf/issues)
- **Support**: [support@vr4deaf.org](mailto:support@vr4deaf.org)

## 🙏 Acknowledgments

- Texas Workforce Commission for VR services partnership
- Deaf community advocates and testers
- Open source contributors and maintainers
- Accessibility consultants and experts

---

**Built with ❤️ for the deaf community**
