# BookPro Routes Documentation

## Authentication Routes

| Route | Method | Purpose | Access Level | Auth Required |
|-------|--------|---------|--------------|---------------|
| `/` | GET | Home page | Public | No |
| `/sign-up` | GET | User registration page | Public | No |
| `/sign-in` | GET | User login page | Public | No |
| `/forgot-password` | GET | Password recovery page | Public | No |
| `/api/auth/sign-up` | POST | Register new user | Public | No |
| `/api/auth/sign-in` | POST | Authenticate user | Public | No |
| `/api/auth/sign-out` | POST | Logout user | Public | Yes |
| `/api/auth/forgot-password` | POST | Send password reset email | Public | No |
| `/api/auth/[...all]` | GET/POST | Better Auth handler | Public | Varies |

## Main Application Routes

| Route | Method | Purpose | Access Level | Auth Required |
|-------|--------|---------|--------------|---------------|
| `/providers` | GET | Browse all service providers | Public | No |
| `/providers/[id]` | GET | View provider details and reviews | Public | No |
| `/appointments` | GET | View user's appointments | Private | Yes (User) |
| `/appointments/new` | GET | Book new appointment page | Private | Yes (User) |
| `/appointments/[id]` | GET/PUT | View/manage appointment | Private | Yes (User) |
| `/api/providers` | GET | List all providers with filtering | Public | No |
| `/api/providers` | POST | Create service provider | Private | Yes (Admin) |
| `/api/appointments` | GET | List user appointments | Private | Yes (User) |
| `/api/appointments` | POST | Create new appointment | Private | Yes (User) |
| `/api/appointments/[id]` | PUT | Update appointment | Private | Yes (User/Provider) |
| `/api/appointments/[id]` | DELETE | Cancel appointment | Private | Yes (User/Provider) |

## Admin Dashboard Routes

| Route | Method | Purpose | Access Level | Auth Required |
|-------|--------|---------|--------------|---------------|
| `/admin` | GET | Admin dashboard home | Private | Yes (Admin) |
| `/admin/dashboard` | GET | Analytics & overview | Private | Yes (Admin) |
| `/admin/service-providers` | GET | Manage service providers | Private | Yes (Admin) |
| `/admin/users` | GET | Manage user accounts | Private | Yes (Admin) |
| `/admin/appointments` | GET | View all appointments | Private | Yes (Admin) |
| `/api/admin/providers` | GET | List all providers | Private | Yes (Admin) |
| `/api/admin/providers` | POST | Create service provider | Private | Yes (Admin) |
| `/api/admin/providers/[id]` | PUT | Update provider | Private | Yes (Admin) |
| `/api/admin/providers/[id]` | DELETE | Delete provider | Private | Yes (Admin) |
| `/api/admin/users` | GET | List all users | Private | Yes (Admin) |
| `/api/admin/users/[id]` | PUT | Update user | Private | Yes (Admin) |
| `/api/admin/users/[id]` | DELETE | Delete user | Private | Yes (Admin) |

## Service Provider Routes

| Route | Method | Purpose | Access Level | Auth Required |
|-------|--------|---------|--------------|---------------|
| `/provider/dashboard` | GET | Provider dashboard | Private | Yes (Provider) |
| `/provider/profile` | GET | Edit provider profile | Private | Yes (Provider) |
| `/provider/appointments` | GET | View provider's appointments | Private | Yes (Provider) |
| `/provider/schedule` | GET | Manage availability | Private | Yes (Provider) |
| `/provider/reviews` | GET | View provider reviews | Private | Yes (Provider) |
| `/api/provider/profile` | GET/PUT | Provider profile operations | Private | Yes (Provider) |
| `/api/provider/appointments` | GET | List provider's appointments | Private | Yes (Provider) |
| `/api/provider/time-slots` | GET/POST | Manage time slots | Private | Yes (Provider) |

## User Profile Routes

| Route | Method | Purpose | Access Level | Auth Required |
|-------|--------|---------|--------------|---------------|
| `/profile` | GET | View user profile | Private | Yes (User) |
| `/profile/edit` | GET | Edit profile page | Private | Yes (User) |
| `/profile/appointments` | GET | View appointment history | Private | Yes (User) |
| `/profile/reviews` | GET | View user's reviews | Private | Yes (User) |
| `/api/profile` | GET/PUT | User profile operations | Private | Yes (User) |
| `/api/profile/preferences` | GET/PUT | User preferences | Private | Yes (User) |

## API Endpoint Details

### Public Endpoints

#### GET `/api/providers`
**Purpose**: Get list of service providers
**Query Parameters**:
- `category` - Filter by service category
- `location` - Filter by location
- `search` - Search by name or specialty
- `sort` - Sort by: recommended, rating, price-low, price-high

**Response**:
```json
{
  "success": true,
  "data": [...],
  "count": 5
}
```

### Admin-Only Endpoints

#### POST `/api/admin/providers`
**Purpose**: Create a new service provider
**Headers**: Authentication required
**Body**:
```json
{
  "name": "John's Plumbing",
  "email": "john@plumbing.com",
  "specialty": "Plumbing",
  "phone": "+1-555-0000",
  "location": "New York, NY"
}
```

**Response**:
```json
{
  "success": true,
  "data": { ... },
  "message": "Service provider created. Temporary password: ..."
}
```

#### GET `/api/admin/providers`
**Purpose**: List all service providers
**Headers**: Authentication required

**Response**:
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

### User-Only Endpoints

#### POST `/api/appointments`
**Purpose**: Create new appointment
**Headers**: Authentication required
**Body**:
```json
{
  "providerId": 1,
  "date": "2024-02-20T14:00:00",
  "time": "2:00 PM",
  "service": "Consultation",
  "notes": "Please call before arriving"
}
```

#### GET `/api/appointments`
**Purpose**: Get user's appointments
**Headers**: Authentication required

**Response**:
```json
{
  "success": true,
  "data": [...],
  "count": 3
}
```

## Access Control Matrix

| Role | Can Access |
|------|-----------|
| **Guest/Anonymous** | Home, Sign Up, Sign In, Browse Providers, Provider Details |
| **User/Patient** | All guest routes + Appointments, Profile, Book appointments |
| **Service Provider** | Profile, Their appointments, Schedule management |
| **Admin** | All routes + Admin dashboard, Create providers, Manage users |

## Redirects

- Anonymous users trying to access `/appointments` → `/sign-in`
- Signed-in users visiting `/sign-in` → `/` (dashboard)
- Non-admin users visiting `/admin/*` → `/` (home)
- Non-provider users visiting `/provider/*` → `/` (home)

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success - GET request |
| 201 | Success - Resource created |
| 400 | Bad request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server error |

---

**Note**: All date/time parameters use ISO 8601 format (YYYY-MM-DDTHH:MM:SS)
**Last Updated**: February 2025
