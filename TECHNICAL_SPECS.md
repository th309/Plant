# Plant Sitter App - Technical Specifications

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [API Specification](#api-specification)
5. [Authentication & Authorization](#authentication--authorization)
6. [Payment Integration](#payment-integration)
7. [Real-time Features](#real-time-features)
8. [File Storage](#file-storage)
9. [Push Notifications](#push-notifications)
10. [Geolocation Services](#geolocation-services)
11. [Security Considerations](#security-considerations)
12. [Performance & Scalability](#performance--scalability)
13. [Testing Strategy](#testing-strategy)
14. [DevOps & Deployment](#devops--deployment)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile Applications                      │
│                  (React Native - iOS/Android)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS/REST API
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                             │
│                   (Load Balancer)                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                   Application Server                         │
│                   (Node.js + Express)                        │
│  ┌─────────────┬──────────────┬─────────────┬────────────┐  │
│  │   Auth      │   Booking    │  Payment    │  Messaging │  │
│  │  Service    │   Service    │  Service    │   Service  │  │
│  └─────────────┴──────────────┴─────────────┴────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┬──────────────┐
        ↓             ↓             ↓              ↓
┌──────────────┐ ┌────────────┐ ┌─────────┐ ┌─────────────┐
│  PostgreSQL  │ │   Redis    │ │  S3     │ │  External   │
│  (Primary)   │ │  (Cache)   │ │ (Files) │ │  Services   │
└──────────────┘ └────────────┘ └─────────┘ └─────────────┘
                                               │ Stripe
                                               │ Twilio
                                               │ SendGrid
                                               │ FCM
```

### Architecture Patterns

- **Microservices (Light):** Modular services within monolithic app for MVP
- **RESTful API:** Standard REST endpoints
- **JWT Authentication:** Stateless auth with refresh tokens
- **Repository Pattern:** Data access layer abstraction
- **MVC Pattern:** Model-View-Controller for organization
- **Event-Driven:** WebSockets for real-time features

---

## Technology Stack

### Frontend (Mobile)

**Framework:** React Native 0.72+
- **Language:** TypeScript
- **State Management:** Redux Toolkit + RTK Query
- **Navigation:** React Navigation 6
- **UI Components:** React Native Paper / NativeBase
- **Forms:** React Hook Form + Yup validation
- **Maps:** react-native-maps (Google Maps)
- **Image Handling:** react-native-image-picker, react-native-fast-image
- **Push Notifications:** @react-native-firebase/messaging
- **Payment UI:** @stripe/stripe-react-native
- **Real-time:** Socket.io-client

**Development Tools:**
- **Testing:** Jest, React Native Testing Library
- **E2E Testing:** Detox
- **Code Quality:** ESLint, Prettier
- **CI/CD:** GitHub Actions / Bitrise

### Backend

**Framework:** Node.js 18+ with Express 4.18+
- **Language:** TypeScript
- **ORM:** Prisma / TypeORM
- **Validation:** Zod / Joi
- **API Documentation:** Swagger / OpenAPI
- **Real-time:** Socket.io
- **Job Queue:** Bull (Redis-based)
- **Logging:** Winston / Pino
- **Monitoring:** Sentry

**Development Tools:**
- **Testing:** Jest, Supertest
- **Code Quality:** ESLint, Prettier
- **API Testing:** Postman / Insomnia

### Database

**Primary Database:** PostgreSQL 14+
- **Extensions:** PostGIS (geospatial), pg_trgm (text search)

**Caching:** Redis 7+
- Session storage
- Rate limiting
- Job queues
- Real-time pub/sub

### Infrastructure

**Cloud Provider:** AWS (Primary) / GCP (Alternative)
- **Compute:** EC2 / ECS (Containers)
- **Database:** RDS (PostgreSQL)
- **Cache:** ElastiCache (Redis)
- **Storage:** S3
- **CDN:** CloudFront
- **Load Balancer:** Application Load Balancer
- **DNS:** Route 53

**Alternative (MVP):** Heroku / Railway / Render
- Faster setup, managed services
- PostgreSQL and Redis add-ons included
- Easy scaling for MVP

### Third-Party Services

1. **Payment:** Stripe Connect (marketplace payments)
2. **Authentication:** Firebase Auth / Auth0 (optional)
3. **SMS:** Twilio
4. **Email:** SendGrid / AWS SES
5. **Push Notifications:** Firebase Cloud Messaging (FCM)
6. **Maps & Geocoding:** Google Maps API
7. **Image Processing:** Cloudinary
8. **Analytics:** Mixpanel / Amplitude
9. **Error Tracking:** Sentry
10. **Customer Support:** Intercom / Zendesk (post-MVP)

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    User     │────────▶│   Plant     │────────▶│   Booking   │
└─────────────┘         └─────────────┘         └─────────────┘
      │                                                │
      │                                                │
      ▼                                                ▼
┌─────────────┐                                  ┌─────────────┐
│SitterProfile│                                  │   Payment   │
└─────────────┘                                  └─────────────┘
      │                                                │
      │                                                │
      ▼                                                ▼
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Review    │────────▶│   Message   │────────▶│ Notification│
└─────────────┘         └─────────────┘         └─────────────┘
```

### Tables

#### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_photo_url TEXT,
    bio TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'owner', -- 'owner', 'sitter', 'both'
    location GEOGRAPHY(POINT), -- PostGIS for geospatial
    address JSONB, -- {street, city, state, zip, country}

    -- Verification
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    id_verified BOOLEAN DEFAULT FALSE,
    background_check_status VARCHAR(20), -- 'pending', 'approved', 'rejected'
    background_check_date TIMESTAMP,

    -- Account status
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'suspended', 'banned'
    last_login TIMESTAMP,

    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    -- Indexes
    INDEX idx_email (email),
    INDEX idx_location USING GIST (location),
    INDEX idx_role (role)
);
```

#### sitter_profiles
```sql
CREATE TABLE sitter_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Service details
    experience_level VARCHAR(20) NOT NULL, -- 'beginner', 'intermediate', 'expert'
    specializations TEXT[], -- Array of specializations
    bio TEXT,
    service_radius INTEGER, -- in miles or km
    service_areas GEOGRAPHY(POLYGON)[], -- Multiple service areas

    -- Pricing
    hourly_rate DECIMAL(10,2),
    daily_rate DECIMAL(10,2),
    per_plant_rate DECIMAL(10,2),

    -- Availability
    availability_calendar JSONB, -- {blocked_dates: [], available_hours: {}}
    instant_book_enabled BOOLEAN DEFAULT FALSE,

    -- Stats
    total_bookings INTEGER DEFAULT 0,
    completed_bookings INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    response_time_minutes INTEGER, -- Average response time
    acceptance_rate DECIMAL(5,2), -- Percentage

    -- Settings
    auto_accept_enabled BOOLEAN DEFAULT FALSE,
    max_plants_per_booking INTEGER,

    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(user_id),
    INDEX idx_service_areas USING GIST (service_areas),
    INDEX idx_average_rating (average_rating DESC)
);
```

#### plants
```sql
CREATE TABLE plants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Plant details
    name VARCHAR(255) NOT NULL,
    species VARCHAR(255),
    description TEXT,
    photos TEXT[], -- Array of image URLs

    -- Care instructions
    care_instructions JSONB NOT NULL,
    /* {
        watering_frequency: "every 3 days",
        watering_amount: "1 cup",
        light_requirements: "bright indirect",
        temperature_range: "65-75°F",
        humidity: "moderate",
        fertilizing: "monthly",
        special_notes: "sensitive to overwatering",
        last_watered: "2024-01-15"
    } */

    -- Location
    location GEOGRAPHY(POINT),
    address JSONB, -- If different from owner's address
    location_notes TEXT, -- "in living room by window"

    -- Status
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'archived', 'deceased'

    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_owner (owner_id),
    INDEX idx_status (status)
);
```

#### bookings
```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Parties
    owner_id UUID NOT NULL REFERENCES users(id),
    sitter_id UUID NOT NULL REFERENCES users(id),
    plant_ids UUID[] NOT NULL, -- Array of plant IDs

    -- Dates
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,

    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    /* 'pending' - awaiting sitter acceptance
       'confirmed' - sitter accepted
       'in_progress' - currently happening
       'completed' - finished successfully
       'cancelled_by_owner' - owner cancelled
       'cancelled_by_sitter' - sitter cancelled
       'disputed' - under dispute
    */

    -- Details
    service_type VARCHAR(50) NOT NULL, -- 'daily_visit', 'extended_care', 'boarding'
    visit_frequency VARCHAR(50), -- 'daily', 'every_other_day', 'weekly'
    special_instructions TEXT,
    access_instructions TEXT, -- How to enter home
    emergency_contact JSONB, -- {name, phone, relationship}

    -- Pricing
    subtotal DECIMAL(10,2) NOT NULL,
    service_fee DECIMAL(10,2) NOT NULL,
    sitter_commission DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,

    -- Cancellation
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT,
    refund_amount DECIMAL(10,2),

    -- Completion
    completed_at TIMESTAMP,

    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_owner (owner_id),
    INDEX idx_sitter (sitter_id),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date)
);
```

#### booking_updates
```sql
CREATE TABLE booking_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    sitter_id UUID NOT NULL REFERENCES users(id),

    -- Update details
    update_type VARCHAR(20) NOT NULL, -- 'check_in', 'photo', 'note', 'issue'
    message TEXT,
    photos TEXT[], -- Array of image URLs
    plant_id UUID REFERENCES plants(id), -- Specific plant if applicable

    -- Timestamp
    created_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_booking (booking_id),
    INDEX idx_created (created_at DESC)
);
```

#### messages
```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Parties
    sender_id UUID NOT NULL REFERENCES users(id),
    receiver_id UUID NOT NULL REFERENCES users(id),
    booking_id UUID REFERENCES bookings(id), -- Optional: related to booking

    -- Message content
    content TEXT NOT NULL,
    attachments TEXT[], -- Array of file URLs
    message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'image', 'system'

    -- Status
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,

    -- Timestamp
    created_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_conversation (sender_id, receiver_id, created_at DESC),
    INDEX idx_booking (booking_id),
    INDEX idx_unread (receiver_id, read) WHERE read = FALSE
);
```

#### reviews
```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) UNIQUE,

    -- Review parties
    reviewer_id UUID NOT NULL REFERENCES users(id), -- Who wrote the review
    reviewee_id UUID NOT NULL REFERENCES users(id), -- Who is being reviewed
    reviewer_role VARCHAR(20) NOT NULL, -- 'owner' or 'sitter'

    -- Rating & content
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    photos TEXT[], -- Photos of plants after service

    -- Detailed ratings (optional)
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    reliability_rating INTEGER CHECK (reliability_rating >= 1 AND reliability_rating <= 5),
    plant_care_rating INTEGER CHECK (plant_care_rating >= 1 AND plant_care_rating <= 5),

    -- Response
    response TEXT, -- Sitter's response to review
    response_at TIMESTAMP,

    -- Status
    status VARCHAR(20) DEFAULT 'published', -- 'published', 'hidden', 'reported'

    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_reviewee (reviewee_id),
    INDEX idx_rating (rating DESC),
    INDEX idx_created (created_at DESC)
);
```

#### payments
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id),

    -- Parties
    payer_id UUID NOT NULL REFERENCES users(id), -- Plant owner
    payee_id UUID NOT NULL REFERENCES users(id), -- Plant sitter

    -- Amounts
    amount DECIMAL(10,2) NOT NULL, -- Total charged to owner
    platform_fee DECIMAL(10,2) NOT NULL, -- Platform's cut
    sitter_payout DECIMAL(10,2) NOT NULL, -- Sitter receives
    tip_amount DECIMAL(10,2) DEFAULT 0.00,
    refund_amount DECIMAL(10,2) DEFAULT 0.00,

    -- Payment details
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    /* 'pending' - awaiting capture
       'authorized' - authorized but not captured
       'captured' - payment successful
       'released' - paid out to sitter
       'refunded' - refunded to owner
       'failed' - payment failed
    */

    payment_method VARCHAR(50), -- 'card', 'apple_pay', 'google_pay'

    -- Stripe references
    stripe_payment_intent_id VARCHAR(255),
    stripe_charge_id VARCHAR(255),
    stripe_transfer_id VARCHAR(255),

    -- Payout
    payout_date TIMESTAMP,
    payout_method VARCHAR(50), -- 'bank_transfer', 'debit_card'

    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_booking (booking_id),
    INDEX idx_payer (payer_id),
    INDEX idx_payee (payee_id),
    INDEX idx_status (status)
);
```

#### notifications
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Notification content
    type VARCHAR(50) NOT NULL, -- 'booking_request', 'booking_accepted', 'message', 'payment_received', 'review_received'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB, -- Additional data (booking_id, message_id, etc.)

    -- Status
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,

    -- Delivery
    push_sent BOOLEAN DEFAULT FALSE,
    email_sent BOOLEAN DEFAULT FALSE,
    sms_sent BOOLEAN DEFAULT FALSE,

    -- Timestamp
    created_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_user_unread (user_id, read) WHERE read = FALSE,
    INDEX idx_created (created_at DESC)
);
```

#### user_devices
```sql
CREATE TABLE user_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Device info
    device_token TEXT NOT NULL, -- FCM token
    device_type VARCHAR(20) NOT NULL, -- 'ios', 'android'
    device_name VARCHAR(255), -- "John's iPhone"

    -- Status
    active BOOLEAN DEFAULT TRUE,
    last_used TIMESTAMP DEFAULT NOW(),

    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(device_token),
    INDEX idx_user (user_id)
);
```

#### admin_actions
```sql
CREATE TABLE admin_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES users(id),

    -- Action details
    action_type VARCHAR(50) NOT NULL, -- 'user_suspended', 'review_removed', 'dispute_resolved'
    target_type VARCHAR(50) NOT NULL, -- 'user', 'booking', 'review'
    target_id UUID NOT NULL,

    reason TEXT,
    notes TEXT,

    -- Timestamp
    created_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_admin (admin_id),
    INDEX idx_target (target_type, target_id),
    INDEX idx_created (created_at DESC)
);
```

---

## API Specification

### Base URL
- **Development:** `http://localhost:3000/api/v1`
- **Production:** `https://api.plantsitter.com/api/v1`

### Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer <jwt_token>
```

### API Endpoints

#### Authentication

```
POST   /auth/register                - Register new user
POST   /auth/login                   - Login user
POST   /auth/logout                  - Logout user
POST   /auth/refresh                 - Refresh access token
POST   /auth/forgot-password         - Request password reset
POST   /auth/reset-password          - Reset password
POST   /auth/verify-email            - Verify email
POST   /auth/resend-verification     - Resend verification email
POST   /auth/verify-phone            - Verify phone number
```

**Example: Register**
```json
POST /auth/register
{
  "email": "jane@example.com",
  "password": "SecurePass123!",
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "owner"
}

Response (201):
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "jane@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "role": "owner"
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token"
    }
  }
}
```

#### Users

```
GET    /users/me                     - Get current user profile
PUT    /users/me                     - Update current user profile
DELETE /users/me                     - Delete user account
POST   /users/me/profile-photo       - Upload profile photo
GET    /users/:id                    - Get user by ID (public info)
POST   /users/me/location            - Update location
GET    /users/me/statistics          - Get user statistics
```

#### Sitter Profiles

```
POST   /sitters                      - Create sitter profile
GET    /sitters/:id                  - Get sitter profile (public)
PUT    /sitters/me                   - Update my sitter profile
GET    /sitters/search               - Search sitters
GET    /sitters/:id/reviews          - Get sitter reviews
GET    /sitters/:id/availability     - Check sitter availability
PUT    /sitters/me/availability      - Update availability
GET    /sitters/me/earnings          - Get earnings dashboard
GET    /sitters/me/bookings          - Get my bookings (as sitter)
```

**Example: Search Sitters**
```json
GET /sitters/search?lat=40.7128&lng=-74.0060&radius=10&minRating=4&maxPrice=50&startDate=2024-02-01&endDate=2024-02-05

