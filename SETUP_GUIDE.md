# BookPro - Setup and Installation Guide

## Overview

BookPro is a generic service appointment scheduling platform that allows users to book appointments with various service providers (doctors, plumbers, electricians, tutors, etc.). It features user authentication, admin management, provider dashboards, and appointment tracking.

## Architecture

- **Frontend**: Next.js 16 with React, TypeScript, and Tailwind CSS
- **Backend**: Next.js API routes with Better Auth
- **Database**: PostgreSQL (Neon) with raw SQL queries and Drizzle ORM support
- **Authentication**: Better Auth with email/password authentication
- **Styling**: shadcn/ui components with Tailwind CSS

## Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (Neon or local PostgreSQL)
- Git

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/Mohammed-Ayyan/Appointment.git
cd Appointment

# Install dependencies using npm, yarn, or pnpm
npm install
# or
pnpm install
# or
yarn install
```

### Step 2: Set Up Environment Variables

Create a `.env.development.local` file in the project root with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bookpro

# Better Auth Secret (generate with: openssl rand -base64 32)
NEON_AUTH_COOKIE_SECRET=your-generated-secret-here

# Optional: Better Auth URL (auto-detected from VERCEL_URL if not set)
BETTER_AUTH_URL=http://localhost:3000
```

Generate a secure random secret:
```bash
openssl rand -base64 32
```

### Step 3: Set Up Database

The database schema is already created with the following tables:
- `user` - User accounts with role field
- `session` - Authentication sessions
- `account` - OAuth accounts (if configured)
- `verification` - Email verification tokens
- `service_provider` - Service provider profiles
- `appointment` - Appointment bookings
- `review` - Appointment reviews
- `time_slot` - Provider availability slots
- `provider_specialization` - Provider service categories

#### Database is Already Set Up

If you're using the existing Neon database, tables are already created. Skip to step 4.

#### Create Tables Manually (if needed)

Tables were created during initial setup. Check the `scripts/seed.ts` for schema details.

### Step 4: Seed Test Data

Populate the database with test data for development:

```bash
npx tsx scripts/seed.ts
```

This creates:
- 5 test users (patients and providers)
- 2 service providers with full profiles
- 3 sample appointments
- 2 reviews
- Time slot examples

### Step 5: Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Step 6: Build for Production

```bash
npm run build
npm start
```

## Test Credentials

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `password123`
- **Role**: Full system access, can create/manage providers and users

### Test Patient Account
- **Email**: `john@example.com`
- **Password**: `password123`
- **Role**: Can browse providers and book appointments

### Test Service Provider Account
- **Email**: `emily.johnson@example.com`
- **Password**: `password123`
- **Role**: Can manage appointments and availability

## User Roles and Permissions

### Patient/User
- ✅ Sign up and create account
- ✅ Browse service providers by category
- ✅ View provider profiles and reviews
- ✅ Book appointments
- ✅ Manage their appointments (cancel, reschedule)
- ✅ Leave reviews and ratings
- ✅ View appointment history

### Service Provider
- ✅ View assigned appointments
- ✅ Manage availability and time slots
- ✅ Update profile information
- ✅ View client details for appointments
- ✅ Mark appointments as completed
- ❌ Create their own account (admin-only)
- ❌ Access admin features

### Admin
- ✅ Create service providers
- ✅ Edit/disable service providers
- ✅ View all appointments
- ✅ Manage user accounts
- ✅ View system analytics
- ✅ Configure service categories
- ✅ Monitor provider ratings and reviews

## Key Features

### For Users
1. **Browse Providers**: Search and filter by service type, location, rating
2. **Book Appointments**: Select date, time, and service from available slots
3. **Manage Appointments**: View, cancel, or reschedule bookings
4. **Reviews**: Rate and review completed appointments

### For Service Providers
1. **Schedule Management**: Set availability and manage time slots
2. **Appointment Dashboard**: View and manage client appointments
3. **Profile Management**: Update service information and availability
4. **Ratings & Reviews**: Monitor performance and feedback

### For Admins
1. **Provider Management**: Create, edit, and manage service providers
2. **User Management**: Monitor and manage user accounts
3. **Analytics**: View system statistics and provider performance
4. **Category Management**: Configure service categories

## Project Structure

```
├── app/
│   ├── (admin)/              # Admin dashboard routes
│   │   ├── dashboard/
│   │   ├── service-providers/
│   │   └── users/
│   ├── (auth)/               # Authentication routes
│   │   ├── forgot-password/
│   │   └── signin/
│   ├── (main)/               # Main application routes
│   │   ├── providers/        # Provider browsing
│   │   ├── appointments/     # User appointments
│   │   └── profile/
│   ├── api/                  # API endpoints
│   │   ├── auth/            # Authentication endpoints
│   │   ├── admin/           # Admin endpoints
│   │   ├── providers/       # Provider endpoints
│   │   └── appointments/    # Appointment endpoints
│   └── layout.tsx
├── components/
│   ├── admin/               # Admin components
│   ├── ui/                  # shadcn/ui components
│   └── auth-form.tsx        # Authentication form
├── lib/
│   ├── auth.ts             # Better Auth config
│   ├── auth-client.ts      # Auth client
│   └── db/                 # Database setup
├── scripts/
│   └── seed.ts             # Database seeding script
└── public/                 # Static assets
```

## Common Development Tasks

### Adding a New Route

1. Create folder: `app/new-route/`
2. Create `page.tsx` file
3. Add authentication check if needed
4. Import layout from appropriate group

### Creating an API Endpoint

1. Create folder: `app/api/endpoint/`
2. Create `route.ts` file
3. Implement GET/POST/PUT/DELETE handlers
4. Add admin verification if admin-only

### Modifying Database Schema

1. Create SQL migration in `scripts/migrations/`
2. Run migration: `npx tsx scripts/migrations/your-migration.ts`
3. Update `lib/db/schema.ts` if using Drizzle

## Troubleshooting

### "Auth handler is undefined" Error
- Ensure `NEON_AUTH_COOKIE_SECRET` environment variable is set
- Restart the dev server after changing environment variables

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check PostgreSQL service is running
- Ensure network connectivity to database

### Authentication Not Working
- Clear browser cookies and localStorage
- Check Better Auth session configuration
- Verify callback URLs in authentication flow

### Build Failures
- Delete `.next` folder: `rm -rf .next`
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEON_AUTH_COOKIE_SECRET`
4. Deploy: `vercel deploy`

### Environment Variables for Production

```env
DATABASE_URL=postgresql://...
NEON_AUTH_COOKIE_SECRET=your-production-secret
BETTER_AUTH_URL=https://your-domain.com
NODE_ENV=production
```

## Performance Optimization

- Database queries use connection pooling
- API routes implement proper caching headers
- shadcn/ui components are optimized for performance
- Images are optimized with Next.js Image component

## Security Best Practices

1. **Authentication**: All sensitive routes check session
2. **Role-Based Access**: Admin routes verify user role
3. **Password Hashing**: Better Auth handles password security
4. **CSRF Protection**: Built-in Next.js CSRF protection
5. **SQL Injection**: All queries use parameterized statements
6. **Environment Secrets**: Never commit .env files

## Support & Contribution

For issues, questions, or contributions:
1. Check existing issues on GitHub
2. Create detailed bug reports with steps to reproduce
3. Follow code style guidelines
4. Submit pull requests with clear descriptions

## License

This project is licensed under the MIT License.

---

**Last Updated**: February 2025
**Version**: 1.0.0
