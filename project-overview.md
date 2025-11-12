# Project Overview - Movie Reservation Service Frontend

## Project Information
- **Project Name**: Movie Reservation Service Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI-based)

## Directory Structure
```
C:\Users\1489\Documents\Next\my-app\
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── .git/
├── .idea/
├── .next/
├── public/
├── src/
    ├── app/
    │   ├── [lang]/
    │   │   ├── auth/
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   └── api/
    ├── components/
    │   ├── custom/
    │   └── ui/
    ├── config/
    ├── core/
    ├── features/
    │   ├── auth/
    │   └── example/
    ├── hooks/
    ├── i18n/
    ├── lib/
    │   └── utils.ts
    ├── server/
    ├── shared/
    ├── instrumentation-client.ts
    ├── instrumentation.ts
    └── middleware.ts
```

## Root Files

### README.md
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

### package.json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start"
  },
  "dependencies": {
    "@formatjs/intl-localematcher": "^0.6.1",
    "@hookform/resolvers": "^5.2.2",
    "@logtape/logtape": "^1.1.0",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@t3-oss/env-nextjs": "^0.13.8",
    "@tanstack/react-query": "^5.89.0",
    "@tanstack/react-table": "^8.21.3",
    "@types/negotiator": "^0.6.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "immer": "^10.1.3",
    "lucide-react": "^0.544.0",
    "negotiator": "^1.0.0",
    "next": "15.5.3",
    "next-intl": "^4.3.7",
    "next-themes": "^0.4.6",
    "postcss": "^8.5.6",
    "react": "19.1.0",
    "react-day-picker": "^9.10.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.63.0",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.3.1",
    "vaul": "^1.1.2",
    "zod": "^4.1.8",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.13",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4.1.13",
    "tw-animate-css": "^1.3.8",
    "typescript": "^5"
  }
}

### next.config.ts
import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

### tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

### postcss.config.mjs
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;

### components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/[lang]/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}

### pnpm-workspace.yaml
onlyBuiltDependencies:
  - '@tailwindcss/oxide'
  - sharp

## Source Directory Structure

### src/app/ directory
Directory listing for C:\Users\1489\Documents\Next\my-app\src\app:
[DIR] [lang]
[DIR] api
favicon.ico
sitemap.ts

### src/app/[lang]/ directory
Directory listing for C:\Users\1489\Documents\Next\my-app\src\app\[lang]:
[DIR] auth
globals.css
layout.tsx
page.tsx

layout.tsx:
import './globals.css';
import { AppConfig } from "@/config/app-config";
import { NextIntlClientProvider } from "next-intl";
import { QueryProvider } from '@/core/provider/QueryProvider';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/custom/Header';

export async function generateStaticParams() {
  return AppConfig.locales.map((lang: string) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <NextIntlClientProvider
              locale={lang}
              messages={(await import(`../../shared/locale/${lang}.json`)).default}
            >
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <footer className="border-t py-6 md:py-0">
                  <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                      Built with Next.js 15 and shadcn/ui
                    </p>
                  </div>
                </footer>
              </div>
            </NextIntlClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

page.tsx:
import Link from "next/link";

export default async function HomePage() {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Check out our blog</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Read our latest articles on web development, React, and more.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Visit Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

### src/components/ directory
Directory listing for C:\Users\1489\Documents\Next\my-app\src\components:
[DIR] custom
[DIR] ui

### src/features/ directory
Directory listing for C:\Users\1489\Documents\Next\my-app\src\features:
[DIR] auth
[DIR] example

### src/lib/ directory
Directory listing for C:\Users\1489\Documents\Next\my-app\src\lib:
utils.ts

### public/ directory
Directory listing for C:\Users\1489\Documents\Next\my-app\public:
file.svg
globe.svg
next.svg
vercel.svg
window.svg

## Middleware
Middleware file (src/middleware.ts):
import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { AppConfig } from './config/app-config';

const { locales, defaultLocale } = AppConfig;

// Get the preferred locale from the request headers
function getLocale(request: Request): string {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  
  // Check if the pathname already includes a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to the URL with the detected locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico).*)', // Skip internal paths and assets
  ],
};

## Dependencies

### Production Dependencies
- @formatjs/intl-localematcher
- @hookform/resolvers
- @logtape/logtape
- @radix-ui/react-accordion
- @radix-ui/react-alert-dialog
- @radix-ui/react-aspect-ratio
- @radix-ui/react-avatar
- @radix-ui/react-checkbox
- @radix-ui/react-collapsible
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-navigation-menu
- @radix-ui/react-popover
- @radix-ui/react-progress
- @radix-ui/react-radio-group
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slot
- @radix-ui/react-switch
- @radix-ui/react-tabs
- @radix-ui/react-tooltip
- @t3-oss/env-nextjs
- @tanstack/react-query
- @tanstack/react-table
- @types/negotiator
- class-variance-authority
- clsx
- date-fns
- embla-carousel-react
- immer
- lucide-react
- negotiator
- next (15.5.3)
- next-intl
- next-themes
- postcss
- react (19.1.0)
- react-day-picker
- react-dom (19.1.0)
- react-hook-form
- sonner
- tailwind-merge
- vaul
- zod
- zustand

### Development Dependencies
- @tailwindcss/postcss
- @types/node
- @types/react
- @types/react-dom
- tailwindcss
- tw-animate-css
- typescript

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

## Tech Stack
- **Framework**: Next.js 15 (App Router, Server Actions)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI-based)
- **Authentication**: NextAuth.js
- **Database**: Prisma with PostgreSQL (via backend API)
- **Editor**: Tiptap (for rich text in movie descriptions)
- **Search**: TanStack Query for client-side filtering
- **Language**: TypeScript