Response (200):
{
  "success": true,
  "data": {
    "sitters": [
      {
        "id": "uuid",
        "user": {
          "firstName": "John",
          "lastName": "S.",
          "profilePhotoUrl": "https://..."
        },
        "experienceLevel": "expert",
        "averageRating": 4.9,
        "totalReviews": 87,
        "dailyRate": 35.00,
        "distance": 2.4,
        "available": true
      }
    ],
    "total": 15,
    "page": 1,
    "perPage": 10
  }
}
```

#### Plants

```
POST   /plants                       - Create plant profile
GET    /plants                       - Get my plants
GET    /plants/:id                   - Get plant by ID
PUT    /plants/:id                   - Update plant
DELETE /plants/:id                   - Delete plant
POST   /plants/:id/photos            - Upload plant photos
DELETE /plants/:id/photos/:photoId   - Delete plant photo
```

#### Bookings

```
POST   /bookings                     - Create booking request
GET    /bookings                     - Get my bookings
GET    /bookings/:id                 - Get booking details
PUT    /bookings/:id/accept          - Accept booking (sitter)
PUT    /bookings/:id/decline         - Decline booking (sitter)
PUT    /bookings/:id/cancel          - Cancel booking
PUT    /bookings/:id/complete        - Mark booking complete (sitter)
GET    /bookings/:id/updates         - Get booking updates
POST   /bookings/:id/updates         - Create booking update (sitter)
```

**Example: Create Booking**
```json
POST /bookings
{
  "sitterId": "uuid",
  "plantIds": ["uuid1", "uuid2"],
  "startDate": "2024-02-01T10:00:00Z",
  "endDate": "2024-02-05T18:00:00Z",
  "serviceType": "daily_visit",
  "visitFrequency": "daily",
  "specialInstructions": "Water the fern twice",
  "accessInstructions": "Key under mat",
  "emergencyContact": {
    "name": "John Doe",
    "phone": "+1234567890",
    "relationship": "neighbor"
  }
}

