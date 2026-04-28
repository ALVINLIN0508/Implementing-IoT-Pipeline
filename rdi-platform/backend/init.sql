-- Create database schema for RDI Platform

-- Companies table
CREATE TABLE
IF NOT EXISTS companies
(
    id SERIAL PRIMARY KEY,
    name VARCHAR
(255) NOT NULL UNIQUE,
    about TEXT,
    culture TEXT,
    website VARCHAR
(255),
    email VARCHAR
(255),
    location VARCHAR
(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Open positions table
CREATE TABLE
IF NOT EXISTS positions
(
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES companies
(id) ON
DELETE CASCADE,
    title VARCHAR(255)
NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_company_name ON companies(name);
CREATE INDEX idx_position_company ON positions(company_id);

-- Insert company data
INSERT INTO companies
    (name, about, culture, website, email, location)
VALUES
    (
        'Kempower',
        'With roots in the Southern part of Finland, Kempower is a globally operating DC fast charger designer and manufacturer with a vision to create the world''s most desired EV fast charging solutions for everyone, everywhere. At Kempower, we''re driving the Electric Vehicle evolution to create a cleaner and quieter environment for everyone. We inspire global audiences to join the electric movement and be the change our planet needs. If you''re passionate about making a positive impact and want to plug into a dynamic team, we want to hear from you!',
        'Our Culture fosters a positive work environment where every voice is valued. Regardless of job titles, we''re united by our can-do attitude and collaborative spirit. With a diverse team representing over 40 nationalities, we celebrate unique perspectives and encourage continuous learning and growth.',
        'https://kempower.com/',
        'meri.erkamo@kempower.com',
        'Finland'
),
    (
        'LUT University',
        'LUT University seeks solutions to global issues with its expertise in technology, business, and social sciences. LUT is a trailblazer in promoting the energy transition and the regenerative use of natural resources and helps build resilient communities, industry, and businesses through data, research, and education. LUT''s campuses are in Lappeenranta and Lahti, Finland, but its impact is global.',
        NULL,
        'https://www.lut.fi/fi',
        'recruitment@lut.fi',
        'Finland'
),
    (
        'Hitachi High-Tech Analytical Science Oy',
        'We have a global network of Hitachi High-Tech Analytical Science sales and service centres, supported by a global distribution network of over 150 distributors.',
        NULL,
        'https://hha.hitachi-hightech.com/en/',
        'contact@hitachi-hightech.com',
        'Finland'
),
    (
        'NordTech Robotics Oy',
        'NordTech Robotics is a Tampere based robotics innovation company specializing in autonomous manufacturing systems, machine vision, and industrial automation.',
        NULL,
        'https://nordtechrobotics.fi',
        'careers@nordtechrobotics.fi',
        'Tampere'
),
    (
        'Arctic DataWorks',
        'Arctic DataWorks is a Finnish data engineering consultancy focused on cloud native data platforms and secure data pipelines.',
        NULL,
        'https://arcticdataworks.com',
        'hr@arcticdataworks.com',
        'Finland'
),
    (
        'GreenVolt Energy Systems',
        'GreenVolt Energy Systems develops renewable energy management platforms, including smart grid controllers and energy storage optimization tools.',
        NULL,
        'https://greenvoltenergy.fi',
        'contact@greenvoltenergy.fi',
        'Finland'
),
    (
        'PolarWave Software Labs',
        'PolarWave Software Labs is a Helsinki based software R&D studio specializing in cloud native applications and AI powered developer tools.',
        NULL,
        'https://polarwave.dev',
        'jobs@polarwave.dev',
        'Helsinki'
),
    (
        'SkyForge Aeronautics',
        'SkyForge Aeronautics designs avionics systems, drone navigation software, and autonomous flight control modules.',
        NULL,
        'https://skyforgeaero.com',
        'careers@skyforgeaero.com',
        'Finland'
),
    (
        'FrostByte Cybersecurity',
        'FrostByte Cybersecurity provides advanced threat detection, penetration testing, and secure infrastructure design.',
        NULL,
        'https://frostbyte-sec.com',
        'security@frostbyte-sec.com',
        'Finland'
),
    (
        'Aurora HealthTech',
        'Aurora HealthTech builds digital health platforms, medical data analytics tools, and patient centric mobile applications.',
        NULL,
        'https://aurorahealthtech.fi',
        'info@aurorahealthtech.fi',
        'Finland'
)
ON CONFLICT
(name) DO NOTHING;

-- Insert positions for Kempower
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Software developer internship'),
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Senior Data Scientist'),
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Data Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Solution Electrical Designer'),
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Test Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Electrical Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Service Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Strategic Account Manager'),
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Solutions Project Manager'),
    ((SELECT id
        FROM companies
        WHERE name = 'Kempower'), 'Solutions Engineer');

-- Insert positions for LUT University
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'LUT University'), 'Data analyze internship'),
    ((SELECT id
        FROM companies
        WHERE name = 'LUT University'), 'Professor in industrial engineering and management in sustainable energy systems'),
    ((SELECT id
        FROM companies
        WHERE name = 'LUT University'), 'Professor in nuclear power engineering'),
    ((SELECT id
        FROM companies
        WHERE name = 'LUT University'), 'Professor in sustainable logistics in industrial engineering and management');

-- Insert positions for Hitachi High-Tech
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'Hitachi High-Tech Analytical Science Oy'), 'Software Test internship'),
    ((SELECT id
        FROM companies
        WHERE name = 'Hitachi High-Tech Analytical Science Oy'), 'Software Test Team Leader'),
    ((SELECT id
        FROM companies
        WHERE name = 'Hitachi High-Tech Analytical Science Oy'), 'Software Testing Engineer');

