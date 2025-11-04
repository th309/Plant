# Week 1: Foundation & Setup - Complete Guide

**Status:** ✅ Complete
**Duration:** Week 1 of 12-week timeline
**Deliverable:** Working development environment with "Hello World" on mobile and backend

---

## What We Built

### Backend API (Node.js + Express + TypeScript)
- ✅ Express server with TypeScript
- ✅ Prisma ORM with complete database schema (11 models)
- ✅ Error handling middleware
- ✅ Winston logger
- ✅ Development environment configuration
- ✅ ESLint + Prettier setup

### Mobile App (React Native + Expo + TypeScript)
- ✅ Expo project with TypeScript
- ✅ Redux Toolkit store setup
- ✅ React Native Paper UI library
- ✅ Navigation structure placeholder
- ✅ API client with axios (with auth interceptors)
- ✅ Theme system (colors, typography, spacing)
- ✅ Development environment configuration

---

## Project Structure

```
Plant/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Complete database schema
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts        # Prisma client configuration
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts   # Global error handling
│   │   │   └── notFoundHandler.ts
│   │   ├── routes/                # API routes (Week 2+)
│   │   ├── controllers/           # Route controllers (Week 2+)
│   │   ├── services/              # Business logic (Week 2+)
│   │   ├── utils/
│   │   │   └── logger.ts          # Winston logger
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript types
│   │   └── server.ts              # Express app entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .eslintrc.json
│   └── .prettierrc
│
├── mobile/
│   ├── src/
│   │   ├── screens/               # App screens (Week 2+)
│   │   ├── components/            # Reusable components (Week 2+)
│   │   ├── navigation/            # Navigation setup (Week 2+)
│   │   ├── store/
│   │   │   └── index.ts           # Redux store
│   │   ├── services/
│   │   │   └── api.ts             # API client
│   │   ├── theme/
│   │   │   └── index.ts           # Theme configuration
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript types
│   │   └── utils/                 # Utility functions (Week 2+)
│   ├── App.tsx                    # App entry point
│   ├── app.json                   # Expo configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.json
│   └── .prettierrc
│
├── docs/
│   ├── WEEK1_SETUP.md             # This file
│   └── ...                        # Other documentation
│
├── PLANNING.md
├── TECHNICAL_SPECS.md
├── USER_STORIES.md
└── README.md
```

---

## Setup Instructions (For Your Computer)

### Prerequisites

You need to install these on your Windows 11 computer:

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Choose LTS (Long Term Support) version
   - During installation, check "Add to PATH"

2. **PostgreSQL** (v14 or higher)
   - Download: https://www.postgresql.org/download/windows/
   - Remember the password you set during installation!
   - Default port: 5432

3. **Git** (if not already installed)
   - Download: https://git-scm.com/download/win
   - Use default options during installation

4. **VS Code** (recommended editor)
   - Download: https://code.visualstudio.com/
   - Install extensions:
     - ESLint
     - Prettier
     - Prisma
     - React Native Tools

5. **Expo Go App** (on your phone for testing)
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

---

## Installation Steps

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies (this will take a few minutes)
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your PostgreSQL credentials
# Open .env in VS Code and update:
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/plantsitter?schema=public"
```

### Step 2: Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init

# This will:
# - Create the 'plantsitter' database
# - Create all 11 tables
# - Generate Prisma Client types
```

### Step 3: Start Backend Server

```bash
# Start development server
npm run dev

# You should see:
# 🚀 Server is running on port 3000
# 📝 Environment: development
# 🔗 API endpoint: http://localhost:3000/api/v1
# ❤️  Health check: http://localhost:3000/health
```

**Test it:** Open browser to `http://localhost:3000/health`
You should see:
```json
{
  "success": true,
  "message": "Plant Sitter API is running",
  "timestamp": "2024-11-04T...",
  "environment": "development"
}
```

### Step 4: Mobile App Setup

Open a NEW terminal (keep backend running):

```bash
# Navigate to mobile folder
cd mobile

# Install dependencies (this will take a few minutes)
npm install

# Start Expo development server
npm start
```

### Step 5: Run Mobile App

After `npm start`, you'll see a QR code in the terminal.

**Option A: Test on Your Phone (Recommended)**
1. Open Expo Go app on your phone
2. Scan the QR code
3. App will load on your phone
4. You should see "🌱 Plant Sitter - Week 1: Foundation Complete!"

**Option B: Test on Android Emulator**
- Press `a` in the terminal
- Requires Android Studio (we can set up later if needed)

**Option C: Test on iOS Simulator (Mac only)**
- Not available on Windows
- We'll use Expo cloud builds to create iOS builds later

---

## Verify Everything Works

### ✅ Backend Checklist

Run these commands in the backend folder:

```bash
# 1. Check TypeScript compiles
npm run build

# 2. Check linting
npm run lint

# 3. Check formatting
npm run format

# 4. Check database connection
npx prisma studio
# Opens browser at http://localhost:5555
# You should see all your tables (empty for now)
```

### ✅ Mobile Checklist

Run these commands in the mobile folder:

```bash
# 1. Check TypeScript compiles
npx tsc --noEmit

# 2. Check linting
npm run lint

# 3. App should be running on your phone via Expo Go
```

---

## Common Issues & Solutions

