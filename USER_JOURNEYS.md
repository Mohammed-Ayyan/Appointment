# BookPro User Journeys

Complete step-by-step guides for all user types and workflows in the BookPro system.

## 1. New Patient Registration Journey

**User Type**: Anonymous User  
**Time**: ~5 minutes  
**Goal**: Create account and be ready to book appointments

### Steps

1. **Open Home Page**
   - URL: `http://localhost:3000`
   - See: Hero section with CTA "Sign Up to Book Appointments"

2. **Click Sign Up Button**
   - Navigate to `/sign-up`
   - See: Registration form with fields:
     - Full Name
     - Email Address
     - Password
     - Terms agreement checkbox

3. **Fill Registration Form**
   - Enter Full Name: "Sarah Johnson"
   - Enter Email: "sarah.johnson@email.com"
   - Enter Password: "SecurePass123!"
   - Check "I agree to Terms of Service"

4. **Submit Form**
   - Click "Create Account" button
   - System validates email doesn't exist
   - Better Auth creates user account
   - Session cookie is set

5. **Redirected to Dashboard**
   - URL: `/` (home page)
   - User is now authenticated
   - Navigation shows user name
   - Can now browse providers

### What Happens Behind the Scenes

```
1. Form validation (client-side)
   ↓
2. Sign-up request to /api/auth/sign-up
   ↓
3. Better Auth creates user in database
   ↓
4. Session is established
   ↓
5. User redirected to home page
   ↓
6. Navigation updates to show user menu
```

---

## 2. Patient Login Journey

**User Type**: Existing User  
**Time**: ~2 minutes  
**Goal**: Access account and booking features

### Steps

1. **Open Login Page**
   - URL: `http://localhost:3000/sign-in`
   - See: Login form

2. **Enter Credentials**
   - Email: `john@example.com`
   - Password: `password123`

3. **Click Sign In**
   - System validates credentials with Better Auth
   - If correct, session is created
   - If incorrect, error message shown

4. **Redirected to Home**
   - URL: `/`
   - User navigation menu visible
   - Can access appointments and profile

### Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid email or password" | Wrong credentials | Check caps lock, try again |
| "Account not found" | Email not registered | Go to /sign-up to register |
| "Session expired" | Session cookie expired | Sign in again |

---

## 3. Browse and Search Service Providers

**User Type**: Any User  
**Time**: ~3-5 minutes  
**Goal**: Find suitable service provider

### Steps

1. **Open Providers Page**
   - URL: `http://localhost:3000/providers`
   - See: List of all service providers with cards showing:
     - Provider name and photo
     - Service category (Plumbing, Electrical, Tutoring, etc.)
     - Rating (1-5 stars)
     - Location
     - Price range

2. **Filter by Category** (Optional)
   - Click filter dropdown: "All Categories"
   - Select: "Plumbing"
   - Results update instantly

3. **Search by Name** (Optional)
   - Enter search term: "John's"
   - Results filtered to matching providers

4. **Sort Results** (Optional)
   - Click sort dropdown
   - Options:
     - Recommended (default)
     - Highest Rated
     - Lowest Price
     - Highest Price

5. **View Provider Details**
   - Click on provider card
   - URL: `/providers/[id]`
   - See:
     - Full provider profile
     - About/bio
     - Complete reviews with star ratings
     - Available time slots
     - Service categories offered

6. **Decision**
   - **If interested**: Click "Book Now" → Go to Booking Journey
   - **If not**: Click back or browse other providers

### Database Queries

```sql
-- Get all providers
SELECT * FROM service_provider 
ORDER BY rating DESC

-- Search by category
SELECT * FROM service_provider 
WHERE specialty ILIKE '%plumbing%'
ORDER BY rating DESC

-- Filter by location
SELECT * FROM service_provider 
WHERE location ILIKE '%New York%'
```

---

## 4. Book an Appointment

**User Type**: Authenticated User  
**Time**: ~5-7 minutes  
**Goal**: Schedule service with chosen provider

### Steps

1. **Start Booking**
   - From provider detail page, click "Book Now"
   - URL: `/appointments/new?providerId=1`
   - See: Booking form

2. **Select Service Type**
   - Dropdown: "Consultation", "Treatment", "Follow-up"
   - User selects: "Consultation"

3. **Select Date**
   - Calendar picker shows provider's available dates
   - Click desired date: February 20, 2024

4. **Select Time Slot**
   - Available times shown for selected date:
     - 10:00 AM ✓
     - 11:00 AM ✓
     - 2:00 PM ✓
   - Select: 2:00 PM

5. **Set Duration**
   - Dropdown: 30 min, 45 min, 60 min
   - Select: 30 minutes

6. **Add Notes** (Optional)
   - Text area for special requests
   - Example: "Please call 5 min before arrival"

7. **Confirm and Pay**
   - Click "Book Appointment"
   - Show booking summary:
     - Provider name
     - Service type
     - Date and time
     - Duration
     - Cost (if applicable)

