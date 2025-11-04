# Plant Sitter App - User Stories

## Epic 1: User Registration & Authentication

### US-1.1: Plant Owner Registration
**As a** plant owner
**I want to** create an account with my email and password
**So that** I can access the platform and book plant sitting services

**Acceptance Criteria:**
- User can register with email, password, first name, last name
- Email validation is performed
- Password must meet security requirements (8+ chars, special char, number)
- User receives confirmation email
- User can upload profile photo
- User can add bio and location

**Priority:** P0 (MVP Must-Have)

---

### US-1.2: Plant Sitter Registration
**As a** plant enthusiast
**I want to** create a sitter profile
**So that** I can offer my plant sitting services and earn money

**Acceptance Criteria:**
- User can register as a sitter
- Sitter can set service areas and radius
- Sitter can specify experience level
- Sitter can set pricing (hourly, daily, per plant)
- Sitter can add specializations and bio
- Profile includes verification options

**Priority:** P0 (MVP Must-Have)

---

### US-1.3: Social Authentication
**As a** user
**I want to** sign up using Google/Apple/Facebook
**So that** I can quickly create an account without entering all details

**Acceptance Criteria:**
- Support Google Sign-In
- Support Apple Sign-In
- Support Facebook Login
- Auto-populate profile with social data
- Link social accounts to existing accounts

**Priority:** P1 (Post-MVP)

---

## Epic 2: Plant Profile Management

### US-2.1: Add Plant Profile
**As a** plant owner
**I want to** create profiles for each of my plants
**So that** sitters know exactly what care each plant needs

**Acceptance Criteria:**
- User can add plant name and species
- User can upload multiple photos
- User can add care instructions (watering, light, temperature)
- User can add special notes
- User can specify location (if different from home)
- Plants are saved to user's collection

**Priority:** P0 (MVP Must-Have)

---

### US-2.2: Edit Plant Profile
**As a** plant owner
**I want to** edit my plant profiles
**So that** I can update care instructions or photos

**Acceptance Criteria:**
- User can edit all plant details
- User can add/remove photos
- User can delete plants
- Changes are saved immediately
- Editing doesn't affect active bookings

**Priority:** P0 (MVP Must-Have)

---

### US-2.3: Plant Care History
**As a** plant owner
**I want to** see a history of care provided to each plant
**So that** I can track my plant's health over time

**Acceptance Criteria:**
- View all past bookings for a specific plant
- See photos from each sitting session
- View sitter notes and updates
- Export care history

**Priority:** P2 (Future Enhancement)

---

## Epic 3: Search & Discovery

### US-3.1: Search for Sitters
**As a** plant owner
**I want to** search for plant sitters in my area
**So that** I can find someone to care for my plants

**Acceptance Criteria:**
- Search by location/zip code
- Filter by availability (date range)
- Filter by price range
- Filter by experience level
- Filter by ratings
- See distance from my location
- View list and map views

**Priority:** P0 (MVP Must-Have)

---

### US-3.2: View Sitter Profile
**As a** plant owner
**I want to** view detailed sitter profiles
**So that** I can decide if they're a good fit for my needs

**Acceptance Criteria:**
- View sitter photo and bio
- See experience level and specializations
- View ratings and reviews
- See pricing information
- View verification badges
- See response time
- View number of completed bookings

**Priority:** P0 (MVP Must-Have)

---

### US-3.3: Favorite Sitters
**As a** plant owner
**I want to** save my favorite sitters
**So that** I can quickly rebook them in the future

**Acceptance Criteria:**
- Ability to "favorite" a sitter
- View list of favorite sitters
- Quick book with favorites
- Receive notifications when favorites update availability

**Priority:** P1 (Post-MVP)

---

## Epic 4: Booking Management

### US-4.1: Request Booking
**As a** plant owner
**I want to** request a plant sitting service
**So that** my plants are cared for while I'm away

**Acceptance Criteria:**
- Select sitter and dates (start/end)
- Select which plants need care
- Add special instructions
- See total cost estimate
- Send booking request to sitter
- Receive confirmation when sitter accepts

**Priority:** P0 (MVP Must-Have)

---

### US-4.2: Accept/Decline Booking (Sitter)
**As a** plant sitter
**I want to** review and respond to booking requests
**So that** I can manage my schedule and accept jobs I can handle

