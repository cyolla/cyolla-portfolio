import {
  FiAward,
  FiBriefcase,
  FiCpu,
  FiGithub,
  FiHome,
  FiMail,
  FiMoon,
} from 'react-icons/fi';

export const personalInfo = {
  name: 'Cyolla Monthi Menezes',
  shortName: 'Cyolla',
  headline:
    'Software Engineer | Full Stack Developer | AI & Machine Learning Enthusiast | QA Engineer',
  about:
    'Postgraduate developer with real-world software engineering experience gained through industry internships. Specialises in designing and developing scalable web applications with a strong focus on performance, usability, and maintainable architecture. Combines a solid theoretical foundation with practical delivery while being comfortable navigating ambiguity, adapting to new technologies, and contributing from day one.',
  email: 'cyollamenezes3@gmail.com',
  phone: '+91 6362078547',
  github: 'https://github.com/cyolla',
  linkedin: 'https://www.linkedin.com/in/cyollamenezes',
  location: 'India',
  availability: 'Available for Work',
  heroRoles: [
    'Software Engineer',
    'Frontend Developer',
    'Full Stack Developer',
    'QA Engineer',
    'AI Developer',
  ],
};

export const navigation = [
  { id: 'about', label: 'Earth', subtitle: 'About', icon: FiHome, color: '#22d3ee' },
  { id: 'skills', label: 'Moon', subtitle: 'Skills', icon: FiMoon, color: '#8b5cf6' },
  { id: 'experience', label: 'Mars', subtitle: 'Experience', icon: FiBriefcase, color: '#f97316' },
  { id: 'projects', label: 'Jupiter', subtitle: 'Projects', icon: FiCpu, color: '#4f46e5' },
  { id: 'certifications', label: 'Saturn', subtitle: 'Certifications', icon: FiAward, color: '#facc15' },
  { id: 'github', label: 'Neptune', subtitle: 'GitHub', icon: FiGithub, color: '#60a5fa' },
  { id: 'contact', label: 'Station', subtitle: 'Contact', icon: FiMail, color: '#14b8a6' },
] as const;

export const education = [
  { degree: 'Master of Computer Applications', institution: 'Nitte University' },
  { degree: 'Bachelor of Computer Applications', institution: 'Mangalore University' },
];

