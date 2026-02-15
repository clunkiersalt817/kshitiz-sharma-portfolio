import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';
import ParticleBackground from './ParticleBackground';

const Hero: React.FC = () => {
  const { name, title, tagline, profileImage } = PORTFOLIO_DATA.personalInfo;
  const { socials } = PORTFOLIO_DATA;

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-slate-50 dark:bg-darker transition-colors duration-500">
      <ParticleBackground />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-pulse-slow"></div>

      <div className="container mx-auto px-6 z-10 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="w-full max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase animate-fade-in-up">
              Available for hire
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight animate-fade-in-up animate-delay-100">
              {name}
            </h1>

            <h2 className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-light mb-8 animate-fade-in-up animate-delay-200">
              {title}
            </h2>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed mx-auto animate-fade-in-up animate-delay-300">
              {tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up animate-delay-300">
              <Link
                to="/projects"
                className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primaryDark transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>


              <div className="flex items-center gap-4">
                {socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all duration-300 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    aria-label={social.platform}
                  >
                    {getIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-600">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;