**Acceptance Criteria:**
- Receive notification of new booking request
- View plant details and care requirements
- See owner profile and reviews
- Accept or decline with optional message
- Set automatic acceptance rules (future)

**Priority:** P0 (MVP Must-Have)

---

### US-4.3: View Booking Details
**As a** user (owner or sitter)
**I want to** view all details of a booking
**So that** I have all information I need for the service

**Acceptance Criteria:**
- View dates, time, location
- View plant details and care instructions
- View owner/sitter contact info
- Access messages related to booking
- View payment status
- See booking status (pending/confirmed/in-progress/completed)

**Priority:** P0 (MVP Must-Have)

---

### US-4.4: Cancel Booking
**As a** user (owner or sitter)
**I want to** cancel a booking if needed
**So that** I can handle unexpected changes in my plans

**Acceptance Criteria:**
- Cancel booking with reason
- Cancellation policy enforced (refund rules)
- Both parties notified of cancellation
- Refund processed if applicable
- Option to reschedule instead

**Priority:** P0 (MVP Must-Have)

---

### US-4.5: Modify Booking
**As a** plant owner
**I want to** modify booking dates or details
**So that** I can adjust to changes in my schedule

**Acceptance Criteria:**
- Request to change dates
- Request to add/remove plants
- Sitter must approve changes
- Price adjusted accordingly
- Both parties notified

**Priority:** P1 (Post-MVP)

---

## Epic 5: Communication

### US-5.1: In-App Messaging
**As a** user (owner or sitter)
**I want to** message the other party about a booking
**So that** I can coordinate details and share updates

**Acceptance Criteria:**
- Send text messages
- Share photos
- Receive push notifications for new messages
- Message history per booking
- Read receipts
- Messages are secure and private

**Priority:** P0 (MVP Must-Have)

---

### US-5.2: Photo Updates During Service
**As a** plant sitter
**I want to** send photo updates to the owner
**So that** they can see their plants are being well cared for

**Acceptance Criteria:**
- Upload photos during service
- Add caption/notes to photos
- Owner receives notification
- Photos saved to booking history
- Photos tied to specific plants

**Priority:** P0 (MVP Must-Have)

---

### US-5.3: Video Call
**As a** plant owner
**I want to** have a video call with the sitter before booking
**So that** I can explain care instructions in detail

**Acceptance Criteria:**
- Initiate video call from app
- Both parties must accept
- Stable video/audio quality
- Option to record (with consent)

**Priority:** P2 (Future Enhancement)

---

## Epic 6: Payment Processing

### US-6.1: Add Payment Method
**As a** plant owner
**I want to** securely save my payment information
**So that** I can easily pay for services

**Acceptance Criteria:**
- Add credit/debit card
- Add PayPal account
- Add Apple Pay / Google Pay
- See list of saved payment methods
- Set default payment method
- Data stored securely (PCI compliant)

**Priority:** P0 (MVP Must-Have)

---

### US-6.2: Make Payment
**As a** plant owner
**I want to** pay for booking when confirming
**So that** the sitter is guaranteed payment

**Acceptance Criteria:**
- Payment charged when booking confirmed
- Payment held in escrow
- Receipt generated and emailed
- Payment breakdown shown (subtotal, fees, total)
- Payment confirmation in-app

**Priority:** P0 (MVP Must-Have)

---

### US-6.3: Receive Payment (Sitter)
**As a** plant sitter
**I want to** receive payment after completing service
**So that** I'm compensated for my work

**Acceptance Criteria:**
- Payment released after service completion
- See earnings in dashboard
- Request payout to bank account
- View payment history
- Track platform fees
- Receive 1099 forms for taxes

**Priority:** P0 (MVP Must-Have)

---

### US-6.4: Refund Processing
**As a** plant owner
**I want to** receive a refund if booking is cancelled
**So that** I'm not charged for services not rendered

**Acceptance Criteria:**
- Automatic refund per cancellation policy
- Full refund if sitter cancels
- Partial refund if owner cancels (based on timing)
- Refund notification
- Refund processed to original payment method

**Priority:** P0 (MVP Must-Have)

---

