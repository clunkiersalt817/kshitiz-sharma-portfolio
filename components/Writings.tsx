import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { DevToArticle } from '../types';
import { fetchLatestPosts } from '../api/blog';
import BlogCard from './BlogCard';

const Writings: React.FC = () => {
    const [articles, setArticles] = useState<DevToArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            // Replace with your actual Dev.to username
            const data = await fetchLatestPosts('clunkier');
            setArticles(data);
            setLoading(false);
        };

        loadPosts();
    }, []);

    if (!loading && articles.length === 0) return null;

    return (
        <section id="writings" className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 md:px-6">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                        Latest <span className="text-primary">Writings</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Thoughts on software development, cloud infrastructure, and emerging technologies.
                    </p>
                </motion.div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <BlogCard article={article} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* View All Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://dev.to/clunkier"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
                    >
                        <BookOpen className="w-5 h-5" />
                        <span>Read more on Dev.to</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default Writings;
