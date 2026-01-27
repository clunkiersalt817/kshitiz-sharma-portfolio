import React from 'react';
import { Briefcase } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Experience: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-dark">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Experience</h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l border-slate-300 dark:border-slate-700 ml-4 md:ml-6 space-y-12">
            {experience.map((job) => (
              <div key={job.id} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-3 top-0 w-6 h-6 bg-slate-50 dark:bg-dark border-2 border-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">{job.role}</h3>
                    <div className="flex items-center text-primary mt-1 font-medium">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {job.company}
                    </div>
                  </div>
                  <span className="text-slate-500 font-mono text-sm mt-2 sm:mt-0 bg-white dark:bg-card px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                    {job.period}
                  </span>
                </div>

                <ul className="list-disc list-outside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                  {job.description.map((desc, index) => (
                    <li key={index} className="leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;