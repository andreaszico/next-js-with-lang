import { blogPosts } from '@/lib/blogData';
import { NextResponse } from 'next/server';

export async function GET() {
  // Return all blog posts
  return NextResponse.json(blogPosts);
}