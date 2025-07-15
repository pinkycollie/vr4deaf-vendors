-- Users table for job seekers
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  profile_data JSONB DEFAULT '{}',
  skills TEXT[],
  accessibility_needs TEXT[],
  experience_level VARCHAR(20) DEFAULT 'entry',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  remote_friendly BOOLEAN DEFAULT false,
  accessibility_score INTEGER DEFAULT 1 CHECK (accessibility_score >= 1 AND accessibility_score <= 5),
  salary_min INTEGER,
  salary_max INTEGER,
  requirements TEXT[],
  benefits TEXT[],
  active BOOLEAN DEFAULT true,
  employer_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'applied',
  cover_letter TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Employers table
CREATE TABLE employers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255),
  accessibility_rating INTEGER DEFAULT 1 CHECK (accessibility_rating >= 1 AND accessibility_rating <= 5),
  description TEXT,
  website VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key for employer_id in jobs table
ALTER TABLE jobs ADD CONSTRAINT fk_jobs_employer 
  FOREIGN KEY (employer_id) REFERENCES employers(id);

-- Create indexes for better performance
CREATE INDEX idx_jobs_active ON jobs(active);
CREATE INDEX idx_jobs_remote ON jobs(remote_friendly);
CREATE INDEX idx_jobs_accessibility ON jobs(accessibility_score);
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_job ON applications(job_id);
