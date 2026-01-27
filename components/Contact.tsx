import React from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Contact: React.FC = () => {
  const { email } = PORTFOLIO_DATA.personalInfo;
  const { socials } = PORTFOLIO_DATA;

  const getIcon = (platform: string) => {
    switch(platform) {
      case 'github': return <Github className="w-6 h-6" />;
      case 'linkedin': return <Linkedin className="w-6 h-6" />;
      case 'twitter': return <Twitter className="w-6 h-6" />;
      default: return <Mail className="w-6 h-6" />;
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-dark">
      <div className="container mx-auto px-6 text-center">
        <p className="text-primary font-mono mb-4">What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Get In Touch</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          I am always open to discussing new technologies, DevOps methodologies, or potential collaborations. 
          Whether you have a question about my work or just want to connect, feel free to reach out!
        </p>

        <a 
          href={`mailto:${email}`}
          className="inline-block px-8 py-4 border border-primary text-primary rounded-md font-semibold hover:bg-primary/10 transition-colors duration-300 mb-20"
        >
          Say Hello
        </a>

        <div className="flex justify-center gap-8 mb-8">
          {socials.map((social) => (
            social.platform !== 'email' && (
              <a 
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-primary hover:-translate-y-1 transition-all duration-300"
              >
                {getIcon(social.platform)}
              </a>
            )
          ))}
        </div>

        <footer className="text-slate-500 text-sm font-mono">
          <p>&copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personalInfo.name}. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;