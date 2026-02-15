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
              className="glass-card p-6 rounded-2xl group hover:-translate-y-2 flex flex-col h-full animate-fade-in-up border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-primary transition-colors"
                      aria-label="GitHub Repo"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-primary transition-colors"
                      aria-label="Live Demo"
                    >
                      {project.link.includes('youtube') || project.link.includes('youtu.be') ? <Youtube className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">

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