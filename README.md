Blog Application
A modern blog platform built with Next.js 15, Tailwind CSS, and shadcn/ui. This application supports content creation, user interaction, and administration, leveraging Next.js 15's App Router, Server Actions, and Turbopack for performance.
Features

Blog Management:

Blog list with pagination, search, and filters (implemented in UI and API).
Blog detail view with rich content, comments, and related posts (implemented in UI and API).
Create posts with a rich text editor (Tiptap) and image uploads.
Edit posts with version history.
Delete posts with soft delete option.

Authentication:

User signup, login, and logout via NextAuth.js.
Role-based access: Admins (full control), Authors (create/edit own posts), Readers (view/comment).
Password reset and email verification.

User Profiles:

Dashboard for users to view their posts, drafts, and stats.
Edit profile with avatar and bio.
Follow authors for curated feeds.

Comments:

Nested comments with real-time updates.
Like/share posts.
Admin moderation for comments.

Search & Tags:

Full-text search with Algolia or simple indexing.
Tag-based filtering and post categorization.
Recommended posts based on user activity.

Admin Tools:

Analytics dashboard for post views and engagement.
Manage users and moderate content.

Extras:

SEO with dynamic metadata and sitemaps.
RSS feed support.
Dark mode toggle.
Responsive design.

Use Cases

Bloggers: Write, publish, and track posts with an intuitive editor.
Readers: Discover posts via search/tags, engage with comments/likes.
Teams: Collaborate with role-based permissions for multi-author blogs.
Portfolios: Showcase articles with a clean, shareable interface.
Education: Host tutorials with rich media support.

Tech Stack

Framework: Next.js 15 (App Router, Server Actions)
Styling: Tailwind CSS
UI: shadcn/ui (Radix UI-based)
Auth: NextAuth.js
Database: Prisma with PostgreSQL
Editor: Tiptap
Search: Algolia or TanStack Query
Language: TypeScript

shadcn/ui Components
Located in components/ui/:

button.tsx: Action buttons (submit, cancel).
input.tsx: Form inputs for search, login.
card.tsx: Blog previews, profile cards.
dialog.tsx: Modals for confirmations.
dropdown-menu.tsx: Post actions, nav menus.
form.tsx: Form validation wrapper.
textarea.tsx: Comment and bio inputs.
avatar.tsx: User profile images.
badge.tsx: Post tags.
skeleton.tsx: Loading states.
table.tsx: Admin data tables.
tabs.tsx: Dashboard sections.
tooltip.tsx: Hover tooltips.
alert.tsx: Notifications.
progress.tsx: File upload progress.

Setup

Clone: git clone <repo-url>
Install: npm install
Env: Copy .env.example to .env.local, add DATABASE_URL, NEXTAUTH_SECRET.
Database: npx prisma generate && npx prisma db push
Run: npm run dev (visit http://localhost:3000)

Development

Scripts:
npm run dev: Dev server.
npm run build: Production build.
npm run lint: ESLint checks.

Add shadcn/ui: npx shadcn-ui@latest add <component>
TypeScript: Full type safety.
Tests: Add Vitest in /tests/.

Deployment
Use Vercel:

Push to GitHub.
Connect to Vercel.
Set env vars.
Deploy.

License
MIT
