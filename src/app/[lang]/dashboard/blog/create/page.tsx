"use client";

import BlogEditor from "@/components/custom/BlogEditor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSave = async (postData: any) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate the process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Blog post created successfully!", {
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
            // Navigate to the newly created post if you have the ID
            // router.push(`/blog/${postId}`);
            console.log("Navigate to blog post");
          },
        },
      });

      // Redirect to the blog list page
      router.push("/dashboard");
    } catch (error) {
      toast("Failed to create blog post", {
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <BlogEditor onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
