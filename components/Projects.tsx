import React from 'react';
import { Github, ExternalLink, Folder, Youtube } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="py-32 relative bg-slate-50 dark:bg-darker transition-colors duration-500">

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 animate-fade-in-up">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up animate-delay-100">Featured Projects</h2>
          <p className="max-w-xl text-slate-600 dark:text-slate-400 animate-fade-in-up animate-delay-200">
            A selection of my recent work in DevOps, Cloud Engineering, and Full Stack Development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 flex flex-col h-full animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Links */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20 backdrop-blur-sm">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all hover:scale-110"
                      aria-label="GitHub Repo"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all hover:scale-110"
                      aria-label="Live Demo"
                    >
                      {project.link.includes('youtube') || project.link.includes('youtu.be') ? <Youtube className="w-6 h-6" /> : <ExternalLink className="w-6 h-6" />}
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <Folder className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;