Response (201):
{
  "success": true,
  "data": {
    "booking": {
      "id": "uuid",
      "status": "pending",
      "startDate": "2024-02-01T10:00:00Z",
      "endDate": "2024-02-05T18:00:00Z",
      "totalPrice": 140.00,
      "serviceFee": 14.00,
      "subtotal": 126.00
    }
  }
}
```

#### Messages

```
GET    /messages                     - Get my conversations
GET    /messages/:userId             - Get messages with user
POST   /messages                     - Send message
PUT    /messages/:id/read            - Mark message as read
DELETE /messages/:id                 - Delete message
```

#### Payments

```
POST   /payments/setup-intent        - Create payment setup intent
POST   /payments/methods             - Add payment method
GET    /payments/methods             - Get payment methods
DELETE /payments/methods/:id         - Remove payment method
POST   /payments/:bookingId/process  - Process booking payment
POST   /payments/:bookingId/refund   - Request refund
GET    /payments/history             - Get payment history
POST   /payouts/accounts             - Add payout account (sitter)
POST   /payouts/request              - Request payout (sitter)
GET    /payouts/history              - Get payout history (sitter)
```

#### Reviews

```
POST   /reviews                      - Create review
GET    /reviews/:id                  - Get review
PUT    /reviews/:id                  - Update review (within 48h)
POST   /reviews/:id/response         - Respond to review (reviewee)
GET    /reviews/user/:userId         - Get user's reviews
POST   /reviews/:id/report           - Report inappropriate review
```

#### Notifications

```
GET    /notifications                - Get my notifications
PUT    /notifications/:id/read       - Mark notification as read
PUT    /notifications/read-all       - Mark all as read
DELETE /notifications/:id            - Delete notification
GET    /notifications/settings       - Get notification preferences
PUT    /notifications/settings       - Update notification preferences
POST   /notifications/device         - Register device for push notifications
DELETE /notifications/device/:token  - Unregister device
```

#### Admin

```
GET    /admin/users                  - List users
GET    /admin/users/:id              - Get user details
PUT    /admin/users/:id/suspend      - Suspend user
PUT    /admin/users/:id/unsuspend    - Unsuspend user
GET    /admin/bookings               - List all bookings
GET    /admin/disputes               - List disputes
PUT    /admin/disputes/:id/resolve   - Resolve dispute
GET    /admin/analytics              - Get platform analytics
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### HTTP Status Codes

