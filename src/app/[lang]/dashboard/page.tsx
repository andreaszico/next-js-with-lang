import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/blog/create">Create New Post</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Your published posts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-gray-500">Published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
            <CardDescription>Unpublished posts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-gray-500">Drafts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Views</CardTitle>
            <CardDescription>Total post views</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,248</p>
            <p className="text-sm text-gray-500">Total views</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest blog activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New comment on "Getting Started with Next.js 15"</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">"Mastering Tailwind CSS in 2025" published</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Post draft saved: "State Management in Modern React"</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}