# Flowva Rewards Hub

A comprehensive rewards and points management system built with React, TypeScript, and Supabase. This application allows users to earn points through various activities, track their daily streaks, refer friends, and redeem rewards.


## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Backend/Database**: Supabase (PostgreSQL)
- **Routing**: React Router DOM 7.11.0
- **Notifications**: React Toastify 11.0.5
- **Icons**: Lucide React 0.562.0

## Features

### 1. Point Balance System

- Real-time point balance tracking
- User-scoped balance management
- Automatic balance initialization (defaults to 0)
- Progress tracking toward milestone rewards (e.g., $5 Gift Card at 5000 points)
- Visual progress bar and balance display

### 2. Daily Streak System

- Daily check-in functionality
- 7-day streak visualization
- Automatic streak calculation
- Duplicate claim prevention (user-scoped)
- Points awarded for daily claims (configurable via rewards table)
- Success modal on claim

### 3. Referral System

- Automatic referral code generation (first 8 characters of user ID)
- Referral link sharing with copy functionality
- Social media sharing buttons (Facebook, Twitter/X, LinkedIn, WhatsApp)
- Referral statistics tracking (count and points earned)
- Automatic referral processing from URL parameters (`?ref=CODE`)
- Duplicate referral prevention
- Points awarded to referrer when new user joins

### 4. Top Tool Spotlight

- Featured tool promotion (currently Reclaim.ai)
- Claim modal with email validation and file upload
- Duplicate claim prevention
- Points awarded upon successful claim submission
- Status tracking (pending/approved)

### 5. Share Stack System

- Tech stack sharing functionality
- Modal system for stack availability:
  - `NoStackModal`: Shown when user has no stacks
  - `StackAvailModal`: Shown when stacks are available
  - `ShareOptionModal`: Sharing options and social media links
- Points awarded for sharing stack
- Stack data stored in global context

### 6. Reward Redemption

- Browse available redeemable items
- Filter by: All Rewards, Unlocked, Locked, Coming Soon
- Point deduction on redemption
- Redemption history tracking
- Disabled state for insufficient points

### 7. Authentication

- Anonymous authentication via Supabase
- Manual login trigger (no automatic sign-in)
- Session management
- User profile display in sidebar
- Guest user support

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── AppLayout.tsx          # Main layout wrapper
│   │   └── AppSidebar.tsx         # Sidebar with navigation and user info
│   ├── rewards/
│   │   ├── DailyStreak.tsx        # Daily streak card and claim logic
│   │   ├── PointBalanceCard.tsx  # Point balance display with progress
│   │   ├── ReferAndEarn.tsx       # Referral system implementation
│   │   ├── ReferAndWin.tsx        # Referral contest card
│   │   ├── ShareStack.tsx         # Share stack functionality
│   │   ├── TopSpotlightTool.tsx   # Featured tool card
│   │   ├── TopToolClaimModal.tsx  # Claim modal for top tool
│   │   ├── Redeemables.tsx        # Redeemable item card component
│   │   ├── NoStackModal.tsx       # Modal for no stack scenario
│   │   ├── StackAvailModal.tsx    # Modal for available stacks
│   │   ├── ShareOptionModal.tsx   # Sharing options modal
│   │   └── DailyClaimSuccessModal.tsx # Success modal for daily claims
│   └── ui/                        # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── header.tsx
│       ├── modal.tsx
│       ├── notification.tsx
│       ├── progress.tsx
│       ├── skeleton.tsx
│       ├── subheading.tsx
│       └── tab.tsx
├── context/
│   └── AppContext.tsx              # Global application context
├── hooks/
│   ├── usePointBalance.tsx        # Point balance management hook
│   └── useRewards.tsx             # Rewards configuration hook
├── pages/
│   └── RewardsHub/
│       ├── RewardsHub.tsx         # Main rewards hub page
│       ├── EarnPoint/
│       │   └── EarnPoint.tsx      # Earn points section
│       └── RedeemRewards/
│           └── RedeemRewards.tsx # Redeem rewards section
├── services/
│   └── config.ts                  # Supabase client configuration
├── lib/
│   └── utils.ts                   # Utility functions (cn, etc.)
└── index.css                      # Global styles and theme
```

## Architecture

### Component Hierarchy

```
App
└── AppProvider (Context Provider)
    └── BrowserRouter
        └── AppLayout
            ├── AppSidebar
            └── Routes
                └── RewardsHub
                    ├── Header
                    ├── Tabs (Earn Points / Redeem Rewards)
                    └── Content
                        ├── EarnPoint
                        │   ├── PointsBalanceCard
                        │   ├── DailyStreakCard
                        │   ├── TopSpotlightTool
                        │   ├── ReferAndWin
                        │   ├── ShareStack
                        │   └── ReferAndEarn
                        └── RedeemRewards
                            └── Redeemables (grid)
