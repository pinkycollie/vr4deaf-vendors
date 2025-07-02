-- VR4Deaf Platform Database Schema
-- Optimized for Cloud Run, Google Workspace, and Liveblocks integration

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full-text search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Organizations table (for multi-tenant support)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('vr-vendor', 'cbtac', 'ai-service')),
    location VARCHAR(100),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    google_workspace_domain VARCHAR(255),
    liveblocks_organization_id VARCHAR(255),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- States table
CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    abbreviation VARCHAR(2) NOT NULL UNIQUE,
    vr_program_type VARCHAR(50) DEFAULT 'standard',
    has_cbtac BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (vendors, clients, specialists)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('vendor', 'client', 'specialist', 'admin')),
    phone VARCHAR(20),
    profile_data JSONB DEFAULT '{}',
    google_workspace_user_id VARCHAR(255),
    liveblocks_user_id VARCHAR(255),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table (detailed client information)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id),
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('vr-vendor', 'ai-powered')),
    state_id INTEGER REFERENCES states(id),
    disability_type VARCHAR(100),
    business_idea TEXT,
    accommodation_needs TEXT,
    support_level VARCHAR(50),
    vr_counselor VARCHAR(255),
    cbtac_provider VARCHAR(255),
    target_audience TEXT,
    industry VARCHAR(100),
    eligibility_status VARCHAR(50) DEFAULT 'pending',
    eligibility_score INTEGER,
    google_drive_folder_id VARCHAR(255),
    liveblocks_room_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Milestones table (VR and AI milestones)
CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    milestone_type VARCHAR(50) DEFAULT 'standard',
    fee DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'completed', 'cancelled')),
    milestone_order INTEGER,
    vr_approval_required BOOLEAN DEFAULT false,
    estimated_days INTEGER,
    actual_start_date DATE,
    actual_end_date DATE,
    completion_notes TEXT,
    google_task_id VARCHAR(255),
    google_calendar_event_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Opportunities table (jobs, self-employment, business, contracts)
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    opportunity_type VARCHAR(50) NOT NULL CHECK (opportunity_type IN ('job', 'self-employment', 'business', 'contract')),
    industry VARCHAR(100),
    location VARCHAR(100),
    remote_friendly BOOLEAN DEFAULT false,
    accessibility_features TEXT[],
    requirements TEXT[],
    compensation_range VARCHAR(100),
    deadline DATE,
    contact_info JSONB,
    source VARCHAR(100),
    match_criteria JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Client opportunities (matching results)
CREATE TABLE client_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    match_score DECIMAL(5,2),
    status VARCHAR(50) DEFAULT 'matched' CHECK (status IN ('matched', 'applied', 'interviewed', 'accepted', 'rejected', 'withdrawn')),
    application_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(client_id, opportunity_id)
);

-- VR assessments table
CREATE TABLE vr_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id),
    email VARCHAR(255) NOT NULL,
    assessment_data JSONB NOT NULL,
    eligible BOOLEAN,
    score INTEGER,
    factors JSONB,
    recommendations TEXT[],
    next_steps TEXT[],
    estimated_timeline VARCHAR(100),
    potential_funding DECIMAL(10,2),
    assessed_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VR form sessions (for progress tracking)
CREATE TABLE vr_form_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    form_data JSONB NOT NULL,
    progress DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id)
);

-- Business insights cache (for Business Magician API responses)
CREATE TABLE business_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id),
    request_hash VARCHAR(64) UNIQUE,
    insights_data JSONB NOT NULL,
    source VARCHAR(50) DEFAULT 'business-magician',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collaboration rooms (Liveblocks integration)