8. **Booking Confirmation**
   - Appointment created
   - Email confirmation sent
   - Redirected to `/appointments/[id]`
   - Confirmation message displayed

### Database Operations

```sql
-- Check available time slots
SELECT * FROM time_slot 
WHERE provider_id = 1 
AND date = '2024-02-20'
AND is_available = true

-- Create appointment
INSERT INTO appointment (
  user_id, provider_id, date, time, service, duration, status
) VALUES (1, 1, '2024-02-20T14:00:00', '2:00 PM', 'Consultation', '30 min', 'Confirmed')

-- Mark time slot as booked
UPDATE time_slot 
SET is_available = false 
WHERE id = 123
```

---

## 5. Manage User Appointments

**User Type**: Authenticated User  
**Time**: ~2 minutes  
**Goal**: View, reschedule, or cancel appointments

### Steps

1. **View Appointments List**
   - Click "My Appointments" in user menu
   - URL: `/appointments`
   - See: All user appointments organized by:
     - Upcoming (next to be scheduled)
     - Past (completed)

2. **View Appointment Details**
   - Click on appointment card
   - URL: `/appointments/[id]`
   - See:
     - Provider info
     - Appointment date/time
     - Service details
     - Location/video call link
     - Status
     - Booking confirmation code

3. **Cancel Appointment**
   - Click "Cancel Appointment" button
   - Confirmation dialog appears
   - Select reason (Optional)
   - Click "Confirm Cancellation"
   - Appointment status changes to "Cancelled"
   - Provider and patient notified via email
   - Time slot becomes available again

4. **Reschedule Appointment**
   - Click "Reschedule" button
   - Re-enter the booking flow
   - Select new date/time
   - Confirm changes
   - Old appointment replaced with new one

5. **Leave Review** (After appointment completion)
   - Click "Leave Review" button
   - See review form:
     - Star rating (1-5)
     - Comment text area
     - Punctuality rating
   - Submit review
   - Review appears on provider's profile

---

## 6. Service Provider Dashboard Journey

**User Type**: Service Provider  
**Time**: ~5 minutes  
**Goal**: Manage appointments and availability

### Steps

1. **Login as Provider**
   - URL: `/sign-in`
   - Email: `emily.johnson@example.com`
   - Password: `password123`
   - Redirected to provider dashboard

2. **Access Provider Dashboard**
   - URL: `/provider/dashboard` (auto-redirect)
   - See dashboard with:
     - Today's appointments (count)
     - Upcoming appointments (list)
     - Total earnings (this month)
     - Average rating

3. **View Appointments**
   - Click "Appointments" in sidebar
   - URL: `/provider/appointments`
   - See: List of all appointments with:
     - Patient name
     - Service type
     - Date and time
     - Status (Pending, Confirmed, Completed, Cancelled)
     - Actions (View, Mark Complete, Cancel)

4. **Mark Appointment Complete**
   - Click on upcoming appointment
   - Click "Mark as Completed"
   - Enter completion details (optional)
   - System emails patient confirmation
   - Patient can now leave review

5. **Manage Availability**
   - Click "Schedule" in sidebar
   - URL: `/provider/schedule`
   - See: Calendar with time slots
   - Options:
     - Add available time slots
     - Mark dates as unavailable
     - Set vacation/break periods
     - Edit slot duration (default: 30 min)

6. **Update Profile**
   - Click "Profile" in sidebar
   - Edit information:
     - Bio/about
     - Services offered
     - Hourly rate
     - Certifications
     - Profile photo

7. **View Reviews**
   - Click "Reviews" in sidebar
   - See: All patient reviews and ratings
   - Sort by date, rating
   - Respond to reviews (optional)

---

## 7. Admin Create Service Provider

**User Type**: Administrator  
**Time**: ~3 minutes  
**Goal**: Register new service provider in system

### Steps

1. **Login as Admin**
   - URL: `/sign-in`
   - Email: `admin@example.com`
   - Password: `password123`
   - Redirected to admin dashboard

2. **Access Provider Management**
   - Click "Service Providers" in admin menu
   - URL: `/admin/service-providers`
   - See: Provider creation form

3. **Fill Provider Form**
   - Provider Name: "Quick Fix Electrical"
   - Email: "quickfix@electrical.com"
   - Service Category: "Electrical"
   - Phone: "+1-555-0001"
   - Location: "San Francisco, CA"

4. **Submit Form**
   - Click "Create Service Provider"
   - System validates email uniqueness
   - Creates user account with temporary password
   - Creates provider profile
   - Success message shows:
     - Confirmation of creation
     - Temporary password: `aBc123XyZ`

5. **Provider Receives Credentials**
   - Admin should communicate:
     - Email
     - Temporary password
     - Login URL: `http://localhost:3000/sign-in`
   - Provider should change password on first login

### Behind the Scenes

