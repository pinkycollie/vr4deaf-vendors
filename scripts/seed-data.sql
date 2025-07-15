-- Insert sample employers
INSERT INTO employers (company_name, contact_email, accessibility_rating, description, website) VALUES
('TechForAll Inc', 'hr@techforall.com', 5, 'Leading tech company with full accessibility support', 'https://techforall.com'),
('DeafFriendly Corp', 'jobs@deaffriendly.com', 5, 'Company founded by Deaf entrepreneurs', 'https://deaffriendly.com'),
('Inclusive Solutions', 'careers@inclusive.com', 4, 'Remote-first company with strong accessibility practices', 'https://inclusive.com');

-- Insert sample jobs
INSERT INTO jobs (title, company, description, location, remote_friendly, accessibility_score, salary_min, salary_max, requirements, benefits, employer_id) VALUES
('Frontend Developer', 'TechForAll Inc', 'Build accessible web applications using React and TypeScript', 'San Francisco, CA', true, 5, 80000, 120000, 
 ARRAY['React', 'TypeScript', 'Accessibility'], 
 ARRAY['Health insurance', 'ASL interpreters provided', 'Flexible hours'],
 (SELECT id FROM employers WHERE company_name = 'TechForAll Inc')),

('UX Designer', 'DeafFriendly Corp', 'Design user experiences with accessibility-first approach', 'Remote', true, 5, 70000, 100000,
 ARRAY['Figma', 'User Research', 'Accessibility Design'],
 ARRAY['Remote work', 'Deaf-friendly culture', 'Professional development'],
 (SELECT id FROM employers WHERE company_name = 'DeafFriendly Corp')),

('Data Analyst', 'Inclusive Solutions', 'Analyze data to improve accessibility metrics', 'New York, NY', true, 4, 65000, 90000,
 ARRAY['SQL', 'Python', 'Data Visualization'],
 ARRAY['Health benefits', 'Captioning services', 'Mentorship program'],
 (SELECT id FROM employers WHERE company_name = 'Inclusive Solutions'));
