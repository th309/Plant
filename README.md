# Plant Sitter App

> Connecting plant owners with trusted plant sitters for peace of mind while away

## Overview

Plant Sitter is a mobile marketplace application that connects plant owners with reliable plant sitters, similar to how Rover connects pet owners with pet sitters. The platform provides a seamless booking experience, secure payments, and real-time communication to ensure plants receive the care they need when their owners are traveling or unavailable.

## Vision

To be the leading platform for connecting plant owners with trusted plant sitters, ensuring that every plant receives the care it needs, even when its owner is away.

## Key Features

### For Plant Owners
- Create detailed plant profiles with photos and care instructions
- Search and discover trusted plant sitters in their area
- Book services with flexible scheduling
- Secure payment processing
- Real-time updates and photos during care
- Rate and review sitters

### For Plant Sitters
- Create professional sitter profiles
- Manage availability and service areas
- Accept/decline booking requests
- Earn money caring for plants
- Build reputation through reviews
- Track earnings and bookings

### Platform Features
- User verification system
- In-app messaging
- Push notifications
- Secure payment processing via Stripe
- Geolocation-based search
- Admin dashboard for management

## Project Status

**Current Phase:** Planning & Architecture

## Documentation

- **[PLANNING.md](./PLANNING.md)** - Comprehensive project planning including:
  - Project goals and vision
  - Target users
  - Core features (MVP and future phases)
  - User journeys
  - Technical architecture overview
  - Data models
  - Revenue model
  - Go-to-market strategy
  - Budget estimates
  - Risk assessment

- **[USER_STORIES.md](./USER_STORIES.md)** - Detailed user stories organized by epics:
  - 70+ user stories covering all features
  - Acceptance criteria for each story
  - Priority levels (P0 = MVP Must-Have)
  - Sprint planning guidance

- **[TECHNICAL_SPECS.md](./TECHNICAL_SPECS.md)** - Technical architecture and specifications:
  - System architecture diagrams
  - Technology stack details
  - Database schema with SQL definitions
  - Complete API specification
  - Authentication & authorization
  - Payment integration (Stripe)
  - Real-time features implementation
  - Security considerations
  - Performance & scalability
  - Testing strategy
  - DevOps & deployment

## Technology Stack

### Mobile App
- **Framework:** React Native
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Navigation:** React Navigation

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express
- **Language:** TypeScript
- **ORM:** Prisma / TypeORM
- **Real-time:** Socket.io

### Database
- **Primary:** PostgreSQL 14+ (with PostGIS)
- **Cache:** Redis 7+
- **Storage:** AWS S3 / Cloudinary

### Third-Party Services
- **Payments:** Stripe Connect
- **Authentication:** JWT / Firebase Auth
- **Push Notifications:** Firebase Cloud Messaging
- **Email:** SendGrid
- **SMS:** Twilio
- **Maps:** Google Maps API
- **Analytics:** Mixpanel / Amplitude

## Project Timeline

**Aggressive Development Timeline:** 12 weeks (3 months)
**Team:** 2-person team (Developer + AI Assistant)

- **Week 1:** Foundation & environment setup
- **Weeks 2-3:** Authentication & user profiles
- **Week 4:** Plant profiles & storage
- **Week 5:** Sitter profiles & search
- **Week 6:** Booking system
- **Week 7:** Payment integration
- **Week 8:** Messaging system
- **Week 9:** Reviews & ratings
- **Week 10:** Notifications & polish
- **Week 11:** Admin dashboard & testing
- **Week 12:** Launch preparation & app store submission

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- React Native development environment
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation (Coming Soon)

```bash
# Clone the repository
git clone https://github.com/yourorg/plant-sitter-app.git

# Install backend dependencies
cd backend
npm install

# Install mobile app dependencies
cd ../mobile
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start development servers
npm run dev
```

## Development Roadmap

### Phase 1: MVP - 12 Weeks (Target: 3 Months)
- [ ] Week 1: Foundation & environment setup
- [ ] Weeks 2-3: User authentication and profiles
- [ ] Week 4: Plant profile management
- [ ] Week 5: Sitter search and discovery
- [ ] Week 6: Booking system
- [ ] Week 7: Payment integration (Stripe)
- [ ] Week 8: In-app messaging
- [ ] Week 9: Reviews and ratings
- [ ] Week 10: Push notifications & polish
- [ ] Week 11: Admin dashboard & testing
- [ ] Week 12: App store submission & launch

### Phase 2: Enhanced Features (Months 4-6)
- [ ] Advanced search filters and matching
- [ ] Subscription plans (Premium memberships)
- [ ] Background check integration
- [ ] Video consultations
- [ ] Plant health tracking timeline
- [ ] Social features (follow, feed)
- [ ] Multiple plant photos
- [ ] Booking modification/rescheduling

### Phase 3: Advanced Features (Months 7-12+)
- [ ] Plant marketplace
- [ ] IoT sensor integration
- [ ] AI plant identification
- [ ] International expansion (multi-language)
- [ ] Progressive web app
- [ ] Plant boarding services
- [ ] Insurance and guarantees

## Business Model

### Revenue Streams
1. **Transaction Fees:**
   - Service fee for plant owners (5-10%)
   - Commission from sitters (15-20%)

2. **Subscription Plans:**
   - Plant Owner Premium: $9.99/month
   - Sitter Professional: $14.99/month

3. **Additional Services:**
   - Background checks
   - Featured listings
   - Insurance programs

## Target Market

### Initial Launch Cities
- San Francisco Bay Area
- New York City
- Los Angeles
- Seattle
- Portland
- Austin

### Target Demographics
- **Plant Owners:** Ages 25-45, urban professionals, plant enthusiasts
- **Plant Sitters:** Ages 20-50, plant lovers, horticulture students, retirees

## Competitive Advantage

- **Niche Focus:** First mover in dedicated plant sitting market
- **Trust & Safety:** Comprehensive verification and review system
- **User Experience:** Modern, intuitive mobile-first design
- **Community:** Built for and by plant lovers
- **Technology:** Advanced features (real-time updates, geolocation)

## Contributing

This project is currently in planning phase. Contribution guidelines will be established once development begins.

## Team

**Development Team:** 2-person team
- **Lead Developer:** Full-stack development, architecture, testing, deployment
- **AI Development Assistant:** Code generation, debugging, documentation

**Built with:** AI-accelerated development using Claude

**Development Approach:**
- Rapid iteration with AI-generated code
- Developer reviews, tests, and integrates
- Weekly feature milestones
- Continuous deployment

## License

TBD

## Contact

For inquiries: [contact information to be added]

---

## Quick Links

- [Project Planning](./PLANNING.md)
- [User Stories](./USER_STORIES.md)
- [Technical Specifications](./TECHNICAL_SPECS.md)

---

**Last Updated:** November 2024
**Version:** 0.1.0 (Planning Phase)