```
1. Admin fills form
   ↓
2. Validate email doesn't exist
   ↓
3. Generate temporary password
   ↓
4. Create user account via Better Auth
   ↓
5. Create service_provider record linked to user
   ↓
6. Return credentials to admin
```

---

## 8. Admin Manage Users

**User Type**: Administrator  
**Time**: ~3 minutes  
**Goal**: Monitor and manage user accounts

### Steps

1. **Access User Management**
   - URL: `/admin/users`
   - See: Table of all users with:
     - Name
     - Email
     - Account type (User/Provider/Admin)
     - Created date
     - Status (Active/Inactive)

2. **Search Users**
   - Enter search term in filter
   - Filter by user type
   - Sort by date created or name

3. **View User Details**
   - Click on user row
   - See full profile:
     - Account info
     - Appointments made/received
     - Reviews written
     - Account status

4. **Deactivate User**
   - Click "Deactivate" action
   - Confirmation dialog
   - User account disabled
   - Cannot login
   - Existing appointments unaffected

5. **Reactivate User**
   - Click "Activate" action
   - User can login again

6. **Delete User** (if needed)
   - Click "Delete" action
   - Strong confirmation required
   - User data permanently removed
   - Associated appointments handled per policy

---

## 9. Admin View Analytics

**User Type**: Administrator  
**Time**: ~5 minutes  
**Goal**: Monitor system performance and usage

### Steps

1. **Access Analytics Dashboard**
   - URL: `/admin/dashboard`
   - See dashboard with:
     - Total users count
     - Total providers count
     - Total appointments (this month)
     - System rating (average)

2. **View Metrics**
   - Total bookings trend (chart)
   - Top-rated providers (list)
   - Busiest time slots
   - User acquisition (chart)

3. **Export Data** (if available)
   - Click "Export Report"
   - Generate CSV or PDF
   - Contains: Users, providers, appointments data

---

## 10. Complete Booking Flow Demo

**Time**: ~15 minutes  
**Demonstrates**: Complete user journey from start to finish

### Full Demo Script

```
STEP 1: ADMIN CREATES PROVIDER
├─ Login as admin@example.com
├─ Go to /admin/service-providers
├─ Create provider:
│  ├─ Name: "Plumbing Pro"
│  ├─ Email: pro@plumbing.com
│  ├─ Category: Plumbing
├─ Receive temporary password
└─ Note credentials

STEP 2: PROVIDER SETS AVAILABILITY
├─ Login as pro@plumbing.com with temp password
├─ Change password when prompted
├─ Go to /provider/schedule
├─ Add time slots for next 2 weeks
└─ Logout

STEP 3: NEW USER SIGNS UP
├─ Go to /sign-up
├─ Register: new-customer@email.com
├─ Verify email (if enabled)
└─ Redirected to home

STEP 4: USER BROWSES PROVIDERS
├─ Go to /providers
├─ Filter by "Plumbing"
├─ Find "Plumbing Pro"
├─ Click to view details
└─ See all available slots

STEP 5: USER BOOKS APPOINTMENT
├─ Click "Book Now"
├─ Select service: "Emergency Repair"
├─ Pick date: 3 days from now
├─ Pick time: 2:00 PM
├─ Add note: "Leaking kitchen sink"
├─ Confirm booking
└─ See confirmation code

STEP 6: PROVIDER RECEIVES NOTIFICATION
├─ Provider email receives booking notification
├─ Provider logs in
├─ Goes to /provider/appointments
└─ Sees new pending appointment

STEP 7: PROVIDER CONFIRMS APPOINTMENT
├─ Clicks on appointment
├─ Reviews customer details
├─ Clicks "Confirm"
└─ Customer receives confirmation email

STEP 8: APPOINTMENT COMPLETED
├─ At scheduled time, appointment occurs
├─ After completion, provider marks as "Completed"
└─ Customer receives completion notification

STEP 9: CUSTOMER LEAVES REVIEW
├─ Customer logs in
├─ Goes to /appointments
├─ Finds completed appointment
├─ Clicks "Leave Review"
├─ Rates 5 stars
├─ Writes comment: "Excellent service, quick response!"
└─ Review published

STEP 10: REVIEW VISIBLE ON PROVIDER PROFILE
├─ Customer visits /providers again
├─ Selects same provider
├─ Sees new review on profile
└─ Provider's rating increases
```

---

## Error Handling in Journeys

### What if Provider is Fully Booked?
- User sees message: "No available slots for this date"
- User can select different date
- Can enable waiting list functionality

### What if User Cancels After 24 Hours?
- Cancellation fee may apply (if configured)
- Provider still gets notification
- Time slot becomes available again

### What if Payment Fails?
- Error message shown
- Appointment not created
- User can retry with different payment method

### What if User Doesn't Confirm Identity?
- Email verification required
- Account partially restricted
- Can verify by clicking email link

---

**Last Updated**: February 2025  
**Version**: 1.0
