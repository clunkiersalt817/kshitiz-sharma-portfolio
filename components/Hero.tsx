import React from 'react';
import { ArrowRight, ChevronDown, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Hero: React.FC = () => {
  const { name, title, tagline, profileImage } = PORTFOLIO_DATA.personalInfo;

  const handleDownloadCV = () => {
    // Dispatch a custom event that AIChat listens to
    window.dispatchEvent(new CustomEvent('trigger-ai-resume'));
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-20 md:pt-0">
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
          
          {/* Text Content */}
          <div className="max-w-3xl flex-1 animate-fade-in-up order-2 md:order-1 text-center md:text-left">
            <p className="text-primary font-medium mb-4 tracking-wide">Hi, my name is</p>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {name}.
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-secondary mb-8 leading-tight">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0">
              {tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#projects"
                className="px-8 py-4 bg-primary text-white rounded-md font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Check out my work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                onClick={handleDownloadCV}
                className="px-8 py-4 border border-primary text-primary rounded-md font-semibold hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                Download CV
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 md:order-2 flex-shrink-0 relative animate-fade-in-up delay-200">
            <div className="relative w-56 h-56 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl -z-10 transform scale-110"></div>
              <div className="w-full h-full rounded-full border-4 border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group">
                <img 
                  src={profileImage} 
                  alt={name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-500">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

export default Hero;