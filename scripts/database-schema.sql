-- VR4Deaf Database Schema
-- PostgreSQL/Neon Database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- States table
CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(2) NOT NULL UNIQUE,
    vr_office_contact JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Organizations table (VR Vendors, CBTAC Providers)
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('vr_vendor', 'cbtac_provider', 'ai_service')),
    state_id INTEGER REFERENCES states(id),
    contact_info JSONB,
    settings JSONB DEFAULT '{}',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table (Vendors, Clients, Admins)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('vendor', 'client', 'admin')),
    organization_id INTEGER REFERENCES organizations(id),
    permissions TEXT[] DEFAULT '{}',
    profile_data JSONB DEFAULT '{}',
    last_login TIMESTAMP,
    email_verified BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id),
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('vr-vendor', 'ai-powered')),
    state_id INTEGER REFERENCES states(id),
    disability_type VARCHAR(255),
    business_idea TEXT NOT NULL,
    accommodation_needs TEXT,
    support_level VARCHAR(50) CHECK (support_level IN ('simple', 'comprehensive', 'supported')),
    vr_counselor VARCHAR(255),
    cbtac_provider VARCHAR(255),
    target_audience TEXT,
    industry VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed', 'withdrawn')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Milestones table
CREATE TABLE milestones (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    fee DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'completed', 'on-hold')),
    milestone_order INTEGER NOT NULL,
    vr_approval_required BOOLEAN DEFAULT false,
    due_date TIMESTAMP,
    completed_at TIMESTAMP,
    notes TEXT,
    requirements JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Billing records table
CREATE TABLE billing_records (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    milestone_id INTEGER REFERENCES milestones(id),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    invoice_number VARCHAR(100) UNIQUE,
    due_date DATE,
    paid_at TIMESTAMP,
    payment_method VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    milestone_id INTEGER REFERENCES milestones(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    file_path VARCHAR(500),
    file_size INTEGER,
    mime_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'revision_required')),
    required BOOLEAN DEFAULT false,
    uploaded_by INTEGER REFERENCES users(id),
    reviewed_by INTEGER REFERENCES users(id),
    reviewed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Activity logs table
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    client_id INTEGER REFERENCES clients(id),
    milestone_id INTEGER REFERENCES milestones(id),
    action VARCHAR(100) NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Fee schedules table (VR compliance)
CREATE TABLE fee_schedules (
    id SERIAL PRIMARY KEY,
    state_id INTEGER REFERENCES states(id),
    milestone_name VARCHAR(255) NOT NULL,
    min_fee DECIMAL(10,2) NOT NULL,
    max_fee DECIMAL(10,2) NOT NULL,
    effective_date DATE NOT NULL,
    expires_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Business insights cache table
CREATE TABLE business_insights (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    insight_type VARCHAR(100) NOT NULL,
    data JSONB NOT NULL,
    generated_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- API keys table
CREATE TABLE api_keys (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    permissions TEXT[] DEFAULT '{}',
    last_used TIMESTAMP,
    expires_at TIMESTAMP,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_clients_organization ON clients(organization_id);
CREATE INDEX idx_clients_user ON clients(user_id);
CREATE INDEX idx_milestones_client ON milestones(client_id);
CREATE INDEX idx_milestones_status ON milestones(status);
CREATE INDEX idx_billing_client ON billing_records(client_id);
CREATE INDEX idx_billing_status ON billing_records(status);
CREATE INDEX idx_activity_logs_client ON activity_logs(client_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);
CREATE INDEX idx_documents_client ON documents(client_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- Insert initial data
INSERT INTO states (name, code, vr_office_contact) VALUES 
('Texas', 'TX', '{"phone": "512-424-4000", "website": "https://www.dars.state.tx.us/"}'),
('Florida', 'FL', '{"phone": "850-245-3399", "website": "https://www.rehabworks.org/"}'),
('California', 'CA', '{"phone": "916-558-5300", "website": "https://www.dor.ca.gov/"}');

-- Insert VR fee schedules for Texas and Florida
INSERT INTO fee_schedules (state_id, milestone_name, min_fee, max_fee, effective_date) VALUES 
(1, 'SSESP', 153.00, 153.00, '2024-01-01'),
(1, 'Start-Up', 765.00, 765.00, '2024-01-01'),
(1, 'Maintenance', 1530.00, 1530.00, '2024-01-01'),
(1, 'Stability', 2295.00, 2295.00, '2024-01-01'),
(1, 'Closure', 3032.00, 3032.00, '2024-01-01'),
(2, 'SSESP', 153.00, 153.00, '2024-01-01'),
(2, 'Start-Up', 765.00, 765.00, '2024-01-01'),
(2, 'Maintenance', 1530.00, 1530.00, '2024-01-01'),
(2, 'Stability', 2295.00, 2295.00, '2024-01-01'),
(2, 'Closure', 3032.00, 3032.00, '2024-01-01');
