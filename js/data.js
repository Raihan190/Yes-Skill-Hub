// ============================================================
// Yes Skill Hub — Mock Data Layer
// Organized so it can later be swapped for API/Supabase calls.
// ============================================================

export const categories = [
  { id: 'web-dev', name: 'Web Development', icon: '🌐', count: 3 },
  { id: 'design', name: 'Design', icon: '✦', count: 2 },
  { id: 'data', name: 'Data Science', icon: '📊', count: 1 },
  { id: 'marketing', name: 'Marketing', icon: '◐', count: 1 },
  { id: 'cloud', name: 'Cloud & DevOps', icon: '☁', count: 1 },
  { id: 'mobile', name: 'Mobile Development', icon: '▢', count: 1 },
];

export const instructors = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Senior Full-Stack Engineer',
    photo: 'https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'Sarah has spent over a decade building production web applications at scale. She has led engineering teams at fast-growing startups and now focuses on making advanced web development approachable for everyone.',
    shortBio: 'A decade of building production web apps at scale, now teaching the next generation of engineers.',
    expertise: ['React', 'Node.js', 'System Design', 'TypeScript'],
    qualifications: [
      'B.S. in Computer Science, UC Berkeley',
      'Former Lead Engineer at two YC-backed startups',
      'Contributor to React documentation',
    ],
    skills: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Docker', 'TypeScript'],
    courses: ['mern-stack-bootcamp', 'modern-graphql'],
    courseCount: 2,
    studentCount: 18420,
    rating: 4.9,
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    id: 'marcus-johnson',
    name: 'Marcus Johnson',
    title: 'Product Designer & UX Researcher',
    photo: 'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'Marcus is a product designer who has shipped interfaces used by millions. He blends research, prototyping, and visual craft to help teams build products people genuinely love using.',
    shortBio: 'Product designer shipping interfaces used by millions, now mentoring the next wave of UX talent.',
    expertise: ['UX Research', 'Figma', 'Design Systems', 'Prototyping'],
    qualifications: [
      'M.A. in Human-Computer Interaction, University of Washington',
      'Lead Designer at a top-100 mobile app',
      'Speaker at Config and Awwwards conferences',
    ],
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Motion Design', 'Accessibility'],
    courses: ['ux-design-mastery', 'graphic-design-fundamentals'],
    courseCount: 2,
    studentCount: 12750,
    rating: 4.8,
    social: { twitter: '#', linkedin: '#', dribbble: '#' },
  },
  {
    id: 'priya-patel',
    name: 'Priya Patel',
    title: 'Data Scientist & ML Engineer',
    photo: 'https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'Priya turns messy data into clear decisions. With a background in statistics and machine learning, she has built recommendation systems and analytics platforms for e-commerce and healthcare.',
    shortBio: 'Turning messy data into clear decisions with statistics, ML, and a love for teaching.',
    expertise: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization'],
    qualifications: [
      'Ph.D. in Statistics, Stanford University',
      'ML Engineer at a Fortune 500 retailer',
      'Published researcher in NeurIPS and ICML',
    ],
    skills: ['Python', 'pandas', 'scikit-learn', 'TensorFlow', 'SQL', 'Tableau', 'Statistics'],
    courses: ['data-science-complete'],
    courseCount: 1,
    studentCount: 9300,
    rating: 4.9,
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
  {
    id: 'david-okafor',
    name: 'David Okafor',
    title: 'Cloud Architect & DevOps Lead',
    photo: 'https://images.pexels.com/photos/26150470/pexels-photo-26150470.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
    bio: 'David architects cloud infrastructure that handles billions of requests. He is passionate about teaching developers how to ship reliably using modern DevOps practices and infrastructure as code.',
    shortBio: 'Architecting cloud infra for billions of requests, now making DevOps approachable for all.',
    expertise: ['AWS', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
    qualifications: [
      'AWS Solutions Architect Professional certified',
      'DevOps Lead at a global fintech',
      'Open-source contributor to Terraform providers',
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Linux', 'Python'],
    courses: ['cloud-devops-pro'],
    courseCount: 1,
    studentCount: 7100,
    rating: 4.7,
    social: { twitter: '#', linkedin: '#', github: '#' },
  },
];

export const courses = [
  {
    id: 'mern-stack-bootcamp',
    title: 'The Complete MERN Stack Bootcamp',
    subtitle: 'Build full-stack apps with MongoDB, Express, React, and Node',
    thumbnail: 'https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'web-dev',
    categoryName: 'Web Development',
    difficulty: 'Intermediate',
    instructorId: 'sarah-chen',
    price: 89.99,
    originalPrice: 199.99,
    duration: '42 hours',
    lessons: 248,
    rating: 4.9,
    reviewCount: 3210,
    studentCount: 12400,
    description: 'Go from beginner to job-ready full-stack developer. Build three real-world projects — a social platform, an e-commerce store, and a real-time chat app — using the MERN stack. You will learn authentication, REST APIs, database modeling, deployment, and performance optimization.',
    whatYouWillLearn: [
      'Build RESTful APIs with Express and Node.js',
      'Model complex data with MongoDB and Mongoose',
      'Create dynamic front-ends with React hooks and context',
      'Implement JWT authentication and authorization',
      'Deploy full-stack apps to production with CI/CD',
      'Optimize performance with caching and lazy loading',
    ],
    curriculum: [
      {
        section: 'Foundations',
        lessons: [
          { title: 'Course roadmap and project overview', duration: '12 min', type: 'video' },
          { title: 'Node.js fundamentals refresher', duration: '28 min', type: 'video' },
          { title: 'Express server setup walkthrough', duration: '35 min', type: 'video' },
          { title: 'REST API design principles', duration: '22 min', type: 'video' },
        ],
      },
      {
        section: 'Database Layer',
        lessons: [
          { title: 'MongoDB collections and documents', duration: '30 min', type: 'video' },
          { title: 'Mongoose schemas and validation', duration: '38 min', type: 'video' },
          { title: 'Relationships and population', duration: '45 min', type: 'video' },
          { title: 'Query optimization lab', duration: '25 min', type: 'lab' },
        ],
      },
      {
        section: 'React Front-End',
        lessons: [
          { title: 'Component architecture patterns', duration: '40 min', type: 'video' },
          { title: 'Hooks deep dive: useState, useEffect, useReducer', duration: '52 min', type: 'video' },
          { title: 'Context API for global state', duration: '34 min', type: 'video' },
          { title: 'Forms and validation', duration: '28 min', type: 'video' },
        ],
      },
      {
        section: 'Authentication',
        lessons: [
          { title: 'JWT tokens explained', duration: '26 min', type: 'video' },
          { title: 'Register and login flows', duration: '44 min', type: 'video' },
          { title: 'Protected routes and middleware', duration: '32 min', type: 'video' },
          { title: 'Auth security checklist', duration: '18 min', type: 'doc' },
        ],
      },
      {
        section: 'Deployment',
        lessons: [
          { title: 'Dockerizing the MERN stack', duration: '36 min', type: 'video' },
          { title: 'Deploying to Render / Railway', duration: '30 min', type: 'video' },
          { title: 'CI/CD with GitHub Actions', duration: '28 min', type: 'video' },
        ],
      },
    ],
    requirements: [
      'Basic JavaScript knowledge (variables, functions, arrays)',
      'Familiarity with HTML and CSS',
      'A computer with Node.js installed',
      'No prior React or backend experience needed',
    ],
    documents: [
      { name: 'MERN Project Starter Template', type: 'ZIP', size: '2.4 MB' },
      { name: 'API Design Cheat Sheet', type: 'PDF', size: '1.1 MB' },
      { name: 'MongoDB Schema Patterns Guide', type: 'PDF', size: '3.8 MB' },
    ],
    featured: true,
    bestseller: true,
  },
  {
    id: 'ux-design-mastery',
    title: 'UX Design Mastery: From Research to Prototype',
    subtitle: 'Master user-centered design with real client briefs',
    thumbnail: 'https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'design',
    categoryName: 'Design',
    difficulty: 'Beginner',
    instructorId: 'marcus-johnson',
    price: 74.99,
    originalPrice: 149.99,
    duration: '28 hours',
    lessons: 156,
    rating: 4.8,
    reviewCount: 2180,
    studentCount: 8900,
    description: 'Learn the complete UX design process from user research and wireframing to high-fidelity prototyping and usability testing. Work through three real client briefs and build a portfolio that gets you hired.',
    whatYouWillLearn: [
      'Conduct user interviews and synthesize research',
      'Create wireframes and user flows in Figma',
      'Design accessible, responsive interfaces',
      'Build interactive prototypes for testing',
      'Run usability tests and iterate on feedback',
      'Present design decisions to stakeholders',
    ],
    curriculum: [
      {
        section: 'UX Fundamentals',
        lessons: [
          { title: 'What is user-centered design?', duration: '15 min', type: 'video' },
          { title: 'The design thinking process', duration: '22 min', type: 'video' },
          { title: 'Understanding user mental models', duration: '28 min', type: 'video' },
        ],
      },
      {
        section: 'Research Methods',
        lessons: [
          { title: 'Planning and conducting interviews', duration: '35 min', type: 'video' },
          { title: 'Surveys and quantitative data', duration: '26 min', type: 'video' },
          { title: 'Affinity mapping and personas', duration: '30 min', type: 'video' },
          { title: 'Research synthesis worksheet', duration: '15 min', type: 'doc' },
        ],
      },
      {
        section: 'Wireframing & Prototyping',
        lessons: [
          { title: 'Low-fidelity wireframing techniques', duration: '32 min', type: 'video' },
          { title: 'Figma fundamentals', duration: '45 min', type: 'video' },
          { title: 'Building interactive prototypes', duration: '40 min', type: 'video' },
          { title: 'Component libraries and variants', duration: '28 min', type: 'video' },
        ],
      },
      {
        section: 'Testing & Delivery',
        lessons: [
          { title: 'Usability testing methods', duration: '35 min', type: 'video' },
          { title: 'Analyzing test results', duration: '25 min', type: 'video' },
          { title: 'Design handoff best practices', duration: '22 min', type: 'video' },
        ],
      },
    ],
    requirements: [
      'No prior design experience needed',
      'A free Figma account',
      'Curiosity about how people use products',
    ],
    documents: [
      { name: 'UX Research Template Kit', type: 'FIG', size: '—' },
      { name: 'Persona Canvas Printable', type: 'PDF', size: '0.8 MB' },
      { name: 'Usability Test Script Template', type: 'PDF', size: '0.5 MB' },
    ],
    featured: true,
    bestseller: false,
  },
  {
    id: 'data-science-complete',
    title: 'Data Science Complete: Python to Production',
    subtitle: 'Master the full data science lifecycle with hands-on projects',
    thumbnail: 'https://images.pexels.com/photos/3912976/pexels-photo-3912976.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'data',
    categoryName: 'Data Science',
    difficulty: 'Intermediate',
    instructorId: 'priya-patel',
    price: 94.99,
    originalPrice: 189.99,
    duration: '36 hours',
    lessons: 192,
    rating: 4.9,
    reviewCount: 1540,
    studentCount: 6200,
    description: 'A complete journey from Python basics to deploying machine learning models. You will work with real datasets, build predictive models, create data visualizations, and deploy an end-to-end ML pipeline.',
    whatYouWillLearn: [
      'Clean and analyze data with pandas and NumPy',
      'Build predictive models with scikit-learn',
      'Create compelling visualizations with Matplotlib and Seaborn',
      'Apply statistical methods to real problems',
      'Deploy ML models as APIs with FastAPI',
      'Build a complete data science portfolio',
    ],
    curriculum: [
      {
        section: 'Python for Data Science',
        lessons: [
          { title: 'Python environment and Jupyter setup', duration: '20 min', type: 'video' },
          { title: 'NumPy arrays and operations', duration: '38 min', type: 'video' },
          { title: 'pandas DataFrames deep dive', duration: '52 min', type: 'video' },
          { title: 'Data cleaning lab', duration: '40 min', type: 'lab' },
        ],
      },
      {
        section: 'Statistics & EDA',
        lessons: [
          { title: 'Descriptive statistics refresher', duration: '30 min', type: 'video' },
          { title: 'Hypothesis testing in practice', duration: '42 min', type: 'video' },
          { title: 'Exploratory data analysis techniques', duration: '45 min', type: 'video' },
        ],
      },
      {
        section: 'Machine Learning',
        lessons: [
          { title: 'Regression and classification', duration: '50 min', type: 'video' },
          { title: 'Feature engineering', duration: '38 min', type: 'video' },
          { title: 'Model evaluation and tuning', duration: '44 min', type: 'video' },
          { title: 'Ensemble methods', duration: '36 min', type: 'video' },
        ],
      },
      {
        section: 'Deployment',
        lessons: [
          { title: 'Building ML APIs with FastAPI', duration: '40 min', type: 'video' },
          { title: 'Dockerizing your model', duration: '28 min', type: 'video' },
          { title: 'Monitoring in production', duration: '25 min', type: 'video' },
        ],
      },
    ],
    requirements: [
      'Basic Python knowledge',
      'High school level math',
      'No statistics background required',
    ],
    documents: [
      { name: 'Dataset Collection (5 datasets)', type: 'ZIP', size: '45 MB' },
      { name: 'Statistics Quick Reference', type: 'PDF', size: '2.1 MB' },
      { name: 'ML Model Checklist', type: 'PDF', size: '0.9 MB' },
    ],
    featured: true,
    bestseller: true,
  },
  {
    id: 'digital-marketing-pro',
    title: 'Digital Marketing Pro: Strategy to Execution',
    subtitle: 'Build marketing campaigns that actually convert',
    thumbnail: 'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'marketing',
    categoryName: 'Marketing',
    difficulty: 'Beginner',
    instructorId: 'marcus-johnson',
    price: 64.99,
    originalPrice: 129.99,
    duration: '22 hours',
    lessons: 128,
    rating: 4.7,
    reviewCount: 980,
    studentCount: 5400,
    description: 'Learn the full digital marketing toolkit — SEO, content strategy, paid ads, email marketing, and analytics. Build a complete marketing plan for a real brand and track your results.',
    whatYouWillLearn: [
      'Build an end-to-end digital marketing strategy',
      'Master SEO fundamentals and keyword research',
      'Run paid ad campaigns on Google and Meta',
      'Create email sequences that convert',
      'Measure performance with Google Analytics',
      'Build a content calendar that scales',
    ],
    curriculum: [
      {
        section: 'Strategy Foundations',
        lessons: [
          { title: 'The modern marketing funnel', duration: '18 min', type: 'video' },
          { title: 'Defining your audience', duration: '25 min', type: 'video' },
          { title: 'Brand positioning', duration: '22 min', type: 'video' },
        ],
      },
      {
        section: 'SEO & Content',
        lessons: [
          { title: 'Keyword research tools and methods', duration: '30 min', type: 'video' },
          { title: 'On-page SEO optimization', duration: '28 min', type: 'video' },
          { title: 'Content strategy and calendars', duration: '35 min', type: 'video' },
        ],
      },
      {
        section: 'Paid Ads & Email',
        lessons: [
          { title: 'Google Ads campaign setup', duration: '40 min', type: 'video' },
          { title: 'Meta Ads creative best practices', duration: '32 min', type: 'video' },
          { title: 'Email automation sequences', duration: '38 min', type: 'video' },
        ],
      },
      {
        section: 'Analytics',
        lessons: [
          { title: 'Google Analytics 4 setup', duration: '30 min', type: 'video' },
          { title: 'Building dashboards and reports', duration: '28 min', type: 'video' },
        ],
      },
    ],
    requirements: [
      'No marketing experience needed',
      'A laptop and internet connection',
      'Willingness to experiment and test',
    ],
    documents: [
      { name: 'Marketing Strategy Template', type: 'PDF', size: '1.4 MB' },
      { name: 'Content Calendar Spreadsheet', type: 'XLSX', size: '0.3 MB' },
    ],
    featured: false,
    bestseller: false,
  },
  {
    id: 'cloud-devops-pro',
    title: 'Cloud & DevOps Pro: AWS to Kubernetes',
    subtitle: 'Ship reliable infrastructure at scale',
    thumbnail: 'https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'cloud',
    categoryName: 'Cloud & DevOps',
    difficulty: 'Advanced',
    instructorId: 'david-okafor',
    price: 99.99,
    originalPrice: 199.99,
    duration: '38 hours',
    lessons: 174,
    rating: 4.8,
    reviewCount: 760,
    studentCount: 4100,
    description: 'Master modern cloud infrastructure from the ground up. Learn AWS services, containerization with Docker, orchestration with Kubernetes, and infrastructure as code with Terraform. Build a complete CI/CD pipeline.',
    whatYouWillLearn: [
      'Provision AWS resources with Terraform',
      'Containerize applications with Docker',
      'Orchestrate services with Kubernetes',
      'Build CI/CD pipelines with GitHub Actions',
      'Implement monitoring and alerting',
      'Design for high availability and scale',
    ],
    curriculum: [
      {
        section: 'Cloud Foundations',
        lessons: [
          { title: 'AWS core services overview', duration: '30 min', type: 'video' },
          { title: 'IAM and security basics', duration: '35 min', type: 'video' },
          { title: 'VPC networking fundamentals', duration: '42 min', type: 'video' },
        ],
      },
      {
        section: 'Infrastructure as Code',
        lessons: [
          { title: 'Terraform basics', duration: '38 min', type: 'video' },
          { title: 'Managing state and modules', duration: '40 min', type: 'video' },
          { title: 'Provisioning a 3-tier app', duration: '45 min', type: 'lab' },
        ],
      },
      {
        section: 'Containers & Kubernetes',
        lessons: [
          { title: 'Docker deep dive', duration: '42 min', type: 'video' },
          { title: 'Kubernetes architecture', duration: '38 min', type: 'video' },
          { title: 'Deploying to EKS', duration: '50 min', type: 'video' },
          { title: 'Helm charts and package management', duration: '35 min', type: 'video' },
        ],
      },
      {
        section: 'CI/CD & Observability',
        lessons: [
          { title: 'GitHub Actions pipelines', duration: '40 min', type: 'video' },
          { title: 'Monitoring with Prometheus and Grafana', duration: '38 min', type: 'video' },
          { title: 'Alerting and incident response', duration: '28 min', type: 'video' },
        ],
      },
    ],
    requirements: [
      'Comfortable with Linux command line',
      'Basic programming experience (any language)',
      'Understanding of networking basics',
    ],
    documents: [
      { name: 'Terraform Module Library', type: 'ZIP', size: '1.8 MB' },
      { name: 'Kubernetes Cheat Sheet', type: 'PDF', size: '2.2 MB' },
      { name: 'AWS Service Reference Card', type: 'PDF', size: '1.5 MB' },
    ],
    featured: true,
    bestseller: false,
  },
  {
    id: 'mobile-app-react-native',
    title: 'Mobile App Development with React Native',
    subtitle: 'Ship cross-platform apps for iOS and Android',
    thumbnail: 'https://images.pexels.com/photos/20694602/pexels-photo-20694602.png?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'mobile',
    categoryName: 'Mobile Development',
    difficulty: 'Intermediate',
    instructorId: 'sarah-chen',
    price: 79.99,
    originalPrice: 159.99,
    duration: '30 hours',
    lessons: 164,
    rating: 4.7,
    reviewCount: 1120,
    studentCount: 6800,
    description: 'Build production-ready mobile apps with React Native. Learn navigation, state management, native device APIs, animations, and app store deployment. Ship a complete app to both iOS and Android.',
    whatYouWillLearn: [
      'Set up React Native with Expo',
      'Build navigable multi-screen apps',
      'Manage state with Redux Toolkit',
      'Access camera, location, and notifications',
      'Create smooth animations and gestures',
      'Deploy to App Store and Google Play',
    ],
    curriculum: [
      {
        section: 'Getting Started',
        lessons: [
          { title: 'React Native vs other frameworks', duration: '15 min', type: 'video' },
          { title: 'Expo setup and first app', duration: '28 min', type: 'video' },
          { title: 'Core components and styling', duration: '35 min', type: 'video' },
        ],
      },
      {
        section: 'Navigation & State',
        lessons: [
          { title: 'React Navigation patterns', duration: '42 min', type: 'video' },
          { title: 'Redux Toolkit for mobile', duration: '45 min', type: 'video' },
          { title: 'Data fetching and caching', duration: '38 min', type: 'video' },
        ],
      },
      {
        section: 'Native Features',
        lessons: [
          { title: 'Camera and image picker', duration: '35 min', type: 'video' },
          { title: 'Geolocation and maps', duration: '40 min', type: 'video' },
          { title: 'Push notifications', duration: '42 min', type: 'video' },
        ],
      },
      {
        section: 'Polish & Deploy',
        lessons: [
          { title: 'Animations with Reanimated', duration: '45 min', type: 'video' },
          { title: 'App Store deployment guide', duration: '38 min', type: 'video' },
          { title: 'Over-the-air updates with EAS', duration: '25 min', type: 'video' },
        ],
      },
    ],
    requirements: [
      'Solid JavaScript and React fundamentals',
      'A smartphone for testing (optional)',
      'No mobile development experience needed',
    ],
    documents: [
      { name: 'React Native Starter Project', type: 'ZIP', size: '3.2 MB' },
      { name: 'App Store Submission Checklist', type: 'PDF', size: '0.6 MB' },
    ],
    featured: false,
    bestseller: false,
  },
  {
    id: 'graphic-design-fundamentals',
    title: 'Graphic Design Fundamentals',
    subtitle: 'Master visual communication and brand identity',
    thumbnail: 'https://images.pexels.com/photos/17279851/pexels-photo-17279851.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'design',
    categoryName: 'Design',
    difficulty: 'Beginner',
    instructorId: 'marcus-johnson',
    price: 54.99,
    originalPrice: 109.99,
    duration: '18 hours',
    lessons: 98,
    rating: 4.6,
    reviewCount: 640,
    studentCount: 3900,
    description: 'Learn the principles of visual design — typography, color theory, composition, and brand identity. Build a complete brand kit and portfolio-ready design projects.',
    whatYouWillLearn: [
      'Apply principles of composition and layout',
      'Choose and pair typefaces with confidence',
      'Build cohesive color palettes',
      'Design logos and brand identity systems',
      'Create social media and print graphics',
      'Develop a professional design portfolio',
    ],
    curriculum: [
      {
        section: 'Design Principles',
        lessons: [
          { title: 'Visual hierarchy and balance', duration: '20 min', type: 'video' },
          { title: 'Grid systems and alignment', duration: '25 min', type: 'video' },
          { title: 'White space and rhythm', duration: '18 min', type: 'video' },
        ],
      },
      {
        section: 'Typography & Color',
        lessons: [
          { title: 'Type anatomy and classification', duration: '30 min', type: 'video' },
          { title: 'Pairing typefaces', duration: '25 min', type: 'video' },
          { title: 'Color theory for designers', duration: '35 min', type: 'video' },
        ],
      },
      {
        section: 'Brand Identity',
        lessons: [
          { title: 'Logo design process', duration: '40 min', type: 'video' },
          { title: 'Building a brand kit', duration: '35 min', type: 'video' },
          { title: 'Brand guidelines document', duration: '28 min', type: 'video' },
        ],
      },
    ],
    requirements: [
      'No prior design experience needed',
      'A free Canva or Figma account',
    ],
    documents: [
      { name: 'Brand Kit Template', type: 'FIG', size: '—' },
      { name: 'Color Palette Generator Guide', type: 'PDF', size: '0.7 MB' },
    ],
    featured: false,
    bestseller: false,
  },
  {
    id: 'modern-graphql',
    title: 'Modern GraphQL: APIs Done Right',
    subtitle: 'Build type-safe APIs with GraphQL and Apollo',
    thumbnail: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'web-dev',
    categoryName: 'Web Development',
    difficulty: 'Intermediate',
    instructorId: 'sarah-chen',
    price: 69.99,
    originalPrice: 139.99,
    duration: '20 hours',
    lessons: 112,
    rating: 4.8,
    reviewCount: 520,
    studentCount: 3200,
    description: 'Learn GraphQL from schema design to production. Build a complete GraphQL API with Apollo Server, implement subscriptions, and connect a React client with Apollo Client.',
    whatYouWillLearn: [
      'Design GraphQL schemas and resolvers',
      'Implement queries, mutations, and subscriptions',
      'Connect React with Apollo Client',
      'Handle authentication and authorization',
      'Optimize with DataLoader and caching',
      'Deploy and monitor GraphQL APIs',
    ],
    curriculum: [
      {
        section: 'GraphQL Foundations',
        lessons: [
          { title: 'GraphQL vs REST', duration: '18 min', type: 'video' },
          { title: 'Schema definition language', duration: '30 min', type: 'video' },
          { title: 'Resolvers and data sources', duration: '35 min', type: 'video' },
        ],
      },
      {
        section: 'Apollo Server',
        lessons: [
          { title: 'Setting up Apollo Server', duration: '28 min', type: 'video' },
          { title: 'Queries and mutations', duration: '40 min', type: 'video' },
          { title: 'Subscriptions with WebSockets', duration: '38 min', type: 'video' },
        ],
      },
      {
        section: 'Apollo Client',
        lessons: [
          { title: 'Connecting React to GraphQL', duration: '35 min', type: 'video' },
          { title: 'Cache management', duration: '30 min', type: 'video' },
          { title: 'Optimistic UI updates', duration: '28 min', type: 'video' },
        ],
      },
    ],
    requirements: [
      'Intermediate JavaScript and Node.js',
      'Basic React knowledge',
    ],
    documents: [
      { name: 'GraphQL Schema Examples', type: 'ZIP', size: '0.5 MB' },
      { name: 'Apollo Cheat Sheet', type: 'PDF', size: '0.8 MB' },
    ],
    featured: false,
    bestseller: false,
  },
];

export const reviews = [
  { courseId: 'mern-stack-bootcamp', studentName: 'Alex Rivera', studentPhoto: 'https://images.pexels.com/photos/16160855/pexels-photo-16160855.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, date: '2 weeks ago', text: 'This course completely changed my career. I went from knowing basic JavaScript to landing a full-stack developer role. The projects are real-world quality, not toy apps.' },
  { courseId: 'mern-stack-bootcamp', studentName: 'Jenna Park', studentPhoto: 'https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, date: '1 month ago', text: 'Sarah explains complex topics in a way that just clicks. The authentication section alone is worth the price. Highly recommend.' },
  { courseId: 'ux-design-mastery', studentName: 'Tom Wilson', studentPhoto: 'https://images.pexels.com/photos/16120646/pexels-photo-16120646.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, date: '3 weeks ago', text: 'I came in with zero design experience and now have a portfolio that got me interviews. The real client briefs make all the difference.' },
  { courseId: 'data-science-complete', studentName: 'Maya Singh', studentPhoto: 'https://images.pexels.com/photos/16173670/pexels-photo-16173670.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, date: '1 week ago', text: 'Priya makes statistics approachable. The ML projects are genuinely portfolio-worthy. I went from spreadsheets to deploying my first model.' },
  { courseId: 'cloud-devops-pro', studentName: 'Chris Lee', studentPhoto: 'https://images.pexels.com/photos/16160855/pexels-photo-16160855.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 4, date: '2 months ago', text: 'Very thorough coverage of AWS and Kubernetes. Some sections are dense but David explains everything clearly. Great for leveling up.' },
  { courseId: 'ux-design-mastery', studentName: 'Nina Brooks', studentPhoto: 'https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, date: '1 month ago', text: 'The Figma lessons are fantastic. I went from struggling with the interface to building full design systems. Marcus is a great teacher.' },
  { courseId: 'data-science-complete', studentName: 'James Foster', studentPhoto: 'https://images.pexels.com/photos/16120646/pexels-photo-16120646.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, date: '3 weeks ago', text: 'The deployment section was a game-changer. Being able to put my models into production gave me confidence in interviews.' },
  { courseId: 'mobile-app-react-native', studentName: 'Sara Kim', studentPhoto: 'https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', rating: 5, date: '2 weeks ago', text: 'I shipped my first app to the App Store after this course. The Expo workflow makes everything so smooth. Highly recommend!' },
];

export const testimonials = [
  { studentName: 'Alex Rivera', studentPhoto: 'https://images.pexels.com/photos/16160855/pexels-photo-16160855.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', course: 'MERN Stack Bootcamp', rating: 5, text: 'I went from a retail job to a full-stack developer role in 6 months. The real-world projects gave me the portfolio I needed to get hired.' },
  { studentName: 'Jenna Park', studentPhoto: 'https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', course: 'UX Design Mastery', rating: 5, text: 'The instructors actually care. I got feedback on my portfolio projects that helped me land my first design job at a startup.' },
  { studentName: 'Tom Wilson', studentPhoto: 'https://images.pexels.com/photos/16120646/pexels-photo-16120646.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', course: 'Data Science Complete', rating: 5, text: 'The hands-on projects made all the difference. I was applying what I learned at work the very next day. Worth every penny.' },
  { studentName: 'Maya Singh', studentPhoto: 'https://images.pexels.com/photos/16173670/pexels-photo-16173670.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', course: 'Cloud & DevOps Pro', rating: 5, text: 'I finally understand Kubernetes. The way David breaks down complex infrastructure into manageable pieces is incredible.' },
];

export const stats = [
  { value: 8, suffix: '+', label: 'Expert-led courses' },
  { value: 47500, suffix: '+', label: 'Active students' },
  { value: 4, suffix: '', label: 'Industry instructors' },
  { value: 92, suffix: '%', label: 'Completion rate' },
];

export const benefits = [
  { icon: '◉', title: 'Learn by building', description: 'Every course is project-based. You don\'t just watch — you build real applications you can show employers.' },
  { icon: '◐', title: 'Industry experts', description: 'Courses are taught by practitioners who ship products for a living, not just theory lecturers.' },
  { icon: '◇', title: 'Lifetime access', description: 'Enroll once and keep the content forever, including all future updates and new lessons.' },
  { icon: '◈', title: 'Career support', description: 'Get portfolio reviews, resume tips, and interview prep resources with every enrollment.' },
  { icon: '◆', title: 'Certificates', description: 'Earn a completion certificate for each course you finish. Share it on LinkedIn and your resume.' },
  { icon: '◊', title: 'Community access', description: 'Join a community of learners, get your questions answered, and find study partners.' },
];

// Helper functions
export function getCourseById(id) {
  return courses.find(c => c.id === id);
}

export function getInstructorById(id) {
  return instructors.find(i => i.id === id);
}

export function getReviewsByCourse(courseId) {
  return reviews.filter(r => r.courseId === courseId);
}

export function getRelatedCourses(courseId, limit = 3) {
  const course = getCourseById(courseId);
  if (!course) return [];
  return courses
    .filter(c => c.id !== courseId && c.category === course.category)
    .slice(0, limit);
}

export function getFeaturedCourses() {
  return courses.filter(c => c.featured);
}

export function getAllCourses() {
  return courses;
}
