"use client";

import BlogEditor from "@/components/custom/BlogEditor";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/blogData";
import { toast } from "sonner";

export default function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, this would fetch from an API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        // For demo, we'll just use a mock post
        setPost({
          id: params.id,
          title: "Sample Blog Post",
          excerpt: "This is a sample excerpt for the blog post.",
          content:
            "This is the full content of the blog post. In a real application, this would be fetched from the database.",
          date: "2025-09-20",
          author: "John Doe",
          slug: "sample-blog-post",
        });
      } catch (error) {
        toast("Failed to load blog post", {
          description: "Please try again later.",
          action: {
            label: "Retry",
            onClick: () => fetchPost(),
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleSave = async (postData: any) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate the process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Blog post updated successfully!", {
        description: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        action: {
          label: "View Post",
          onClick: () => {
            // Navigate to the updated post
            router.push(`/blog/${postData.slug || params.id}`);
          },
        },
      });

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      toast("Failed to update blog post", {
        description: "Please try again later.",
        action: {
          label: "Retry",
          onClick: () => handleSave(postData),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      {post && (
        <BlogEditor post={post} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
}