### Issue: "npm install" fails
**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Try again
npm install
```

### Issue: "Prisma migrate" fails
**Solutions:**
1. Make sure PostgreSQL is running
   - Open Windows Services
   - Find "postgresql-x64-14" (or similar)
   - Make sure it's running

2. Check DATABASE_URL in .env
   - Format: `postgresql://username:password@localhost:5432/database`
   - Common issue: wrong password

3. Try creating database manually:
   ```bash
   # Open psql command line
   psql -U postgres

   # Create database
   CREATE DATABASE plantsitter;

   # Exit
   \q

   # Try migrate again
   npx prisma migrate dev
   ```

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or change port in backend/.env
PORT=3001
```

### Issue: Can't scan QR code in Expo
**Solution:**
- Make sure phone and computer are on same WiFi
- Try manually entering URL shown in terminal
- Try pressing `r` to reload

### Issue: "Module not found" errors
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# For Expo specifically
cd mobile
npx expo start -c  # -c clears cache
```

---

## What's Next: Week 2-3

In the next 2 weeks, we'll build:

### Week 2-3 Tasks:
1. ✅ User registration endpoint (backend)
2. ✅ User login endpoint (backend)
3. ✅ JWT authentication middleware
4. ✅ Password reset functionality
5. ✅ Login screen (mobile)
6. ✅ Register screen (mobile)
7. ✅ Profile screen (mobile)
8. ✅ Navigation setup (mobile)
9. ✅ Auth state management (Redux)

**Deliverable:** Users can sign up, log in, and view their profile

---

## Environment Variables Reference

### Backend (.env)

```bash
# Server
NODE_ENV=development
PORT=3000

# Database (REQUIRED)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/plantsitter"

# JWT (REQUIRED for Week 2)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars

# Everything else can be added later as needed
```

### Mobile (.env)
```bash
# Not needed for Week 1
# We'll add environment config in Week 2
```

---

## Development Workflow

### Daily Development Process:

1. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Mobile** (in new terminal)
   ```bash
   cd mobile
   npm start
   ```

3. **Open VS Code**
   - Edit code
   - Changes auto-reload (hot reload)

4. **Test on Phone**
   - Shake phone to open Expo dev menu
   - Press "Reload" if needed

5. **Check Backend Logs**
   - Watch terminal for API logs
   - Errors will show in terminal

6. **Check Mobile Logs**
   - Expo terminal shows logs
   - Or shake phone → "Debug" → opens Chrome debugger

### Before Committing Code:

```bash
# Backend
cd backend
npm run lint:fix
npm run format
npm run build

# Mobile
cd mobile
npm run lint:fix
npm run format
npx tsc --noEmit

# Commit
git add .
git commit -m "Your commit message"
git push
```

---

## Useful Commands

### Backend

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build TypeScript to dist/
npm run start            # Start production server (from dist/)

# Database
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create and apply migration
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema without migration (dev only)

# Code Quality
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors
npm run format           # Format code with Prettier
npm test                 # Run tests (Week 2+)
```

### Mobile

```bash
# Development
npm start                # Start Expo dev server
npm run android          # Open on Android emulator
npm run ios              # Open on iOS simulator (Mac only)
npm run web              # Open in web browser

# Code Quality
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors
npm run format           # Format code with Prettier
npm test                 # Run tests (Week 2+)

# Expo
npx expo start -c        # Start with cleared cache
npx expo doctor          # Check for issues
npx expo install         # Install compatible versions
```

---

## Database Schema Overview

We have 11 tables ready:

1. **users** - User accounts (owners, sitters, admins)
2. **sitter_profiles** - Extended info for sitters
3. **plants** - Plant profiles owned by users
4. **bookings** - Booking requests and confirmed bookings
5. **booking_updates** - Photos and notes during service
6. **messages** - In-app messaging
7. **reviews** - Ratings and reviews after service
8. **payments** - Payment transactions (Stripe)
9. **notifications** - Push notifications
10. **user_devices** - Device tokens for push notifications
11. **admin_actions** - Audit log for admin actions

All relationships are set up and ready to use!

---

## Resources

### Documentation
- **Prisma:** https://www.prisma.io/docs
- **Express:** https://expressjs.com/
- **React Native:** https://reactnative.dev/
- **Expo:** https://docs.expo.dev/
- **Redux Toolkit:** https://redux-toolkit.js.org/

### Tutorials
- **Prisma with PostgreSQL:** https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql
- **Expo Getting Started:** https://docs.expo.dev/get-started/create-a-new-app/
- **React Navigation:** https://reactnavigation.org/docs/getting-started

---

## Week 1 Completion Checklist

✅ Backend folder structure created
✅ Express server with TypeScript configured
✅ Prisma schema with all 11 models defined
✅ Database migrations ready
✅ Error handling and logging set up
✅ ESLint and Prettier configured
✅ Mobile app folder structure created
✅ Expo project with TypeScript configured
✅ Redux store initialized
✅ API client with auth interceptors
✅ Theme system defined
✅ Development environment tested

**Status:** ✅ **WEEK 1 COMPLETE!**

**Next:** Week 2-3 - Authentication & User Profiles

---

## Need Help?

If you run into issues:
1. Check "Common Issues & Solutions" section above
2. Check the error message carefully
3. Google the error (Stack Overflow is your friend)
4. Ask me! I'm here to help debug and fix issues

**Let's move to Week 2!** 🚀