### US-6.5: Tipping
**As a** plant owner
**I want to** tip my sitter for excellent service
**So that** I can show appreciation

**Acceptance Criteria:**
- Add tip after service completion
- Preset tip amounts (10%, 15%, 20%, custom)
- Tip goes 100% to sitter
- Tip shown separately in receipt

**Priority:** P1 (Post-MVP)

---

## Epic 7: Reviews & Ratings

### US-7.1: Rate Sitter
**As a** plant owner
**I want to** rate and review my sitter after service
**So that** other owners can make informed decisions

**Acceptance Criteria:**
- Rate 1-5 stars
- Write detailed review
- Upload photos (plant condition after service)
- Review submitted after service completion
- Can edit review within 48 hours
- Review appears on sitter profile

**Priority:** P0 (MVP Must-Have)

---

### US-7.2: Rate Owner
**As a** plant sitter
**I want to** rate plant owners
**So that** other sitters know what to expect

**Acceptance Criteria:**
- Rate 1-5 stars
- Write review about experience
- Rate on criteria (communication, plant condition, accuracy of listing)
- Reviews visible to other sitters only
- Helps identify problematic owners

**Priority:** P1 (Post-MVP)

---

### US-7.3: Respond to Reviews
**As a** sitter
**I want to** respond to reviews
**So that** I can address concerns or thank owners

**Acceptance Criteria:**
- Write one response per review
- Response shown below review
- Can edit response
- Professional guidelines enforced

**Priority:** P1 (Post-MVP)

---

### US-7.4: Report Inappropriate Review
**As a** user
**I want to** report reviews that violate guidelines
**So that** the platform maintains quality standards

**Acceptance Criteria:**
- Report button on reviews
- Select reason for report
- Admin reviews reported content
- Inappropriate reviews removed
- Users notified of violations

**Priority:** P1 (Post-MVP)

---

## Epic 8: Notifications

### US-8.1: Push Notifications
**As a** user
**I want to** receive push notifications for important events
**So that** I stay informed about my bookings

**Acceptance Criteria:**
- Notifications for: new booking requests, booking accepted/declined, messages, payment received, reviews
- Toggle notifications on/off
- Customize notification preferences
- Notification history in-app
- Sound and badge settings

**Priority:** P0 (MVP Must-Have)

---

### US-8.2: Email Notifications
**As a** user
**I want to** receive email notifications
**So that** I don't miss important updates even when not using the app

**Acceptance Criteria:**
- Email for: booking confirmations, cancellations, payment receipts, weekly summaries
- Unsubscribe options
- HTML formatted emails
- Include booking details and action links

**Priority:** P0 (MVP Must-Have)

---

### US-8.3: SMS Alerts
**As a** user
**I want to** receive SMS for critical alerts
**So that** I'm immediately notified of urgent matters

**Acceptance Criteria:**
- SMS for: emergency cancellations, urgent messages, service day reminders
- Opt-in for SMS
- Low volume (only critical)
- Include link to app

**Priority:** P2 (Future Enhancement)

---

## Epic 9: Safety & Trust

### US-9.1: Verify Account
**As a** user
**I want to** verify my identity
**So that** others trust me on the platform

**Acceptance Criteria:**
- Email verification (required)
- Phone verification (required)
- ID verification (optional)
- Verification badges shown on profile
- Higher trust score with more verifications

**Priority:** P0 (MVP Must-Have)

---

### US-9.2: Background Check (Sitter)
**As a** plant sitter
**I want to** complete a background check
**So that** I can increase trust with plant owners

**Acceptance Criteria:**
- Initiate background check from profile
- Pay background check fee
- Results processed in 3-5 business days
- Badge shown if passed
- Renewed annually

**Priority:** P1 (Post-MVP)

---

### US-9.3: Report User
**As a** user
**I want to** report concerning behavior
**So that** the platform remains safe

**Acceptance Criteria:**
- Report button on profiles
- Select reason (harassment, fraud, safety concern, etc.)
- Provide details
- Admin reviews within 24 hours
- Reporter remains anonymous
- User may be suspended pending investigation

**Priority:** P0 (MVP Must-Have)

---

### US-9.4: Block User
**As a** user
**I want to** block other users
**So that** they can't contact me or see my profile