export const skillGroups = [
  {
    title: 'Programming',
    items: ['Java', 'Python', 'JavaScript', 'C', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'React', 'Bootstrap', 'Responsive Web Design'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'Flask'],
  },
  {
    title: 'Database',
    items: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Testing',
    items: [
      'Manual Testing',
      'Functional Testing',
      'Regression Testing',
      'Smoke Testing',
      'API Testing',
      'Postman',
      'JUnit',
      'Selenium',
    ],
  },
  {
    title: 'Machine Learning',
    items: ['Scikit-learn', 'Logistic Regression', 'KNN', 'Decision Tree', 'Model Evaluation'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Flutter', 'Android Studio', 'Maven'],
  },
  {
    title: 'Core Concepts',
    items: ['REST APIs', 'OOP', 'Data Structures', 'SDLC', 'Agile', 'CI/CD'],
  },
];

export const experiences = [
  {
    company: 'CDQP Design Webtech Pvt Ltd',
    role: 'Frontend Developer Intern',
    duration: '05 Jan 2026 - 31 Jan 2026',
    responsibilities: [
      'Developed responsive interfaces for user-facing products.',
      'Created reusable UI components to accelerate delivery.',
      'Worked across HTML, CSS, JavaScript, and React workflows.',
    ],
  },
  {
    company: 'Softionik Solutions (OPC) Private Limited',
    role: 'Full Stack Developer Intern',
    duration: '16 Jan 2025 - 01 Jun 2026',
    responsibilities: [
      'Developed frontend and backend modules for production features.',
      'Integrated REST APIs using React, Node.js, Express.js, and MongoDB.',
      'Participated in Agile development with continuous iteration and delivery.',
    ],
  },
];

export const certifications = [
  'Software Testing and Automation Specialization',
  'Cloud Computing',
  'Flutter',
  'AWS Solutions Architect Simulation',
  'Data Science Simulation',
  'Advanced Software Engineering Simulation',
  'Foundations of Cybersecurity',
  'IBM Data Warehouse Fundamentals',
  'Google Crash Course on Python',
  'AI & Machine Learning Internship',
  'Computer Architecture Masterclass',
  'MongoDB Complete Developer Guide',
];

export const projects = [
  {
    name: 'AI Healthcare Chatbot & Multi Disease Prediction',
    orbit: 'Europa',
    stack: ['Python', 'Flask', 'Scikit-learn', 'HTML', 'CSS'],
    description:
      'Built an AI-assisted healthcare workflow that blends conversational support with predictive disease screening for faster early guidance.',
    features: ['Symptom-led chatbot', 'Prediction pipeline', 'Confidence reporting'],
  },
  {
    name: 'Mental Health Prediction',
    orbit: 'Io',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Jupyter'],
    description:
      'Developed a machine learning project to identify patterns linked to mental health outcomes and improve screening insight.',
    features: ['Data cleaning', 'Model comparison', 'Evaluation dashboard'],
  },
  {
    name: 'Vaccination Census System',
    orbit: 'Callisto',
    stack: ['React', 'Node.js', 'MongoDB'],
    description:
      'Created a data-driven census and vaccination tracking system to organise records, monitor status, and support reporting.',
    features: ['Citizen records', 'Status analytics', 'Search and filters'],
  },
  {
    name: 'Travel Agency Website',
    orbit: 'Ganymede',
    stack: ['HTML', 'CSS', 'JavaScript'],
    description:
      'Designed a visually rich travel experience site focused on destination storytelling, package discovery, and responsive browsing.',
    features: ['Destination showcases', 'Package cards', 'Mobile-first layout'],
  },
  {
    name: 'Banking System',
    orbit: 'Titan',
    stack: ['Java', 'SQL'],
    description:
      'Implemented a structured banking workflow with account management, transaction handling, and foundational security thinking.',
    features: ['Account operations', 'Transaction flow', 'Data persistence'],
  },
  {
    name: 'Handwritten Digit Recognition',
    orbit: 'Amalthea',
    stack: ['Python', 'TensorFlow', 'NumPy'],
    description:
      'Trained a digit-recognition model to classify handwritten numbers with a clean evaluation and inference workflow.',
    features: ['Image preprocessing', 'Model training', 'Prediction interface'],
  },
  {
    name: 'House Price Prediction',
    orbit: 'Elara',
    stack: ['Python', 'Scikit-learn', 'Pandas'],
    description:
      'Built a regression model for housing price estimation with feature analysis and model evaluation for practical insight.',
    features: ['Feature engineering', 'Regression analysis', 'Result visualisation'],
  },
  {
    name: 'Book Review Platform',
    orbit: 'Himalia',
    stack: ['React', 'Express.js', 'MongoDB'],
    description:
      'Developed a review platform where readers can discover titles, publish opinions, and browse community sentiment.',
    features: ['Review publishing', 'User flows', 'Content categorisation'],
  },
  {
    name: 'Task Manager',
    orbit: 'Pasiphae',
    stack: ['React', 'Node.js', 'MongoDB'],
    description:
      'Crafted a productivity workspace for organising tasks, tracking progress, and improving day-to-day execution.',
    features: ['Task boards', 'Progress states', 'CRUD operations'],
  },
  {
    name: 'Internship Tracker',
    orbit: 'Sinope',
    stack: ['React', 'Firebase'],
    description:
      'Created an internship management dashboard to monitor applications, status updates, and opportunity notes in one place.',
    features: ['Application stages', 'Notes panel', 'Status tracking'],
  },
  {
    name: 'Personal Portfolio',
    orbit: 'Lysithea',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    description:
      'Designed a strong personal brand experience that presents work, skills, and achievements through storytelling and interaction.',
    features: ['Animated sections', 'Responsive layout', 'Brand-focused UI'],
  },
  {
    name: 'Social Media Dashboard',
    orbit: 'Carme',
    stack: ['React', 'Charting', 'CSS'],
    description:
      'Built a clean metrics dashboard for tracking social performance, platform insights, and growth patterns.',
    features: ['Analytics cards', 'Trend views', 'Cross-platform summary'],
  },
  {
    name: 'Calculator',
    orbit: 'Ananke',
    stack: ['JavaScript', 'CSS'],
    description:
      'Implemented a refined calculator interface with accessible interactions and reliable arithmetic handling.',
    features: ['Keyboard support', 'Error states', 'Responsive controls'],
  },
  {
    name: 'Recipe Page',
    orbit: 'Leda',
    stack: ['HTML', 'CSS'],
    description:
      'Created a polished recipe reading experience with clear layout, ingredient hierarchy, and mobile responsiveness.',
    features: ['Structured content', 'Readable spacing', 'Responsive design'],
  },
  {
    name: 'Bento Grid',
    orbit: 'Metis',
    stack: ['React', 'CSS Grid'],
    description:
      'Explored expressive layout composition through a bento-style interface focused on rhythm, hierarchy, and clarity.',
    features: ['Adaptive grid', 'Visual storytelling', 'Component layout system'],
  },
  {
    name: 'Click Counter',
    orbit: 'Thebe',
    stack: ['React'],
    description:
      'Built an interactive counter app to practice state management, event handling, and clean user feedback.',
    features: ['Live state updates', 'Simple controls', 'Instant response'],
  },
  {
    name: 'Social Links',
    orbit: 'Adrastea',
    stack: ['HTML', 'CSS'],
    description:
      'Designed a compact profile card for presenting social destinations with strong visual emphasis and quick navigation.',
    features: ['Profile card', 'Link actions', 'Minimal layout'],
  },
  {
    name: 'Profile Component',
    orbit: 'Pandia',
    stack: ['HTML', 'CSS', 'JavaScript'],
    description:
      'Created a standalone profile component with clean presentation, responsive structure, and reusable styling ideas.',
    features: ['Component structure', 'Responsive styling', 'UI polish'],
  },
].map((project) => ({
  ...project,
  github: 'https://github.com/cyolla',
  demo: 'https://www.linkedin.com/in/cyollamenezes',
}));

export const achievements = [
  { label: 'Projects in Orbit', value: projects.length },
  { label: 'Certifications Docked', value: certifications.length },
  { label: 'Skill Signals', value: skillGroups.reduce((sum, group) => sum + group.items.length, 0) },
  { label: 'Mission Phases', value: navigation.length },
];
