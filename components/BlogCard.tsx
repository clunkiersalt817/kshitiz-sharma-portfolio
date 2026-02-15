import React from 'react';
import { ExternalLink, Clock, Calendar } from 'lucide-react';
import { DevToArticle } from '../types';

interface BlogCardProps {
    article: DevToArticle;
}

const BlogCard: React.FC<BlogCardProps> = ({ article }) => {
    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
        >
            <div className="relative h-full overflow-hidden rounded-2xl glass border border-white/20 dark:border-white/10 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col bg-white/5 backdrop-blur-sm">

                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                    {article.cover_image ? (
                        <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold opacity-30">Dev.to</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                        <ExternalLink className="text-white w-6 h-6" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{article.readable_publish_date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.reading_time_minutes} min read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 flex-1">
                        {article.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {article.tag_list.map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                </div>
            </div>
        </a>
    );
};

export default BlogCard;