**Acceptance Criteria:**
- Block from profile or conversation
- Blocked user can't message or book
- Blocked user can't view profile
- Can unblock later
- List of blocked users

**Priority:** P1 (Post-MVP)

---

### US-9.5: Emergency Contact
**As a** plant owner
**I want to** provide emergency contact info
**So that** sitter can reach someone if there's an urgent issue

**Acceptance Criteria:**
- Add emergency contact name and phone
- Shared with sitter only
- Sitter can call with one tap
- Optional for each booking

**Priority:** P1 (Post-MVP)

---

## Epic 10: Sitter Features

### US-10.1: Set Availability
**As a** plant sitter
**I want to** manage my availability calendar
**So that** I only receive requests when I'm available

**Acceptance Criteria:**
- Calendar view of availability
- Block out unavailable dates
- Set recurring unavailability
- Set available hours
- Instant or auto-accept options

**Priority:** P0 (MVP Must-Have)

---

### US-10.2: View Earnings Dashboard
**As a** plant sitter
**I want to** see my earnings and statistics
**So that** I can track my business performance

**Acceptance Criteria:**
- Total earnings (all time, monthly, weekly)
- Upcoming payouts
- Completed bookings count
- Average rating
- Graph of earnings over time
- Top plants cared for

**Priority:** P0 (MVP Must-Have)

---

### US-10.3: Sitter Badges & Achievements
**As a** plant sitter
**I want to** earn badges for milestones
**So that** I can showcase my experience and reliability

**Acceptance Criteria:**
- Badges for: first booking, 10 bookings, 50 bookings, 5-star average, super sitter, etc.
- Displayed on profile
- Notification when earned
- Shareable on social media

**Priority:** P2 (Future Enhancement)

---

### US-10.4: Sitter Resources
**As a** plant sitter
**I want to** access plant care resources
**So that** I can provide better service

**Acceptance Criteria:**
- Plant care guide library
- Common issues and solutions
- Emergency contacts (poison control, veterinarian if pet ate plant)
- Best practices
- Training modules

**Priority:** P2 (Future Enhancement)

---

## Epic 11: Admin & Support

### US-11.1: Admin Dashboard
**As an** admin
**I want to** view platform statistics
**So that** I can monitor the business health

**Acceptance Criteria:**
- Total users (owners, sitters)
- Total bookings
- Revenue metrics
- User growth charts
- Active issues
- Review flagged content

**Priority:** P0 (MVP Must-Have)

---

### US-11.2: User Management
**As an** admin
**I want to** manage user accounts
**So that** I can handle issues and enforce policies

**Acceptance Criteria:**
- Search for users
- View user profiles and history
- Suspend or ban users
- Reset passwords
- Verify accounts manually
- View support tickets

**Priority:** P0 (MVP Must-Have)

---

### US-11.3: Dispute Resolution
**As an** admin
**I want to** resolve disputes between users
**So that** conflicts are handled fairly

**Acceptance Criteria:**
- View dispute details
- See messages between parties
- Review evidence (photos, etc.)
- Make rulings (refunds, warnings)
- Document resolution
- Notify parties of decision

**Priority:** P0 (MVP Must-Have)

---

### US-11.4: Customer Support Chat
**As a** user
**I want to** chat with support
**So that** I can get help when I need it

**Acceptance Criteria:**
- In-app chat widget
- Connect to support agent
- View support history
- Receive response within 24 hours
- Rate support experience

**Priority:** P1 (Post-MVP)

---

## Epic 12: Advanced Features (Future)

### US-12.1: Subscription Plans
**As a** plant owner
**I want to** subscribe to a premium plan
**So that** I get unlimited bookings and extra perks

**Acceptance Criteria:**
- Multiple tier options
- Subscribe monthly or annually
- Cancel anytime
- Manage subscription in settings
- Benefits clearly listed

**Priority:** P2 (Future Enhancement)

---

### US-12.2: Plant Health Tracking
**As a** plant owner
**I want to** track my plant's health over time
**So that** I can see growth and identify issues early

**Acceptance Criteria:**
- Upload photos regularly
- Track measurements (height, leaf count)
- Note health issues
- Timeline view
- Sitters can add to health log

**Priority:** P2 (Future Enhancement)

---