- `200` - OK (successful GET, PUT)
- `201` - Created (successful POST)
- `204` - No Content (successful DELETE)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

---

## Authentication & Authorization

### JWT Token Structure

**Access Token** (15 minutes expiry):
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "owner",
  "iat": 1234567890,
  "exp": 1234568790
}
```

**Refresh Token** (30 days expiry):
```json
{
  "sub": "user_id",
  "type": "refresh",
  "iat": 1234567890,
  "exp": 1237159890
}
```

### Token Flow

1. User logs in → Receive access + refresh tokens
2. Store refresh token securely (encrypted storage)
3. Include access token in API requests
4. When access token expires → Use refresh token to get new tokens
5. Refresh token rotation: issue new refresh token on refresh

### Password Security

- **Hashing:** bcrypt with cost factor 12
- **Requirements:**
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character

### Role-Based Access Control (RBAC)

**Roles:**
- `owner` - Plant owner
- `sitter` - Plant sitter
- `both` - Both owner and sitter
- `admin` - Platform administrator

**Permissions by Role:**
```
owner:
  - Create plants
  - Create bookings (as owner)
  - Pay for bookings
  - Review sitters

sitter:
  - Create sitter profile
  - Accept/decline bookings
  - Receive payments
  - Review owners (private)

admin:
  - All permissions
  - Manage users
  - Resolve disputes
  - View analytics
```

### OAuth Integration (Future)

Support for social login:
- Google OAuth 2.0
- Apple Sign In
- Facebook Login

---

## Payment Integration

### Stripe Connect

**Model:** Marketplace (Platform connects buyers and sellers)

**Flow:**

1. **Platform Setup:**
   - Create Stripe Connected Account for each sitter
   - Sitters complete onboarding (tax info, bank details)

2. **Booking Payment:**
   - Owner books service
   - Create Payment Intent with `application_fee_amount`
   - Charge owner's card
   - Hold funds in platform account

3. **Service Completion:**
   - Booking marked complete
   - Transfer funds to sitter (minus platform fee)
   - Platform retains commission

4. **Refunds:**
   - If cancelled, refund according to policy
   - Platform fee refunded proportionally

**Stripe Objects:**
- **Payment Intent:** Charge owner
- **Transfer:** Pay sitter
- **Refund:** Return money to owner

**Example Implementation:**
```javascript
// Create Payment Intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 14000, // $140.00
  currency: 'usd',
  customer: ownerStripeCustomerId,
  payment_method: paymentMethodId,
  application_fee_amount: 2100, // $21.00 platform fee (15%)
  transfer_data: {
    destination: sitterStripeAccountId, // Sitter receives $119.00
  },
  metadata: {
    bookingId: bookingId,
    ownerId: ownerId,
    sitterId: sitterId
  }
});
```

### Payment Security

- PCI DSS Level 1 Compliance (via Stripe)
- Never store card details
- Use Stripe.js for card tokenization
- 3D Secure (SCA) for European payments
- Fraud detection via Stripe Radar

---

## Real-time Features

### WebSocket Implementation (Socket.io)

**Use Cases:**
1. Real-time messaging
2. Live booking notifications
3. Sitter availability updates
4. Typing indicators

**Architecture:**
```
Client (React Native) ←→ Socket.io Client ←→ Socket.io Server ←→ Redis Pub/Sub
```

**Events:**
```javascript
// Client connects
socket.on('connect', () => {
  socket.emit('authenticate', { token: jwtToken });
});

