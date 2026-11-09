/**
 * Centralized Portfolio Configuration for Debdulal Sahoo
 * Fully preserved verified data with enhanced categories and journey milestones.
 */

export interface Project {
  id: string;
  name: string;
  category: string;
  filterCategory: 'AI Applications' | 'AI SaaS' | 'Platforms' | 'E-commerce';
  role: string;
  tagline: string;
  description: string;
  features: string[];
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  isFlagship?: boolean;
  statusNotice?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    highlight?: boolean;
  }[];
}

export interface JourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  boardOrAffiliation?: string;
  duration: string;
  score?: string;
  description: string;
  current?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  type: string;
  duration: string;
  location: string;
  description: string;
  focusAreas: string[];
  technologies: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Debdulal Sahoo",
    shortName: "DS.",
    roleTitle: "AI/ML Developer | AI Product Builder | Entrepreneur",
    headlineKicker: "HELLO, I'M DEBDULAL SAHOO",
    tagline: "From Artificial Intelligence to Real-World Innovation.",
    headline: "Creating Intelligent Experiences with AI.",
    headlineRoles: [
      "AI/ML Developer",
      "Generative AI Developer",
      "AI Product Builder",
      "Multi-Agent Systems Developer",
      "Independent Technology Builder",
    ],
    subheadline:
      "I build AI-powered applications, intelligent agents, and innovative digital products that turn complex ideas into practical solutions.",
    missionLine:
      "From AI-powered platforms to real-world digital products, I turn ideas into working solutions.",
    summary:
      "I am a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning. I enjoy transforming ideas into practical technology products through machine learning, generative AI, intelligent agents, and modern software development. Beyond learning AI, I actively build real-world digital products, AI-powered platforms, and online business solutions. My goal is to create useful technology that solves practical problems.",
    aboutDetailed:
      "I am currently pursuing B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning at Brainware University. I am passionate about machine learning, generative AI, large language models, and autonomous AI agents. I enjoy developing practical applications, experimenting with emerging technologies, and building digital products. Alongside my academic journey, I have worked on independent projects involving AI-powered platforms, SaaS applications, and e-commerce solutions. I believe the future belongs to people who can combine technical knowledge with creativity and execution.",
    location: "Contai, West Bengal, India",
    availabilityNotice: "Open to Remote Opportunities",
    avatarUrl: "/src/assets/images/debdulal_original_portrait.png",
    avatarVideoUrl: "/assets/aistudio/Animate_portrait_into_video_2d056212_11246ca7.mp4",
    email: "sahoodebdulal19@gmail.com",
    phone: "+91 97334 00000",
    resumeDownloadPath: "/Debdulal_Sahoo_Resume.pdf",
    academicStats: {
      cgpa: "8.6/10",
      graduation: "Expected August 2027",
      degree: "B.Tech CSE (AI & ML)",
      university: "Brainware University",
      location: "West Bengal, India",
    },
  },

  socialLinks: {
    github: "https://github.com/debdulal00",
    linkedin: "https://www.linkedin.com/in/debdulal-sahoo-104194286/",
    toolsverse: "https://toolsverseai.com/",
    indonest: "https://indonest.online/",
    emailMailto: "mailto:sahoodebdulal19@gmail.com",
  },

  journey: [
    {
      year: "Phase 1",
      title: "Programming Foundations",
      subtitle: "Algorithmic Foundations in C++ & Python",
      description:
        "Mastered fundamental computational structures, discrete mathematics, object-oriented design, algorithmic complexity, and structured problem-solving.",
      highlights: ["Data Structures & Algorithms", "C++ & Modern Python", "Brainware University Matriculation"],
    },
    {
      year: "Phase 2",
      title: "Machine Learning Education",
      subtitle: "Statistical Modeling & Predictive Pipelines",
      description:
        "Deep exploration of mathematical machine learning, linear algebra, gradient optimization, Scikit-learn, Pandas, NumPy, and predictive model evaluation metrics.",
      highlights: ["Feature Engineering", "Supervised & Unsupervised ML", "Academic CGPA 8.6/10"],
    },
    {
      year: "Phase 3",
      title: "Generative AI Exploration",
      subtitle: "Prompt Architectures & Vector RAG Retrieval",
      description:
        "Transitioned into foundation model engineering: orchestrating Gemini API, embedding models, retrieval-augmented generation pipelines, and context caching.",
      highlights: ["LLM Orchestration", "Vector Embeddings & RAG", "Context Retention Design"],
    },
    {
      year: "Phase 4",
      title: "AI Agent Development",
      subtitle: "Multi-Agent State Graphs via LangGraph",
      description:
        "Architected multi-agent applications (AI Travel Planner, SivInd AI) utilizing stateful graph graphs, external search tools, and autonomous agent loops.",
      highlights: ["LangGraph & LangChain", "Stateful Graph Architectures", "Tool Integration"],
    },
    {
      year: "Phase 5",
      title: "Independent Product Building",
      subtitle: "Launching Deployed Platforms to Real Users",
      description:
        "Shipped ToolsVerse AI as a centralized AI tools suite and IndoNest as a live digital storefront, combining full-stack execution with entrepreneurial ownership.",
      highlights: ["toolsverseai.com Deployed", "indonest.online Live", "Open to Global AI Roles"],
    },
  ] as JourneyMilestone[],

  skillsCategories: [
    {
      id: "programming",
      title: "Programming",
      description: "Core languages used for robust algorithms, backend pipelines, and ML systems.",
      skills: [
        { name: "Python", highlight: true },
        { name: "C++", highlight: true },
        { name: "SQL", highlight: true },
        { name: "TypeScript", highlight: false },
        { name: "JavaScript", highlight: false },
      ],
    },
    {
      id: "ml-data",
      title: "Machine Learning",
      description: "Statistical modeling, predictive algorithms, and structured data manipulation.",
      skills: [
        { name: "Scikit-learn", highlight: true },
        { name: "Pandas", highlight: true },
        { name: "NumPy", highlight: true },
        { name: "Feature Engineering", highlight: false },
        { name: "Model Evaluation", highlight: false },
        { name: "Data Analysis", highlight: true },
      ],
    },
    {
      id: "genai",
      title: "Generative AI",
      description: "State-of-the-art foundation models, contextual retrieval, and agent architectures.",
      skills: [
        { name: "Large Language Models (LLMs)", highlight: true },
        { name: "Retrieval-Augmented Generation (RAG)", highlight: true },
        { name: "Prompt Engineering", highlight: true },
        { name: "AI Agents", highlight: true },
        { name: "Multi-Agent Systems", highlight: true },
      ],
    },
    {
      id: "frameworks",
      title: "Frameworks & Orchestration",
      description: "Specialized toolkits for chaining reasoning, state graphs, and AI interfaces.",
      skills: [
        { name: "LangChain", highlight: true },
        { name: "LangGraph", highlight: true },
        { name: "Streamlit", highlight: true },
        { name: "React", highlight: false },
        { name: "Tailwind CSS", highlight: false },
      ],
    },
    {
      id: "development",
      title: "Development & Cloud",
      description: "Server runtimes, cloud databases, authentication, and deployment tooling.",
      skills: [
        { name: "Node.js", highlight: true },
        { name: "Express.js", highlight: false },
        { name: "PostgreSQL", highlight: true },
        { name: "Firebase", highlight: true },
        { name: "Git", highlight: false },
        { name: "GitHub", highlight: false },
      ],
    },
    {
      id: "fundamentals",
      title: "Computer Science Fundamentals",
      description: "Core computational foundations, data structure design, and software architecture.",
      skills: [
        { name: "Data Structures & Algorithms (DSA)", highlight: true },
        { name: "Object-Oriented Programming (OOP)", highlight: true },
        { name: "Database Management Systems (DBMS)", highlight: true },
        { name: "Problem Solving", highlight: true },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "toolsverse-ai",
      name: "ToolsVerse AI",
      category: "AI Tools & Productivity Platform",
      filterCategory: "Platforms",
      role: "Founder / Lead Developer",
      tagline: "Online digital platform bringing modern AI utilities together.",
      description:
        "ToolsVerse AI is an online digital platform designed to bring useful AI-powered tools and productivity solutions together in one place. The platform focuses on making modern AI capabilities and digital utilities accessible through a user-friendly experience.",
      features: [
        "Curated suite of AI-powered digital utilities and workflow accelerators",
        "Streamlined productivity solutions for content and productivity tasks",
        "Centralized online tool discovery with zero friction",
        "Modern responsive dark-mode interface built for speed and accessibility",
        "Scalable digital product architecture designed for continuous utility rollout",
      ],
      technologies: ["React", "TypeScript", "Node.js", "AI APIs", "Tailwind CSS", "Vercel"],
      imageUrl: "/src/assets/images/project_toolsverse_ai_1794241503422.jpg",
      liveUrl: "https://toolsverseai.com/",
      isFlagship: true,
    },
    {
      id: "sivind-ai",
      name: "SivInd AI",
      category: "AI SaaS / Intelligent Customer Support",
      filterCategory: "AI SaaS",
      role: "Founder / Lead Developer",
      tagline: "AI-powered customer support SaaS platform for automated business workflows.",
      description:
        "An AI-powered customer support SaaS platform designed to help businesses automate customer interactions and provide intelligent support experiences.",
      features: [
        "AI-powered customer support with persistent context retention",
        "Knowledge-base-driven accurate responses without hallucination",
        "Multilingual assistance to serve global customer demographics",
        "Automated lead collection and qualification pipelines",
        "Interactive customer interaction analytics dashboard",
        "Business automation workflows with integrated subscription processing",
      ],
      technologies: ["Node.js", "Express.js", "Firebase", "Gemini API", "Razorpay"],
      imageUrl: "/src/assets/images/project_sivind_ai_1794241504710.jpg",
      liveUrl: "https://toolsverseai.com/",
      githubUrl: "https://github.com/debdulal00",
      isFlagship: true,
    },
    {
      id: "ai-travel-planner",
      name: "AI Travel Planner",
      category: "Multi-Agent AI Application",
      filterCategory: "AI Applications",
      role: "AI Application Developer",
      tagline: "Multi-agent autonomous AI architecture for personalized trip orchestration.",
      description:
        "An intelligent travel planning application powered by multi-agent AI architecture that helps users generate personalized travel plans based on destinations, budgets, and preferences.",
      features: [
        "Multi-agent architecture orchestrating specialized trip agents (Flight, Hotel, Itinerary)",
        "AI-powered day-by-day personalized itinerary generation",
        "Real-time flight schedule queries via live API integrations",
        "Destination research and curated local attraction recommendations",
        "Budget-aware itinerary synthesis with user preference constraints",
        "Persistent planning memory powered by PostgreSQL relational storage",
      ],
      technologies: [
        "Python",
        "LangGraph",
        "LangChain",
        "Streamlit",
        "PostgreSQL",
        "Gemini API",
        "Tavily",
        "AviationStack",
      ],
      imageUrl: "/src/assets/images/project_ai_travel_planner_1794241504775.jpg",
      githubUrl: "https://github.com/debdulal00",
      isFlagship: true,
    },
    {
      id: "skinvision-ai",
      name: "SkinVision AI",
      category: "AI-Powered Application",
      filterCategory: "AI Applications",
      role: "Independent AI Product Developer",
      tagline: "AI-powered vision concept for visible skin concern understanding.",
      description:
        "An AI-powered application concept designed to help users understand visible skin concerns through image analysis and personalized skincare tracking.",
      statusNotice:
        "Presented as an AI application in active research and development. Not intended as a medical diagnostic device or clinically validated tool.",
      features: [
        "Visual image upload and feature extraction pipeline",
        "Personalized user health profile and skin concern tracking",
        "Longitudinal scan analysis history to observe progress over time",
        "Personalized skincare guidance and routine planning recommendations",
        "Multilingual interface for accessible educational health insights",
        "Tailored product discovery matched to user-identified attributes",
      ],
      technologies: ["Google AI Studio", "Gemini API", "Firebase", "TypeScript"],
      imageUrl: "/src/assets/images/project_skinvision_ai_1794241505354.jpg",
      githubUrl: "https://github.com/debdulal00",
      isFlagship: false,
    },
    {
      id: "indonest",
      name: "IndoNest",
      category: "E-commerce / Digital Entrepreneurship",
      filterCategory: "E-commerce",
      role: "Founder / Website Developer",
      tagline: "Independent e-commerce venture and digital product lifestyle brand.",
      description:
        "IndoNest is an independent e-commerce venture built to establish an online shopping experience and develop a digital product brand.",
      features: [
        "Full e-commerce website development and modern catalog presentation",
        "Custom online storefront engineered for seamless customer navigation",
        "Modern visual merchandising and product detail storytelling",
        "End-to-end digital brand building, typography, and identity",
        "Direct-to-consumer online business operations and order management",
        "Frictionless customer-focused checkout and mobile shopping experience",
      ],
      technologies: ["E-Commerce Platform", "JavaScript", "Responsive UI", "Payment Integration", "Analytics"],
      imageUrl: "/src/assets/images/project_indonest_1794241504609.jpg",
      liveUrl: "https://indonest.online/",
      isFlagship: true,
    },
  ] as Project[],

  educationTimeline: [
    {
      id: "btech",
      degree: "B.Tech in Computer Science and Engineering (AI & ML)",
      institution: "Brainware University",
      duration: "Expected Graduation: August 2027",
      score: "CGPA: 8.6 / 10",
      current: true,
      description:
        "Specialized coursework in Artificial Intelligence, Machine Learning algorithms, Deep Learning, Natural Language Processing, Computer Vision, Relational Databases, and Advanced Data Structures.",
    },
    {
      id: "higher-secondary",
      degree: "Higher Secondary (10+2)",
      institution: "Baita MN High School",
      boardOrAffiliation: "West Bengal Council of Higher Secondary Education",
      duration: "Science Stream",
      score: "Science Stream",
      current: false,
      description:
        "Focused academic foundation in Physics, Chemistry, Mathematics, and Computer Science fundamentals.",
    },
    {
      id: "secondary",
      degree: "Secondary Education (10th)",
      institution: "Keutgeria Vidya Sagar High School",
      boardOrAffiliation: "West Bengal Board of Secondary Education",
      duration: "General Academics",
      score: "General Academics",
      current: false,
      description:
        "Developed analytical problem-solving skills and fundamental interest in computational science and technology.",
    },
  ] as EducationItem[],

  experience: [
    {
      id: "independent-builder",
      role: "Independent AI & Software Product Development",
      organization: "Self-Directed / Digital Ventures",
      type: "Independent Development & Product Building",
      duration: "2023 - Present",
      location: "India (Remote)",
      description:
        "Actively conceptualizing, building, and launching independent software products and AI applications alongside university academics. Focusing on applying state-of-the-art Generative AI models and multi-agent coordination frameworks to tangible consumer and business utilities.",
      focusAreas: [
        "Building AI-powered applications and LLM workflow integrations",
        "Developing web-based products, SaaS architectures, and e-commerce platforms",
        "Experimenting with multi-agent orchestration via LangGraph and LangChain",
        "Creating full-stack digital platforms with cloud databases and payment systems",
        "Practicing modern software engineering, version control, and rapid deployment",
      ],
      technologies: [
        "Python",
        "TypeScript",
        "React",
        "Node.js",
        "LangGraph",
        "LangChain",
        "Gemini API",
        "PostgreSQL",
        "Firebase",
      ],
    },
  ] as ExperienceItem[],

  productBuilderEcosystem: {
    headline: "Not Just Learning AI. Building With It.",
    subheadline:
      "A living ecosystem where theoretical machine learning merges with full-stack software development to build real-world digital products.",
    nodes: [
      {
        stage: "01. Ideation & Research",
        label: "Problem Identification",
        desc: "Spotting inefficiencies in customer workflows, travel research, and tool accessibility.",
        color: "from-blue-500 to-cyan-500",
      },
      {
        stage: "02. AI Architecture",
        label: "Intelligent Systems",
        desc: "Leveraging LLMs, LangGraph multi-agent coordination, and RAG retrieval pipelines.",
        color: "from-cyan-500 to-indigo-500",
      },
      {
        stage: "03. Software Engineering",
        label: "Full-Stack Craftsmanship",
        desc: "Building low-latency React interfaces, Express APIs, PostgreSQL, and secure auth.",
        color: "from-indigo-500 to-purple-500",
      },
      {
        stage: "04. Real-World Products",
        label: "Deployed Platforms",
        desc: "Shipping ToolsVerse AI, SivInd AI, IndoNest, and AI Travel Planner with active users.",
        color: "from-purple-500 to-pink-500",
      },
    ],
  },
};