```

### Data Flow

1. **Authentication**: Supabase Auth → AppContext → Components
2. **Point Balance**: `usePointBalance` hook → AppContext → Components
3. **Rewards Config**: `useRewards` hook → Components
4. **Stack Data**: Supabase → AppContext → ShareStack components

## Database Schema

### Tables

#### `accumulated_point_balance`

- `id` (Primary Key)
- `user_id` (Foreign Key to auth.users)
- `balance` (Integer, default: 0)
- **Constraint**: One balance record per user (enforced in application logic)

#### `claim_days`

- `id` (Primary Key)
- `user_id` (Foreign Key to auth.users)
- `claim_date` (Date)
- **Constraint**: Unique claim per user per date (enforced in application logic)

#### `referral_codes`

- `id` (Primary Key)
- `user_id` (Foreign Key to auth.users, Unique)
- `code` (String, first 8 chars of user_id)

#### `referrals`

- `id` (Primary Key)
- `referrer_id` (Foreign Key to auth.users)
- `user_id` (Foreign Key to auth.users)
- `referral_code` (String)

#### `top_tool_claims`

- `id` (Primary Key)
- `user_id` (Foreign Key to auth.users)
- `email` (String)
- `status` (String, default: "pending")
- `screenshot_filename` (String, nullable)
- `file_size` (Integer, nullable)
- `file_type` (String, nullable)

#### `rewards`

- `id` (Primary Key)
- `daily_reward` (Integer)
- `share_stack_reward` (Integer)
- `top_tool_reward` (Integer)
- `referal_reward` (Integer)

#### `redeemables`

- `id` (Primary Key)
- `icon` (String)
- `name` (String)
- `description` (String)
- `points` (Integer)

#### `redeemed`

- `id` (Primary Key)
- `user_id` (Foreign Key to auth.users)
- `item_name` (String)
- `point` (Integer)
- `created_at` (Timestamp)

#### `stack`

- `id` (Primary Key)
- `user_id` (Foreign Key to auth.users)
- `name` (String)
- `description` (String)
- `tool` (String)

## Authentication

### Anonymous Authentication

- Users can sign in anonymously via Supabase
- Login button triggers `signInAnonymously()`
- No automatic sign-in on page load
- Session stored in Supabase Auth
- Access token managed in AppContext

### Session Management

- Session checked on component mount
- Auth state changes trigger UI updates
- User info displayed in sidebar:
  - Anonymous users: "Guest User"
  - Authenticated users: Name/Email

## Key Components

### `usePointBalance` Hook

**Location**: `src/hooks/usePointBalance.tsx`

**Features**:

- Fetches user's point balance from `accumulated_point_balance` table
- Creates balance record if none exists (defaults to 0)
- Updates balance with optimistic UI updates
- Handles duplicate records (keeps first record, deletes duplicates)
- Returns: `pointBalance`, `pointBalanceLoading`, `updateBalance`, `refetch`

**Usage**:

```typescript
const { pointBalance, updateBalance, refetchBalance } = useAppContext();
```

### `useRewards` Hook

**Location**: `src/hooks/useRewards.tsx`

**Features**:

- Fetches reward configuration from `rewards` table
- Returns: `dailyReward`, `shareStackReward`, `topToolReward`, `referralReward`

### `DailyStreak` Component

**Location**: `src/components/rewards/DailyStreak.tsx`

**Features**:

- Fetches last 7 days of claims for authenticated user
- Handles duplicate claims (keeps oldest per date)
- Calculates current streak
- Visual week display with claimed days highlighted
- Claim button disabled if already claimed today
- Success modal on claim

**Key Logic**:

- Checks for existing claim before inserting
- Uses `upsert` for claim insertion
- Handles duplicate key errors gracefully
- Refetches claims after successful claim

### `ReferAndEarn` Component

**Location**: `src/components/rewards/ReferAndEarn.tsx`

**Features**:

- Generates referral code from user ID (first 8 chars)
- Stores code in `referral_codes` table
- Creates referral link: `localhost:5173/?ref=CODE`
- Processes referral from URL parameters
- Prevents duplicate referrals
- Awards points to referrer
- Displays referral count and points earned
- Copy to clipboard functionality
- Social media sharing buttons

**Referral Flow**:

1. User visits with `?ref=CODE` in URL
2. Component checks if user already has referral
3. Looks up referrer by code
4. Inserts referral record
5. Awards points to referrer

### `TopToolClaimModal` Component

**Location**: `src/components/rewards/TopToolClaimModal.tsx`

**Features**:

- Email validation (format check)
- File upload (screenshot requirement)
- Checks for existing claims before submission
- Creates claim record in `top_tool_claims` table
- Awards points on successful submission
- Portal rendering for proper z-index handling
- Body scroll lock when open

**Validation**:

- Email: Required, valid format
- File: Required, image type

### `ShareStack` Component

**Location**: `src/components/rewards/ShareStack.tsx`

**Features**:

- Fetches user's stacks from `stack` table
- Shows `NoStackModal` if no stacks exist
- Shows `StackAvailModal` if stacks exist
- Saves stacks to AppContext for sharing
- Opens `ShareOptionModal` for sharing options

### `AppContext` (Global State)

**Location**: `src/context/AppContext.tsx`

**State Provided**:

- `openSidebar`: Sidebar visibility
- `activeItem`: Active navigation item
- `session`: Auth session token
- `stacks`: User's tech stacks
- `pointBalance`: Current point balance
- `pointBalanceLoading`: Loading state
- `updateBalance`: Function to update balance
- `refetchBalance`: Function to refetch balance

## State Management

### Context API

- Global state managed via React Context
- `AppProvider` wraps entire application
- `useAppContext` hook for accessing context

### Local State

- Component-specific state managed with `useState`
- Modal open/close states
- Form inputs
- Loading states

### Supabase Integration

- Real-time data fetching
- Optimistic updates for better UX
- Error handling with toast notifications

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flowva-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_FLOWVAHUB_SUPABASE_URL=your_supabase_url
   VITE_FLOWVAHUB_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**

   - Create the tables as described in [Database Schema](#database-schema)
   - Set up Row Level Security (RLS) policies
   - Enable anonymous authentication in Supabase Auth settings

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Environment Variables

| Variable                      | Description                 | Required |
| ----------------------------- | --------------------------- | -------- |
| `VITE_FLOWVAHUB_SUPABASE_URL` | Your Supabase project URL   | Yes      |
| `VITE_FLOWVAHUB_ANON_KEY`     | Your Supabase anonymous key | Yes      |

## Key Features Implementation Details

### Duplicate Prevention

- **Point Balance**: Application-level duplicate handling (keeps oldest record)
- **Daily Claims**: User-scoped duplicate prevention per date
- **Referrals**: Prevents same user from being referred twice
- **Top Tool Claims**: One claim per user

### Data Integrity

- All database operations are user-scoped (`user_id` filtering)
- Optimistic UI updates with rollback on error
- Automatic cleanup of duplicate records
- Error handling with user-friendly toast notifications

### UI/UX Features

- Responsive design with Tailwind CSS
- Loading states and skeletons
- Success/error notifications via React Toastify
- Modal system with portal rendering
- Progress bars for milestone tracking
- Social media sharing integration

### Performance Optimizations

- `useCallback` for event handlers
- `useMemo` where appropriate
- Optimistic updates for instant feedback
- Efficient database queries with proper indexing

## Future Enhancements

- [ ] Real-time balance updates via Supabase Realtime
- [ ] Email notifications for rewards
- [ ] Leaderboard system
- [ ] Achievement badges
- [ ] Point transaction history
- [ ] Admin dashboard for reward management
- [ ] Multi-language support
- [ ] Dark mode theme

## Notes

- The application uses anonymous authentication by default
- All rewards are configurable via the `rewards` table
- Referral links use `localhost:5173` (update for production)
- File uploads in TopToolClaimModal are validated but not yet uploaded to storage
- The application handles duplicate data gracefully with automatic cleanup
