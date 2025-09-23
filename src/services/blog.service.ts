import { BlogPost } from '@/server/_data/blog';
import { useQuery } from '@tanstack/react-query';

// Fetch all blog posts
export const useBlogPosts = () => {
  return useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      const res = await fetch('/api/blog');
      if (!res.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return res.json();
    },
  });
};

// Fetch a single blog post by slug
export const useBlogPost = (slug: string) => {
  return useQuery<BlogPost>({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) {
        throw new Error('Failed to fetch blog post');
      }
      return res.json();
    },
    enabled: !!slug,
  });
};