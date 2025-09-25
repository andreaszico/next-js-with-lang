"use client";

import UserProfile from "@/components/custom/UserProfile";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "I'm a passionate writer and developer who loves sharing knowledge with others.",
    avatar: "",
  });
  const handleSave = async (userData: { name: string; bio: string }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user data
      setUser((prev) => ({ ...prev, ...userData }));

      toast("Profile updated successfully!", {
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
          label: "Undo",
          onClick: () => {
            // Revert the changes
            setUser((prev) => ({
              ...prev,
              name: prev.name, // Keep original name
              bio: prev.bio, // Keep original bio
            }));
            console.log("Profile changes reverted");
          },
        },
      });
    } catch (error) {
      toast("Failed to update profile", {
        description: "Please try again later.",
        action: {
          label: "Retry",
          onClick: () => handleSave(userData),
        },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <UserProfile user={user} onSave={handleSave} />
    </div>
  );
}
