import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const About: React.FC = () => {
  const { bio, location } = PORTFOLIO_DATA.personalInfo;
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-24 bg-white dark:bg-darker">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Who I am</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
              {bio}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
              Currently based in <span className="text-primary">{location}</span>. 
              I am always looking for new challenges and opportunities to grow as a developer.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((category) => (
                <div key={category.category}>
                  <h4 className="text-slate-700 dark:text-slate-200 font-medium mb-3">{category.category}</h4>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 bg-slate-50 dark:bg-card rounded-md text-slate-600 dark:text-slate-400 text-sm border border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;