CREATE TABLE collaboration_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    liveblocks_room_id VARCHAR(255) UNIQUE NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    client_id UUID REFERENCES clients(id),
    organization_id UUID REFERENCES organizations(id),
    participants UUID[],
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Google Workspace integration tracking
CREATE TABLE workspace_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id),
    integration_type VARCHAR(50) NOT NULL,
    google_resource_id VARCHAR(255),
    resource_type VARCHAR(50),
    sync_status VARCHAR(50) DEFAULT 'active',
    last_sync TIMESTAMP WITH TIME ZONE,
    sync_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity logs (audit trail)
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    client_id UUID REFERENCES clients(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id VARCHAR(255),
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API rate limiting
CREATE TABLE api_rate_limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identifier VARCHAR(255) NOT NULL, -- IP, user ID, or API key
    endpoint VARCHAR(255) NOT NULL,
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(identifier, endpoint, window_start)
);

-- Notification queue
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB DEFAULT '{}',
    channels VARCHAR(50)[] DEFAULT ARRAY['in-app'],
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
    scheduled_for TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_clients_organization ON clients(organization_id);
CREATE INDEX idx_clients_service_type ON clients(service_type);
CREATE INDEX idx_clients_state ON clients(state_id);
CREATE INDEX idx_milestones_client ON milestones(client_id);
CREATE INDEX idx_milestones_status ON milestones(status);
CREATE INDEX idx_opportunities_type ON opportunities(opportunity_type);
CREATE INDEX idx_opportunities_location ON opportunities(location);
CREATE INDEX idx_opportunities_active ON opportunities(is_active);
CREATE INDEX idx_client_opportunities_client ON client_opportunities(client_id);
CREATE INDEX idx_client_opportunities_status ON client_opportunities(status);
CREATE INDEX idx_vr_assessments_client ON vr_assessments(client_id);
CREATE INDEX idx_vr_assessments_email ON vr_assessments(email);
CREATE INDEX idx_business_insights_client ON business_insights(client_id);
CREATE INDEX idx_business_insights_hash ON business_insights(request_hash);
CREATE INDEX idx_collaboration_rooms_client ON collaboration_rooms(client_id);
CREATE INDEX idx_collaboration_rooms_liveblocks ON collaboration_rooms(liveblocks_room_id);
CREATE INDEX idx_workspace_integrations_client ON workspace_integrations(client_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_client ON activity_logs(client_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_status ON notifications(status);

-- Full-text search indexes
CREATE INDEX idx_opportunities_search ON opportunities USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_clients_search ON clients USING gin(to_tsvector('english', business_idea || ' ' || industry));

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_opportunities_updated_at BEFORE UPDATE ON client_opportunities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vr_form_sessions_updated_at BEFORE UPDATE ON vr_form_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_collaboration_rooms_updated_at BEFORE UPDATE ON collaboration_rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workspace_integrations_updated_at BEFORE UPDATE ON workspace_integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE vr_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for multi-tenant isolation
CREATE POLICY organization_isolation ON users
    USING (organization_id = current_setting('app.current_organization_id')::UUID);

CREATE POLICY client_organization_isolation ON clients
    USING (organization_id = current_setting('app.current_organization_id')::UUID);

CREATE POLICY milestone_access ON milestones
    USING (client_id IN (
        SELECT id FROM clients 
        WHERE organization_id = current_setting('app.current_organization_id')::UUID
    ));

-- Comments for documentation
COMMENT ON TABLE organizations IS 'Multi-tenant organizations (VR vendors, CBTAC providers, AI services)';
COMMENT ON TABLE clients IS 'Client records with VR and business development information';
COMMENT ON TABLE milestones IS 'VR milestones and AI-powered business development stages';
COMMENT ON TABLE opportunities IS 'Job, self-employment, business, and contract opportunities';
COMMENT ON TABLE vr_assessments IS 'VR eligibility assessments and scoring';
COMMENT ON TABLE collaboration_rooms IS 'Liveblocks collaboration rooms for real-time interaction';
COMMENT ON TABLE workspace_integrations IS 'Google Workspace integration tracking and sync status';
COMMENT ON TABLE business_insights IS 'Cached Business Magician API responses for performance';
