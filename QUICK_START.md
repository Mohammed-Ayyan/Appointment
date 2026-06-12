# BookPro Quick Start Guide

Fast-track to getting BookPro running locally.

## 5-Minute Setup

### 1. Install & Start
```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

### 2. Seed Database
```bash
npx tsx scripts/seed.ts
```

### 3. Login
Use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@example.com` | `password123` |
| Patient | `john@example.com` | `password123` |
| Provider | `emily.johnson@example.com` | `password123` |

---

## What to Test

### As a Patient
1. Sign in as `john@example.com`
2. Go to `/providers`
3. Click on "Dr. Emily Johnson"
4. Click "Book Now"
5. Select a time slot
6. Complete booking

### As an Admin
1. Sign in as `admin@example.com`
2. Go to `/admin/service-providers`
3. Fill the "Add Service Provider" form
4. Create a new provider with:
   - Name: "Test Plumber"
   - Email: `newprovider@test.com`
   - Category: "Plumbing"
5. See success message with temp password

### As a Provider
1. Sign in as `emily.johnson@example.com`
2. Go to `/provider/dashboard`
3. See your upcoming appointments
4. Click on an appointment
5. Mark it as "Completed"

---

## Key Files

### Authentication
- `components/auth-form.tsx` - Login/signup form (NO provider signup)
- `lib/auth-client.ts` - Auth configuration
- `app/api/auth/[...all]/route.ts` - Better Auth handler

### Admin Features
- `components/admin/provider-form.tsx` - Create providers
- `app/api/admin/providers/route.ts` - Provider CRUD
- `app/(admin)/service-providers/page.jsx` - Admin page

### Database
- `lib/db/index.ts` - Database connection
- `lib/db/schema.ts` - Schema definition (if using Drizzle)
- `scripts/seed.ts` - Test data

---

## Environment Variables

Create `.env.development.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/bookpro
NEON_AUTH_COOKIE_SECRET=your-secret-here
```

Generate secret:
```bash
openssl rand -base64 32
```

---

## Critical Architecture Notes

### Users Can Only Sign Up As Regular Users
- No "Service Provider" option on signup form
- Providers are created by admins only
- Check: `/sign-up` has no provider dropdown

### Generic Platform
- Works for ANY service type (doctors, plumbers, tutors, etc.)
- Set provider "specialty" to any category
- Database has no doctor-specific fields

### Admin-Only Provider Creation
- Admin form at: `/admin/service-providers`
- API: `POST /api/admin/providers`
- Generates temporary password for new providers
- Only authenticated admins can create providers

---

## Common Tasks

### Add a New Service Provider
1. Login as admin
2. Go to `/admin/service-providers`
3. Fill form:
   - Name: Business name
   - Email: Provider email
   - Category: Service type (e.g., "Electrical")
   - Phone: Contact number (optional)
   - Location: City/region (optional)
4. Click "Create Service Provider"
5. Note the temporary password
4. Share credentials with provider

### View All Appointments
- **As Admin**: `/admin` (full system view)
- **As Patient**: `/appointments` (your appointments)
- **As Provider**: `/provider/appointments` (your clients)

### Search Providers
- Go to: `/providers`
- Use filter dropdown for category
- Use search box for name/service
- Sort by rating or price

---

## Troubleshooting

### "Port 3000 in use"
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### "DATABASE_URL not found"
- Create `.env.development.local`
- Add your DATABASE_URL
- Restart dev server

### "Auth not working"
- Check NEON_AUTH_COOKIE_SECRET is set
- Clear cookies: DevTools → Storage → Cookies
- Restart dev server

### "Provider form not visible"
- Login as admin
- Go to `/admin/service-providers`
- If form doesn't show, check console for errors

---

## Deployment

### Quick Deploy to Vercel
```bash
npx vercel deploy
```

Set these env vars in Vercel dashboard:
- `DATABASE_URL`
- `NEON_AUTH_COOKIE_SECRET`

---

## Documentation

- **Setup**: See `SETUP_GUIDE.md`
- **Routes**: See `ROUTES.md`
- **User Journeys**: See `USER_JOURNEYS.md`
- **Full Report**: See `IMPLEMENTATION_REPORT.md`

---

## API Quick Reference

### Create Appointment
```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": 1,
    "date": "2024-02-20T14:00:00",
    "service": "Consultation"
  }'
```

### Create Provider (Admin Only)
```bash
curl -X POST http://localhost:3000/api/admin/providers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
  -d '{
    "name": "New Service Provider",
    "email": "provider@example.com",
    "specialty": "Plumbing"
  }'
```

### List Providers
```bash
curl http://localhost:3000/api/providers
```

---

## Next Steps

1. ✅ Run `npm install && npm run dev`
2. ✅ Run `npx tsx scripts/seed.ts`
3. ✅ Test as patient: book an appointment
4. ✅ Test as provider: view appointments
5. ✅ Test as admin: create a new provider
6. ✅ Read full documentation when ready

---

## Support

- **Issues**: Check SETUP_GUIDE.md troubleshooting section
- **Routes**: See ROUTES.md for complete API reference
- **Features**: See USER_JOURNEYS.md for workflows
- **Architecture**: See IMPLEMENTATION_REPORT.md for details

---

**Version**: 1.0  
**Last Updated**: February 2025
