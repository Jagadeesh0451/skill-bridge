import { SkillCategoryInfo } from '../types';

export const SKILL_CATEGORIES: SkillCategoryInfo[] = [
  {
    id: 'cat-programming',
    name: 'Programming',
    icon: 'Code2',
    description: 'Master core programming fundamentals, algorithmic thinking, data structures, and multi-paradigm software engineering.',
    popularTopics: ['Data Structures & Algorithms', 'Python', 'C++', 'Java', 'Object-Oriented Design'],
    recommendedRole: 'Software Developer, Systems Engineer'
  },
  {
    id: 'cat-web-dev',
    name: 'Web Development',
    icon: 'Globe',
    description: 'Build responsive, accessible, full-stack web applications using modern web standards, frameworks, and APIs.',
    popularTopics: ['HTML5 & Semantic Markup', 'Modern CSS & Flexbox/Grid', 'JavaScript ES6+', 'React', 'REST APIs'],
    recommendedRole: 'Frontend Developer, Full-Stack Engineer'
  },
  {
    id: 'cat-ai-ml',
    name: 'AI / Machine Learning',
    icon: 'Cpu',
    description: 'Explore neural networks, computer vision, natural language processing, prompt engineering, and machine learning foundations.',
    popularTopics: ['Supervised Learning', 'Prompt Engineering', 'Deep Learning Basics', 'TensorFlow/PyTorch', 'Model Evaluation'],
    recommendedRole: 'Machine Learning Engineer, AI Practitioner'
  },
  {
    id: 'cat-data-science',
    name: 'Data Science',
    icon: 'Database',
    description: 'Extract insights from real-world data with statistical modeling, visualization, data wrangling, and exploratory analysis.',
    popularTopics: ['Pandas & NumPy', 'Data Visualization', 'SQL Queries', 'Exploratory Data Analysis', 'Statistical Testing'],
    recommendedRole: 'Data Analyst, BI Developer, Data Scientist'
  },
  {
    id: 'cat-cybersecurity',
    name: 'Cybersecurity',
    icon: 'ShieldCheck',
    description: 'Learn ethical hacking, application security, cryptography, network defense, and vulnerability assessment.',
    popularTopics: ['Network Security', 'OWASP Top 10', 'Cryptography Basics', 'Penetration Testing', 'Identity Management'],
    recommendedRole: 'Security Analyst, Ethical Hacker, AppSec Engineer'
  },
  {
    id: 'cat-cloud',
    name: 'Cloud Computing',
    icon: 'Cloud',
    description: 'Deploy, scale, and manage containerized systems across modern cloud architectures, serverless, and DevOps pipelines.',
    popularTopics: ['Cloud Architecture', 'Docker Containers', 'CI/CD Pipelines', 'Serverless Functions', 'Microservices'],
    recommendedRole: 'Cloud Engineer, DevOps Associate, Site Reliability Engineer'
  },
  {
    id: 'cat-comm-skills',
    name: 'Communication Skills',
    icon: 'MessageSquareText',
    description: 'Sharpen technical writing, team collaboration, clear verbal presentation, active listening, and peer review skills.',
    popularTopics: ['Technical Documentation', 'Presentation Skills', 'Active Listening', 'Cross-functional Collaboration', 'Conflict Resolution'],
    recommendedRole: 'Engineering Lead, Product Specialist, Team Collaborator'
  },
  {
    id: 'cat-aptitude',
    name: 'Aptitude',
    icon: 'BrainCircuit',
    description: 'Prepare for campus recruitment tests with quantitative aptitude, logical reasoning, and data interpretation practice.',
    popularTopics: ['Quantitative Ability', 'Logical Reasoning', 'Data Interpretation', 'Puzzles & Sequences', 'Time & Work Problems'],
    recommendedRole: 'Campus Placement Candidate, Competitive Exam Aspirant'
  },
  {
    id: 'cat-interview-skills',
    name: 'Interview Skills',
    icon: 'Briefcase',
    description: 'Conquer technical coding rounds, behavioral interviews (STAR method), system design basics, and HR question prep.',
    popularTopics: ['STAR Method Behavioral Prep', 'Live Coding Strategy', 'System Design Fundamentals', 'Resume Walkthrough', 'Salary Negotiation'],
    recommendedRole: 'Graduating CSE Candidate, Tech Job Seeker'
  },
  {
    id: 'cat-career-dev',
    name: 'Career Development',
    icon: 'Award',
    description: 'Navigate tech career paths, craft high-impact resumes, build open-source portfolios, and cultivate professional networks.',
    popularTopics: ['Tech Resume Engineering', 'LinkedIn Optimization', 'GitHub Portfolio Building', 'Open-Source Contributions', 'Mentorship'],
    recommendedRole: 'Career-Ready Student, Aspiring Tech Professional'
  }
];