// New message
socket.on('message:new', (message) => {
  // Display message in UI
});

// Booking update
socket.on('booking:updated', (booking) => {
  // Update booking status
});

// Typing indicator
socket.on('typing', ({ userId, conversationId }) => {
  // Show "User is typing..."
});
```

**Rooms:**
- User-specific: `user:{userId}`
- Conversation: `conversation:{userId1}:{userId2}`
- Booking: `booking:{bookingId}`

---

## File Storage

### AWS S3 / Cloudinary

**Storage Structure:**
```
/users/{userId}/profile/{timestamp}.jpg
/plants/{plantId}/{timestamp}.jpg
/bookings/{bookingId}/updates/{timestamp}.jpg
/reviews/{reviewId}/{timestamp}.jpg
```

**Upload Flow:**

1. Client requests signed URL from backend
2. Backend generates presigned S3 URL (expires in 5 minutes)
3. Client uploads directly to S3
4. Client sends S3 URL to backend
5. Backend stores URL in database

**Image Processing (Cloudinary):**
- Automatic optimization
- Multiple sizes (thumbnail, medium, full)
- Format conversion (WebP for web)
- Lazy loading

**Example:**
```javascript
// Generate presigned URL
const { uploadUrl, fileKey } = await generateUploadUrl({
  userId,
  fileType: 'image/jpeg',
  folder: 'plants'
});

// Upload from client
const response = await fetch(uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': 'image/jpeg' },
  body: imageFile
});

// Save to database
await saveImage({ plantId, url: fileKey });
```

---

## Push Notifications

### Firebase Cloud Messaging (FCM)

**Implementation:**

1. **Device Registration:**
   - On app launch, get FCM token
   - Send token to backend
   - Store in `user_devices` table

2. **Send Notification:**
   - Backend triggers notification
   - Call FCM API with device tokens
   - Track delivery status

**Notification Types:**
```json
{
  "booking_request": {
    "title": "New Booking Request",
    "body": "Jane wants you to sit 3 plants from Feb 1-5",
    "data": { "bookingId": "uuid", "type": "booking_request" }
  },
  "booking_accepted": {
    "title": "Booking Confirmed!",
    "body": "John accepted your booking request",
    "data": { "bookingId": "uuid", "type": "booking_accepted" }
  },
  "new_message": {
    "title": "New message from Jane",
    "body": "What time should I come by?",
    "data": { "conversationId": "uuid", "type": "message" }
  }
}
```

**Notification Preferences:**
- Per-user settings for each notification type
- Quiet hours (no notifications between 10pm-8am)
- In-app vs push vs email preferences

---

## Geolocation Services

### Google Maps API

**Services Used:**
1. **Geocoding API:** Convert address to coordinates
2. **Distance Matrix API:** Calculate distances between locations
3. **Places API:** Address autocomplete

**Implementation:**

**Search Sitters by Location:**
```sql
-- PostGIS query to find sitters within radius
SELECT s.*,
       ST_Distance(s.location, ST_MakePoint(:lng, :lat)::geography) / 1609.34 AS distance_miles
