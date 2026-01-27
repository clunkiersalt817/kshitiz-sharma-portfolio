import React from 'react';
import { Github, ExternalLink, Folder, Youtube } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="py-24 bg-white dark:bg-darker">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white dark:bg-card rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 shadow-lg hover:shadow-2xl dark:shadow-none dark:hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <Folder className="w-8 h-8 text-primary" />
                  <div className="flex gap-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
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
                        className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                        aria-label={project.link.includes('youtube.com') || project.link.includes('youtu.be') ? "Watch Demo" : "Live Demo"}
                      >
                        {project.link.includes('youtube.com') || project.link.includes('youtu.be') ? (
                          <Youtube className="w-5 h-5" />
                        ) : (
                          <ExternalLink className="w-5 h-5" />
                        )}
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs font-mono text-slate-500 dark:text-slate-500">
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