### US-12.3: Plant Identification
**As a** plant owner
**I want to** identify my plant using a photo
**So that** I can add accurate care information

**Acceptance Criteria:**
- Upload or take photo
- AI identifies plant species
- Returns care instructions
- Can accept or override identification
- Integrated with plant profile creation

**Priority:** P2 (Future Enhancement)

---

### US-12.4: Plant Marketplace
**As a** user
**I want to** buy plant care products
**So that** I can get everything I need in one place

**Acceptance Criteria:**
- Browse products (pots, soil, tools, etc.)
- Search and filter
- Add to cart and checkout
- Integrated with existing payment methods
- Track orders
- Sitters can recommend products

**Priority:** P3 (Long-term Future)

---

### US-12.5: Social Feed
**As a** plant owner
**I want to** share photos and tips with the community
**So that** I can connect with other plant lovers

**Acceptance Criteria:**
- Post photos and captions
- Like and comment on posts
- Follow other users
- Feed algorithm (relevant content)
- Discover tab for popular posts

**Priority:** P2 (Future Enhancement)

---

### US-12.6: IoT Integration
**As a** tech-savvy plant owner
**I want to** connect my plant sensors
**So that** sitters can see real-time plant data

**Acceptance Criteria:**
- Integrate with popular plant sensors
- View moisture, light, temperature data
- Alerts when levels are off
- Sitters can see sensor data during booking
- Historical data tracking

**Priority:** P3 (Long-term Future)

---

## User Story Summary

**Total User Stories:** 70+

**Priority Breakdown:**
- **P0 (MVP Must-Have):** 30 stories
- **P1 (Post-MVP):** 18 stories
- **P2 (Future Enhancement):** 15 stories
- **P3 (Long-term Future):** 2 stories

**Epic Breakdown:**
1. User Registration & Authentication: 3 stories
2. Plant Profile Management: 3 stories
3. Search & Discovery: 3 stories
4. Booking Management: 5 stories
5. Communication: 3 stories
6. Payment Processing: 5 stories
7. Reviews & Ratings: 4 stories
8. Notifications: 3 stories
9. Safety & Trust: 5 stories
10. Sitter Features: 4 stories
11. Admin & Support: 4 stories
12. Advanced Features: 6 stories

---

## Development Timeline - 12 Week Aggressive Schedule

**Team:** 2-Person (Developer + AI Assistant)
**Approach:** AI-accelerated development, rapid iteration

### Week-by-Week Epic Mapping

**Week 1: Foundation**
- Project setup, environment configuration
- Database design and initial migrations

**Weeks 2-3: Epic 1 & 2**
- Epic 1: User Registration & Authentication (P0 stories)
- Epic 2: Plant Profile Management (P0 stories)

**Week 4: Continuation of Epic 2**
- Complete plant photo uploads and CRUD operations

**Week 5: Epic 3 & 10**
- Epic 3: Search & Discovery (P0 stories)
- Epic 10: Sitter Features - Basic profile setup (P0 stories)

**Week 6: Epic 4**
- Epic 4: Booking Management (P0 stories)

**Week 7: Epic 6**
- Epic 6: Payment Processing (P0 stories - Stripe integration)

**Week 8: Epic 5**
- Epic 5: Communication (P0 stories - messaging)

**Week 9: Epic 7**
- Epic 7: Reviews & Ratings (P0 stories)

**Week 10: Epic 8 & 9**
- Epic 8: Notifications (P0 stories - push notifications)
- Epic 9: Safety & Trust (P0 basic features - report user, verification)
- UI/UX polish

**Week 11: Epic 11 & Testing**
- Epic 11: Admin & Support (P0 basic dashboard)
- Comprehensive testing and bug fixes

**Week 12: Launch Prep**
- Security audit
- Performance optimization
- App store submission
- Beta testing

### Post-Launch (Weeks 13+)
- **P1 stories** (Post-MVP enhancements)
- **P2 stories** (Future enhancements)
- **P3 stories** (Long-term vision)

**Total:** 12 weeks to MVP launch with all P0 stories completed

### Sprint Structure
- **6 sprints** (2 weeks each)
- **Daily standups:** Morning planning with AI
- **Weekly demos:** Friday review of completed features
- **Continuous integration:** Deploy to staging daily
