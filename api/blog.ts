import { DevToArticle } from '../types';

export const fetchLatestPosts = async (username: string): Promise<DevToArticle[]> => {
    try {
        const response = await fetch(`https://dev.to/api/articles?username=${username}&per_page=3`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Dev.to posts:', error);
        return [];
    }
};
