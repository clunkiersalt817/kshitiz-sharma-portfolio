import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update history without jumping
      window.history.pushState(null, '', href);
    }
    
    setIsMenuOpen(false);
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('trigger-ai-resume'));
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-darker/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-bold text-primary font-mono border-2 border-primary rounded px-2 cursor-pointer"
        >
          KS
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium text-sm tracking-wide transition-colors cursor-pointer"
            >
              <span className="text-primary mr-1">.</span>{link.name}
            </a>
          ))}
          <button
            onClick={handleResumeClick}
            className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-colors text-sm font-medium"
          >
            Resume
          </button>
          <div className="pl-4 border-l border-slate-200 dark:border-slate-800">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            className="text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-card border-b border-slate-200 dark:border-slate-800 shadow-xl py-8 px-6 flex flex-col items-center gap-6 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-slate-600 dark:text-slate-300 hover:text-primary text-lg font-medium cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={handleResumeClick}
            className="px-6 py-3 border border-primary text-primary rounded hover:bg-primary/10 transition-colors"
          >
            Resume
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;