import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Writings from '../components/Writings';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <About />
            <Experience />
            <Writings />

            {/* Featured Projects Teaser */}
            <section className="py-20 bg-slate-50 dark:bg-darker transition-colors duration-500">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6">Recent Projects</h2>
                    <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 mb-10">
                        Check out my latest work including my portfolio, property price predictor, and more.
                    </p>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1"
                    >
                        View All Projects <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <Contact />
        </>
    );
};

export default Home;
