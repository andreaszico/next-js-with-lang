import Link from "next/link";

export default async function HomePage() {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <Link
            href="/auth/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Login
        </Link>
      </div>
  );
}