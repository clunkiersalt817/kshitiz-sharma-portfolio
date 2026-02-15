export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link?: string;
  github?: string;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  url: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    location: string;
    email: string;
    profileImage: string;
  };
  socials: SocialLink[];
  skills: SkillCategory[];
  experience: Job[];
  projects: Project[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  link: string;
  source: string;
}

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  url: string;
  readable_publish_date: string;
  reading_time_minutes: number;
  tag_list: string[];
}