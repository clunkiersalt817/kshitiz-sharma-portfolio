import React from 'react';
import { ArrowRight, ChevronDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

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

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-pulse-slow"></div>

      <div className="container mx-auto px-6 z-10 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase animate-fade-in-up">
              Available for hire
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight animate-fade-in-up animate-delay-100">
              {name}
            </h1>

            <h2 className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-light mb-8 animate-fade-in-up animate-delay-200">
              {title}
            </h2>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0 animate-fade-in-up animate-delay-300">
              {tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center animate-fade-in-up animate-delay-300">
              <a
                href="#projects"
                className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primaryDark transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

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

          {/* Image Section */}
          <div className="flex-1 flex justify-center md:justify-end relative animate-fade-in-up animate-delay-200">
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
              {/* Abstract Shapes */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-400 rounded-[2rem] rotate-6 opacity-20 blur-xl animate-float"></div>
              <div className="absolute inset-0 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] -rotate-6 transition-transform hover:rotate-0 duration-500"></div>

              {/* Main Image Container */}
              <div className="absolute inset-2 overflow-hidden rounded-[1.5rem] shadow-2xl bg-white dark:bg-slate-800">
                <img
                  src={profileImage}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[1.5rem]"></div>
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