-- Insert positions for NordTech Robotics
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'NordTech Robotics Oy'), 'Robotics Software Intern'),
    ((SELECT id
        FROM companies
        WHERE name = 'NordTech Robotics Oy'), 'Summer Trainee – Robotics Assembly'),
    ((SELECT id
        FROM companies
        WHERE name = 'NordTech Robotics Oy'), 'Summer Trainee – Automation Testing'),
    ((SELECT id
        FROM companies
        WHERE name = 'NordTech Robotics Oy'), 'Machine Vision Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'NordTech Robotics Oy'), 'Senior Robotics Algorithm Developer'),
    ((SELECT id
        FROM companies
        WHERE name = 'NordTech Robotics Oy'), 'Automation Test Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'NordTech Robotics Oy'), 'Field Service Robotics Specialist');

-- Insert positions for Arctic DataWorks
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'Arctic DataWorks'), 'Data Engineering Intern'),
    ((SELECT id
        FROM companies
        WHERE name = 'Arctic DataWorks'), 'Summer Trainee – Cloud Infrastructure'),
    ((SELECT id
        FROM companies
        WHERE name = 'Arctic DataWorks'), 'Summer Trainee – Data Quality & ETL'),
    ((SELECT id
        FROM companies
        WHERE name = 'Arctic DataWorks'), 'Cloud Platform Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'Arctic DataWorks'), 'Senior Data Architect'),
    ((SELECT id
        FROM companies
        WHERE name = 'Arctic DataWorks'), 'DevOps Specialist'),
    ((SELECT id
        FROM companies
        WHERE name = 'Arctic DataWorks'), 'Analytics Consultant');

-- Insert positions for GreenVolt Energy
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'GreenVolt Energy Systems'), 'Embedded Systems Intern'),
    ((SELECT id
        FROM companies
        WHERE name = 'GreenVolt Energy Systems'), 'Summer Trainee – Energy Analytics'),
    ((SELECT id
        FROM companies
        WHERE name = 'GreenVolt Energy Systems'), 'Summer Trainee – Power Systems Simulation'),
    ((SELECT id
        FROM companies
        WHERE name = 'GreenVolt Energy Systems'), 'Power Electronics Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'GreenVolt Energy Systems'), 'Energy Data Scientist'),
    ((SELECT id
        FROM companies
        WHERE name = 'GreenVolt Energy Systems'), 'Grid Simulation Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'GreenVolt Energy Systems'), 'Sustainability Project Manager');

-- Insert positions for PolarWave Software
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'PolarWave Software Labs'), 'Software Developer Intern'),
    ((SELECT id
        FROM companies
        WHERE name = 'PolarWave Software Labs'), 'Summer Trainee – Full Stack Development'),
    ((SELECT id
        FROM companies
        WHERE name = 'PolarWave Software Labs'), 'Summer Trainee – QA Automation'),
    ((SELECT id
        FROM companies
        WHERE name = 'PolarWave Software Labs'), 'Backend Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'PolarWave Software Labs'), 'AI Tooling Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'PolarWave Software Labs'), 'QA Automation Specialist'),
    ((SELECT id
        FROM companies
        WHERE name = 'PolarWave Software Labs'), 'Technical Product Manager');

