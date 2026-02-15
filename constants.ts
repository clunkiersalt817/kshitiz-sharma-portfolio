import { PortfolioData } from './types';

// ==========================================
// REPLACE THIS DATA WITH YOUR OWN INFORMATION
// ==========================================

export const PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: "Kshitiz Sharma",
    title: "DevOps Engineer",
    tagline: "Building scalable infrastructure and efficient pipelines.",
    bio: "I am an IT professional based in Bengaluru, currently working as a DevOps Engineer at TCS. I am deeply involved in cloud-native technologies, automation, and the intersection of development and operations. I specialize in Cloud, Automation, and Docker. Beyond code, I am passionate about music and exploring the nuances of ghazals and ragas.",
    location: "Bengaluru, India",
    email: "kshitizsharmajbp@gmail.com",
    // REPLACE the URL below with your actual Google Account photo URL
    profileImage: "https://ui-avatars.com/api/?name=Kshitiz+Sharma&background=3b82f6&color=fff&size=512&font-size=0.33"
  },
  socials: [
    { platform: 'github', url: 'https://github.com/clunkiersalt817/' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/kshitizsharmajbp/' },
    { platform: 'twitter', url: 'https://x.com/clunkiersalt817' },
    { platform: 'email', url: 'mailto:kshitizsharmajbp@gmail.com' }
  ],
  skills: [
    {
      category: "DevOps & Cloud",
      skills: ["Docker", "Kubernetes", "Jenkins", "AWS (Cloud)", "CI/CD", "Terraform"]
    },
    {
      category: "Systems & Scripting",
      skills: ["Linux (RHEL)", "Bash Scripting", "Python", "Java", "WebLogic"]
    },
    {
      category: "Frontend & Tools",
      skills: ["Angular", "Git", "MySQL"]
    }
  ],
  experience: [
    {
      id: "1",
      company: "TCS",
      role: "DevOps Engineer",
      period: "June 2025 - Present",
      description: [
        "Actively managing infrastructure and deployments.",
        "Working with Java in a containerized Docker environment.",
        "Managing CI/CD pipelines using Jenkins and deploying on RHEL and WebLogic servers.",
        "Optimizing SDLC processes and participating in design document reviews."
      ]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Portfolio Website",
      description: "My personal portfolio website built with React, Vite, and Tailwind CSS. Features a modern glassmorphism design, dark mode support, and smooth animations.",
      technologies: ["React", "Vite", "TailwindCSS", "TypeScript"],
      imageUrl: "https://picsum.photos/600/400?random=1",
      link: "https://github.com/clunkiersalt817/kshitiz-sharma-portfolio",
      github: "https://github.com/clunkiersalt817/kshitiz-sharma-portfolio"
    },
    {
      id: "p2",
      title: "Bangalore Property Predictor",
      description: "AI-powered real estate platform that predicts property prices in Bangalore using machine learning. Features interactive market trend analysis and future price projections.",
      technologies: ["Python", "Flask", "Scikit-learn", "Angular", "Machine Learning"],
      imageUrl: "https://picsum.photos/600/400?random=2",
      link: "https://github.com/clunkiersalt817/BangalorePropertyPredictor",
      github: "https://github.com/clunkiersalt817/BangalorePropertyPredictor"
    },
    {
      id: "p3",
      title: "AMD GPU Passthrough",
      description: "Configuration and scripts for passing through AMD GPUs to KVM/QEMU virtual machines, enabling near-native performance for gaming or compute workloads on Linux hosts.",
      technologies: ["Linux", "KVM", "QEMU", "Bash", "VFIO"],
      imageUrl: "https://picsum.photos/600/400?random=3",
      link: "https://github.com/clunkiersalt817/amdGPU-Passthrough",
      github: "https://github.com/clunkiersalt817/amdGPU-Passthrough"
    },
    {
      id: "p4",
      title: "HTS Writeups",
      description: "Comprehensive writeups and solutions for HackTheBox and other CTF challenges, documenting security vulnerabilities and exploitation techniques.",
      technologies: ["Security", "CTF", "Documentation", "Ethical Hacking"],
      imageUrl: "https://picsum.photos/600/400?random=4",
      link: "https://github.com/clunkiersalt817/HTSwriteups",
      github: "https://github.com/clunkiersalt817/HTSwriteups"
    },
    {
      id: "p5",
      title: "Quantum Programming",
      description: "Exploration of quantum computing concepts and algorithms using Q# and Python. Includes implementations of basic quantum gates and algorithms.",
      technologies: ["Q#", "Python", "Quantum Computing", "Algorithms"],
      imageUrl: "https://picsum.photos/600/400?random=5",
      link: "https://github.com/clunkiersalt817/QuantumProgramming",
      github: "https://github.com/clunkiersalt817/QuantumProgramming"
    }
  ]
};