FROM sitter_profiles s
WHERE ST_DWithin(
  s.location,
  ST_MakePoint(:lng, :lat)::geography,
  :radius_miles * 1609.34
)
AND s.average_rating >= :min_rating
ORDER BY distance_miles ASC;
```

**Privacy:**
- Show approximate location on map (fuzzy by 0.1-0.5 miles)
- Reveal exact address only after booking confirmed

---

## Security Considerations

### Data Protection

1. **Encryption at Rest:**
   - Database encryption (AWS RDS encryption)
   - Encrypted S3 buckets
   - Sensitive data (SSN, bank info) encrypted with app-level encryption

2. **Encryption in Transit:**
   - HTTPS/TLS 1.3 for all API calls
   - Certificate pinning in mobile app
   - WebSocket over TLS (wss://)

3. **Secrets Management:**
   - AWS Secrets Manager / HashiCorp Vault
   - Never commit secrets to code
   - Rotate secrets regularly

### API Security

1. **Rate Limiting:**
   - Redis-based rate limiting
   - Per-endpoint limits (e.g., 100 requests/hour for auth endpoints)
   - IP-based and user-based limiting

2. **Input Validation:**
   - Validate all inputs with Zod/Joi schemas
   - Sanitize user-generated content (prevent XSS)
   - Parameterized queries (prevent SQL injection)

3. **CORS:**
   - Whitelist allowed origins
   - Credentials: true for cookie-based auth

4. **CSRF Protection:**
   - CSRF tokens for state-changing operations
   - SameSite cookie attribute

### Application Security

1. **SQL Injection Prevention:**
   - Use ORM (Prisma/TypeORM)
   - Parameterized queries
   - Least privilege database user

2. **XSS Prevention:**
   - Sanitize HTML output
   - Content Security Policy (CSP) headers
   - React Native auto-escapes by default

3. **SSRF Prevention:**
   - Validate URLs before fetching
   - Whitelist allowed domains
   - No user-controlled redirects

4. **Authentication Security:**
   - Bcrypt password hashing
   - Account lockout after failed attempts
   - CAPTCHA for repeated failures
   - Session invalidation on logout

### Compliance

1. **GDPR (EU Users):**
   - User consent for data processing
   - Right to access data
   - Right to delete data (account deletion)
   - Data portability

2. **CCPA (California Users):**
   - Disclosure of data collected
   - Opt-out of data selling
   - Access and deletion requests

3. **PCI DSS (Payment Data):**
   - Never store card details
   - Use Stripe for all payment handling
   - Regular security audits

---

## Performance & Scalability

### Database Optimization

1. **Indexing Strategy:**
   - Indexes on frequently queried columns
   - Composite indexes for multi-column queries
   - Partial indexes for filtered queries
   - GiST indexes for geospatial queries

2. **Query Optimization:**
   - Use EXPLAIN ANALYZE to optimize slow queries
   - Pagination for large result sets
   - Avoid N+1 queries (use eager loading)

3. **Connection Pooling:**
   - PgBouncer for connection pooling
   - Connection limits based on instance size

4. **Read Replicas:**
   - Read from replicas for non-critical reads
   - Write to primary for consistency

### Caching Strategy

1. **Redis Caching:**
   - Cache frequently accessed data (user profiles, sitter lists)
   - TTL-based expiration
   - Cache invalidation on updates

2. **CDN Caching:**
   - CloudFront for static assets
   - Cache images with long TTL
   - Versioned URLs for cache busting

3. **Application-Level Caching:**
   - In-memory cache for config/settings
   - Memoization for expensive computations

### API Performance

1. **Response Compression:**
   - Gzip compression for API responses
   - Brotli compression for better ratios

2. **Pagination:**
   - Cursor-based pagination for large datasets
   - Limit default page size (25 items)

3. **Field Selection:**
   - Allow clients to specify fields to return
   - GraphQL as alternative (future)

4. **Async Processing:**
   - Queue background jobs (emails, notifications)
   - Bull queue with Redis

### Scalability

1. **Horizontal Scaling:**
   - Stateless application servers
   - Load balancer distributes traffic
   - Auto-scaling based on CPU/memory

2. **Database Scaling:**
   - Vertical scaling (upgrade instance size)
   - Horizontal scaling (read replicas)
   - Sharding for extreme scale (future)

3. **CDN:**
   - Distribute static assets globally
   - Reduce origin server load

---

## Testing Strategy

### Unit Testing

**Backend (Node.js):**
- **Framework:** Jest
- **Coverage Goal:** 80%+
- **Focus:** Business logic, utility functions, services

```javascript
describe('BookingService', () => {
  it('should calculate total price correctly', () => {
    const result = calculateBookingPrice({
      dailyRate: 30,
      days: 5,
      serviceFee: 0.10
    });
    expect(result.total).toBe(165); // (30 * 5) + 15 fee
  });
});
```

**Frontend (React Native):**
- **Framework:** Jest + React Native Testing Library
- **Coverage Goal:** 70%+
- **Focus:** Component logic, utility functions

```javascript
describe('BookingCard', () => {
  it('should display booking details', () => {
    const { getByText } = render(<BookingCard booking={mockBooking} />);
    expect(getByText('Feb 1 - Feb 5')).toBeDefined();
  });
});
```

### Integration Testing

**API Integration:**
- **Framework:** Jest + Supertest
- **Focus:** API endpoints, database interactions

```javascript
describe('POST /bookings', () => {
  it('should create a new booking', async () => {
    const response = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingData)
      .expect(201);

    expect(response.body.data.booking.status).toBe('pending');
  });
});
```

### End-to-End Testing

**Mobile App:**
- **Framework:** Detox
- **Focus:** Critical user flows

```javascript
describe('Booking Flow', () => {
  it('should complete full booking process', async () => {
    await element(by.id('search-sitters')).tap();
    await element(by.id('sitter-card-0')).tap();
    await element(by.id('request-booking')).tap();
    await expect(element(by.text('Booking Requested'))).toBeVisible();
  });
});
```

### Performance Testing

- **Tool:** Artillery / k6
- **Focus:** API load testing, stress testing

```yaml
config:
  target: 'https://api.plantsitter.com'
  phases:
    - duration: 60
      arrivalRate: 10 # 10 users per second