-- Insert positions for SkyForge Aeronautics
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'SkyForge Aeronautics'), 'Flight Software Intern'),
    ((SELECT id
        FROM companies
        WHERE name = 'SkyForge Aeronautics'), 'Summer Trainee – UAV Hardware Testing'),
    ((SELECT id
        FROM companies
        WHERE name = 'SkyForge Aeronautics'), 'Summer Trainee – Flight Simulation'),
    ((SELECT id
        FROM companies
        WHERE name = 'SkyForge Aeronautics'), 'Aeronautical Systems Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'SkyForge Aeronautics'), 'UAV Control Algorithm Developer'),
    ((SELECT id
        FROM companies
        WHERE name = 'SkyForge Aeronautics'), 'Hardware in the Loop Test Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'SkyForge Aeronautics'), 'Aerospace Project Coordinator');

-- Insert positions for FrostByte Cybersecurity
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'FrostByte Cybersecurity'), 'Cybersecurity Intern'),
    ((SELECT id
        FROM companies
        WHERE name = 'FrostByte Cybersecurity'), 'Summer Trainee – SOC Analyst'),
    ((SELECT id
        FROM companies
        WHERE name = 'FrostByte Cybersecurity'), 'Summer Trainee – Security Automation'),
    ((SELECT id
        FROM companies
        WHERE name = 'FrostByte Cybersecurity'), 'Security Operations Analyst'),
    ((SELECT id
        FROM companies
        WHERE name = 'FrostByte Cybersecurity'), 'Penetration Tester'),
    ((SELECT id
        FROM companies
        WHERE name = 'FrostByte Cybersecurity'), 'Cloud Security Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'FrostByte Cybersecurity'), 'Incident Response Specialist');

-- Insert positions for Aurora HealthTech
INSERT INTO positions
    (company_id, title)
VALUES
    ((SELECT id
        FROM companies
        WHERE name = 'Aurora HealthTech'), 'Health Data Intern'),
    ((SELECT id
        FROM companies
        WHERE name = 'Aurora HealthTech'), 'Summer Trainee – Medical Software Testing'),
    ((SELECT id
        FROM companies
        WHERE name = 'Aurora HealthTech'), 'Summer Trainee – Mobile Health UX Research'),
    ((SELECT id
        FROM companies
        WHERE name = 'Aurora HealthTech'), 'Mobile App Developer'),
    ((SELECT id
        FROM companies
        WHERE name = 'Aurora HealthTech'), 'Medical AI Research Engineer'),
    ((SELECT id
        FROM companies
        WHERE name = 'Aurora HealthTech'), 'Clinical Software Tester'),
    ((SELECT id
        FROM companies
        WHERE name = 'Aurora HealthTech'), 'Digital Health Project Manager');
