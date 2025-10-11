// src/shared/services/blog.service.ts
import { useQuery } from '@tanstack/react-query';
import { BlogPost } from '@/server/_data/blog';

// Repository interface
export interface IBlogService {
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost>;
}

// Implementation
export class BlogService implements IBlogService {
  async getAllBlogPosts(): Promise<BlogPost[]> {
    const res = await fetch('/api/blog');
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return res.json();
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const res = await fetch(`/api/blog/${slug}`);
    if (!res.ok) {
      throw new Error('Failed to fetch blog post');
    }
    return res.json();
  }
}

// React Query hooks (Presentation Layer)
export const useBlogPosts = () => {
  const blogService = new BlogService();
  
  return useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: () => blogService.getAllBlogPosts(),
  });
};

export const useBlogPost = (slug: string) => {
  const blogService = new BlogService();
  
  return useQuery<BlogPost>({
    queryKey: ['blogPost', slug],
    queryFn: () => blogService.getBlogPostBySlug(slug),
    enabled: !!slug,
  });
};