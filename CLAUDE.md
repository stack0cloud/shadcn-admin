# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shadcn Admin is a modern admin dashboard built with React, TypeScript, Vite, and ShadcnUI. It's a showcase/template project demonstrating best practices for building responsive, accessible admin interfaces with a comprehensive component library.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server
- `pnpm build` - Type check with `tsc -b` then build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm knip` - Analyze unused files/exports/dependencies

### Package Manager
This project uses `pnpm` as the package manager. Always use `pnpm` commands, not `npm` or `yarn`.

## Architecture

### Routing (TanStack Router)
- File-based routing in `src/routes/` directory
- Route tree is auto-generated in `src/routeTree.gen.ts` (do not edit manually)
- Route groups:
  - `_authenticated/` - Routes requiring authentication, wrapped with `AuthenticatedLayout`
  - `(auth)/` - Authentication pages (sign-in, sign-up, etc.)
  - `(errors)/` - Error pages (404, 500, 503, etc.)
  - `clerk/` - Clerk authentication integration routes
- Root route in `__root.tsx` sets up global providers and error boundaries

### Features-Based Architecture
Code is organized by feature in `src/features/`:
- `auth/` - Authentication components
- `users/` - User management with data tables
- `tasks/` - Task management
- `chats/` - Chat interface
- `dashboard/` - Dashboard analytics
- `apps/` - Apps management
- `settings/` - Settings pages
- `errors/` - Error page components

Each feature typically contains:
- `index.tsx` - Main feature component
- `components/` - Feature-specific components
- `data/` - Mock data or schemas (this is a demo project)

### State Management
- **React Query** (@tanstack/react-query) - Server state, configured in `main.tsx` with:
  - Automatic retry logic for non-401/403 errors
  - Query caching with 10s stale time
  - Global error handling for 401 (session expired) and 500 (server error)
- **Zustand** - Client state (see `src/stores/`)
  - `auth-store.ts` - Authentication state with cookie persistence
- **React Context** - UI state (see `src/context/`)
  - `theme-provider.tsx` - Light/dark mode
  - `direction-provider.tsx` - LTR/RTL support
  - `font-provider.tsx` - Font management
  - `layout-provider.tsx` - Layout configuration
  - `search-provider.tsx` - Global search state

### Component Structure

#### Shadcn UI Components (`src/components/ui/`)
Many components have been customized from the original Shadcn UI for RTL support and other enhancements. **Modified components** (scroll-area, sonner, separator) and **RTL updated components** (alert-dialog, calendar, command, dialog, dropdown-menu, select, table, sheet, sidebar, switch) should not be updated via `npx shadcn@latest add <component>` without careful review to preserve customizations.

#### Layout Components (`src/components/layout/`)
- `authenticated-layout.tsx` - Main layout wrapper with sidebar
- `app-sidebar.tsx` - Collapsible sidebar navigation
- `header.tsx` - Page header component
- `team-switcher.tsx` - Team/organization switcher
- `data/sidebar-data.ts` - Sidebar navigation configuration

#### Data Table Components (`src/components/data-table/`)
Reusable data table components built on TanStack Table:
- `toolbar.tsx` - Search, filters, and view options
- `column-header.tsx` - Sortable column headers
- `faceted-filter.tsx` - Multi-select filters
- `pagination.tsx` - Table pagination
- `bulk-actions.tsx` - Bulk operations on selected rows

### Styling
- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- Custom animations via `tw-animate-css`
- `cn()` utility in `lib/utils.ts` for className merging (tailwind-merge + clsx)
- Theme CSS variables defined in `src/styles/`

### Authentication
- Clerk integration for auth flows (sign-in, sign-up)
- Auth state managed via `auth-store.ts` with cookie persistence
- Protected routes use `_authenticated` route group
- Session expiration handling in React Query error interceptor

### Type Safety
- TypeScript strict mode
- Path alias `@/*` maps to `src/*`
- TanStack Router provides type-safe routing via generated route tree
- TanStack Table column definitions extend base types (see `tanstack-table.d.ts`)

### Error Handling
- Global error boundaries in root route
- `handle-server-error.ts` utility for consistent server error handling
- Axios error interceptors in React Query configuration
- Custom error pages for 404, 500, 503, etc.

## Important Patterns

### Adding New Features
1. Create feature directory in `src/features/<feature-name>/`
2. Add route file in `src/routes/_authenticated/<feature-name>/` (or appropriate route group)
3. Add navigation link in `src/components/layout/data/sidebar-data.ts`
4. For data tables, reference `src/features/users/` as a complete example

### Adding New Routes
1. Create route file following TanStack Router file conventions
2. Route tree regenerates automatically on file changes
3. Use `createFileRoute()` for type-safe route creation
4. Add route to sidebar data if it needs navigation

### Working with Forms
- React Hook Form + Zod for validation (`@hookform/resolvers`)
- Form components in `src/components/ui/form.tsx`
- See feature components for examples (e.g., settings forms)

### RTL Support
This project has comprehensive RTL support. When modifying UI components that have been marked as "RTL Updated" in the README, ensure RTL compatibility is maintained (test with DirectionProvider set to 'rtl').

## Development Notes

- The project includes Clerk auth but it's optional (demo uses mock auth)
- Mock data generated with `@faker-js/faker` in feature data files
- Development includes React Query and Router devtools (bottom corners)
- Navigation progress bar using `react-top-loading-bar`
- Toast notifications via `sonner`
