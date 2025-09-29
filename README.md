# Movie Reservation Service Frontend

A modern frontend for a movie reservation service built with Next.js 15, Tailwind CSS, and shadcn/ui. This application supports user authentication, movie browsing, seat reservation, and admin management, leveraging Next.js 15's App Router, Server Actions, and Turbopack for optimal performance. The frontend interacts with a NestJS backend API and is designed to be readable by the Qwen AI CLI.

## Features

### User Authentication
- **Sign-Up, Login, Logout**: Secure authentication using NextAuth.js with JWT.
- **Role-Based Access**:
  - **Regular Users**: Browse movies, view showtimes, reserve seats, and manage reservations.
  - **Admins**: Manage movies, showtimes, and view reservation reports.
- **Password Reset**: Email-based password recovery.
- **Email Verification**: Optional verification for new accounts.

### Movie Management (Admin Only)
- **Movie List**: Paginated list with search and genre filters.
- **Movie Details**: View title, description, poster image, and showtimes.
- **Add/Edit Movies**: Form with rich text editor (Tiptap) for descriptions and image uploads for posters.
- **Delete Movies**: Soft delete option for movies.

### Reservation Management
- **Browse Movies & Showtimes**: Filter movies by date and genre, view showtimes.
- **Seat Reservation**: Interactive seat map to select and reserve seats, with real-time availability updates.
- **User Reservations**: View and cancel upcoming reservations.
- **Admin Reports**: Analytics dashboard for reservation counts, theater capacity, and revenue.

### User Profiles
- **Dashboard**: View user reservations, favorite movies, and profile stats.
- **Edit Profile**: Update avatar, name, and preferences.
- **Follow Movies**: Save favorite movies for quick access.

### Extras
- **Search & Filters**: Full-text search for movies and tag-based filtering by genre.
- **SEO**: Dynamic metadata and sitemaps for better search engine visibility.
- **RSS Feed**: Subscribe to new movie releases.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Mobile-friendly interface.

## Use Cases
- **Users**: Browse movies, select showtimes, and reserve seats with an intuitive UI.
- **Admins**: Manage movie listings, showtimes, and monitor reservation analytics.
- **Theater Chains**: Offer a scalable platform for multiple locations.
- **Movie Enthusiasts**: Discover movies by genre and save favorites.

## Tech Stack
- **Framework**: Next.js 15 (App Router, Server Actions)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI-based)
- **Authentication**: NextAuth.js
- **Database**: Prisma with PostgreSQL (via backend API)
- **Editor**: Tiptap (for rich text in movie descriptions)
- **Search**: TanStack Query for client-side filtering
- **Language**: TypeScript

## shadcn/ui Components
Located in `components/ui/`:
- `button.tsx`: Action buttons (reserve, cancel, submit).
- `input.tsx`: Form inputs for search, login, and filters.
- `card.tsx`: Movie previews and reservation summaries.
- `dialog.tsx`: Modals for seat selection and confirmations.
- `dropdown-menu.tsx`: Movie actions (edit, delete) and nav menus.
- `form.tsx`: Form validation for user inputs.
- `textarea.tsx`: Admin inputs for movie descriptions.
- `avatar.tsx`: User profile images.
- `badge.tsx`: Genre tags for movies.
- `skeleton.tsx`: Loading states for movie lists and seat maps.
- `table.tsx`: Admin tables for reservations and reports.
- `tabs.tsx`: Dashboard sections (reservations, favorites).
- `tooltip.tsx`: Hover tooltips for seat details.
- `alert.tsx`: Notifications for reservation success/errors.
- `progress.tsx`: Image upload progress for movie posters.

## Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd movie-reservation-frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Required dependencies:
   - `@next/core`, `next`, `react`, `react-dom`
   - `tailwindcss`, `postcss`, `autoprefixer`
   - `@radix-ui/*`, `shadcn-ui`
   - `next-auth`
   - `prisma`, `@prisma/client`
   - `tiptap`, `@tiptap/react`, `@tiptap/extension-*`
   - `@tanstack/react-query`
   - `typescript`, `@types/node`, `@types/react`
3. **Environment Variables**:
   - Copy `.env.example` to `.env.local`.
   - Add variables:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3000/api
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your_nextauth_secret
     DATABASE_URL=postgresql://user:password@localhost:5432/movies_db
     ```
4. **Database Setup**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

## Development
- **Scripts**:
  - `npm run dev`: Start development server with Turbopack.
  - `npm run build`: Build for production.
  - `npm run lint`: Run ESLint for code checks.
- **Add shadcn/ui Components**:
  ```bash
  npx shadcn-ui@latest add <component>
  ```
- **TypeScript**: Full type safety with TypeScript.
- **Tests**: Add Vitest in `/tests/` for unit and integration testing.
- **Backend Integration**: Ensure the NestJS backend is running (see backend `README.md` for setup).

## Deployment
Deploy with Vercel:
1. Push to GitHub.
2. Connect repository to Vercel.
3. Set environment variables in Vercel dashboard.
4. Deploy the application.

## Notes
- **Backend Dependency**: This frontend relies on the NestJS backend API (see `NEXT_PUBLIC_API_URL`).
- **Qwen AI CLI Compatibility**: The project structure and dependencies are designed to be readable by Qwen AI CLI for AI-assisted development.
- **Performance**: Leverages Next.js 15's Turbopack and Server Actions for fast rendering and API calls.
- **Extensibility**: Add features like payment integration (e.g., Stripe) or email notifications (e.g., Resend) as needed.

## License
MIT