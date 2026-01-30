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
      title: "Bangalore Property Price Predictor",
      description: "AI-powered real estate platform that predicts property prices in Bangalore using machine learning. Features interactive market trend analysis, future price projections with inflation modeling, and responsive modern UI design.",
      technologies: ["Python", "Flask", "Scikit-learn", "Angular", "TypeScript", "Machine Learning"],
      imageUrl: "https://picsum.photos/600/400?random=10",
      link: "#",
      github: "https://github.com/clunkiersalt817/BangalorePropertyPredictor"
    },
    {
      id: "p2",
      title: "Automated Security Audit Tool",
      description: "A plug-and-play hardware solution using Raspberry Pi Pico for automated system security auditing. Scans protocols, ports, and permissions upon connection and generates comprehensive vulnerability reports via a Tableau dashboard.",
      technologies: ["Raspberry Pi", "Python", "Tableau", "Linux", "Automation"],
      imageUrl: "https://picsum.photos/600/400?random=15", 
      link: "https://www.youtube.com/watch?v=MiJ18c-_fAE",
      github: "#"
    },
    {
      id: "p3",
      title: "AMD GPU Passthrough",
      description: "Configuration and scripts for passing through AMD GPUs to KVM/QEMU virtual machines, enabling near-native performance for gaming or compute workloads on Linux hosts.",
      technologies: ["Linux", "KVM", "QEMU", "Bash", "VFIO"],
      imageUrl: "https://picsum.photos/600/400?random=4",
      link: "https://github.com/clunkiersalt817/amdGPU-Passthrough",
      github: "https://github.com/clunkiersalt817/amdGPU-Passthrough"
    }
  ]
};