scenarios:
  - flow:
      - get:
          url: '/api/v1/sitters/search?lat=40.7&lng=-74'
      - post:
          url: '/api/v1/bookings'
          json:
            sitterId: '{{ sitterId }}'
            plantIds: ['{{ plantId }}']
```

### Security Testing

- **OWASP Top 10 vulnerabilities**
- **Penetration testing** (before launch)
- **Dependency scanning** (Snyk, npm audit)
- **Static code analysis** (SonarQube)

---

## DevOps & Deployment

### CI/CD Pipeline

**GitHub Actions Workflow:**

```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run linter
        run: npm run lint
      - name: Run tests
        run: npm test
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker image
        run: docker build -t plantsitter-api .
      - name: Push to ECR
        run: docker push ${{ secrets.ECR_REGISTRY }}/plantsitter-api:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to ECS
        run: aws ecs update-service --service plantsitter-api --force-new-deployment
```

### Environments

1. **Development:**
   - Local development
   - Runs on localhost
   - Uses local PostgreSQL/Redis

2. **Staging:**
   - Pre-production environment
   - Mirror of production
   - Testing before release

3. **Production:**
   - Live environment
   - High availability setup
   - Auto-scaling enabled

### Monitoring & Logging

1. **Application Monitoring:**
   - **Sentry:** Error tracking and reporting
   - **DataDog/New Relic:** Performance monitoring
   - **Uptime Robot:** Uptime monitoring

2. **Logging:**
   - **Winston/Pino:** Structured logging
   - **CloudWatch Logs:** Centralized log storage
   - **ELK Stack:** Log analysis (optional)

3. **Metrics:**
   - API response times
   - Error rates
   - Database query performance
   - User engagement metrics

4. **Alerting:**
   - PagerDuty / Opsgenie for critical alerts
   - Slack integration for non-critical alerts
   - Alert on: API errors, high latency, database issues

### Backup & Disaster Recovery

1. **Database Backups:**
   - Automated daily backups (RDS)
   - Retention: 30 days
   - Point-in-time recovery enabled

2. **File Backups:**
   - S3 versioning enabled
   - Cross-region replication

3. **Disaster Recovery Plan:**
   - RPO (Recovery Point Objective): 24 hours
   - RTO (Recovery Time Objective): 4 hours
   - Regular DR drills

---

## Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- npm/yarn
- Docker (optional)

### Local Development

1. **Clone Repository:**
```bash
git clone https://github.com/yourorg/plantsitter-app.git
cd plantsitter-app
```

2. **Install Dependencies:**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../mobile
npm install
```

3. **Environment Variables:**
```bash
# backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/plantsitter
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=plantsitter-dev
SENDGRID_API_KEY=...
FCM_SERVER_KEY=...
```

4. **Database Setup:**
```bash
# Run migrations
npx prisma migrate dev

# Seed database
npm run seed
```

5. **Start Development Servers:**
```bash
# Backend
npm run dev  # Runs on http://localhost:3000

# Mobile app
npm start  # Opens Metro bundler
npm run ios  # Run on iOS simulator
npm run android  # Run on Android emulator
```

### Docker Setup (Alternative)

```bash
docker-compose up
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: plantsitter
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  api:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://user:password@postgres:5432/plantsitter
      REDIS_URL: redis://redis:6379
```

---

## Conclusion

This technical specification provides a comprehensive foundation for building the Plant Sitter App. Key highlights:

- **Scalable architecture** with room to grow
- **Modern tech stack** (React Native, Node.js, PostgreSQL)
- **Security-first** approach (encryption, auth, compliance)
- **Third-party integrations** (Stripe, FCM, S3)
- **Clear API design** with RESTful conventions
- **Robust testing** strategy across all layers
- **DevOps automation** for efficient deployment

**Next Steps:**
1. Review and approve this specification
2. Set up development environment
3. Begin Sprint 1 development
4. Iterate based on feedback

**Living Document:**
This specification should be updated as requirements evolve, new technologies emerge, or architectural decisions change.
