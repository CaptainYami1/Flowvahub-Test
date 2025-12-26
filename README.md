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
- Creates referral link: `site link/?ref=CODE`
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

- **Node.js**: v18 or higher (check with `node --version`)
- **Package Manager**: npm (comes with Node.js) or yarn
- **Supabase Account**: Free account at [supabase.com](https://supabase.com)
- **Git**: For cloning the repository

### Step 1: Clone and Install

1. **Clone the repository**

   ```bash
   git clone https://github.com/CaptainYami1/Flowvahub-Test.git
   cd flowva-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages listed in `package.json`.

### Step 2: Supabase Project Setup

1. **Create a new Supabase project**

   - Go to [app.supabase.com](https://app.supabase.com)
   - Click "New Project"
   - Fill in project details (name, database password, region)
   - Wait for project to be provisioned (2-3 minutes)

2. **Get your Supabase credentials**
   - Go to Project Settings → API
   - Copy your **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - Copy your **anon/public key** (starts with `eyJ...`)

### Step 3: Environment Variables

1. **Create `.env` file** in the project root directory:

   ```bash
   touch .env
   ```

2. **Add your Supabase credentials** to `.env`:

   ```env
   VITE_FLOWVAHUB_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_FLOWVAHUB_ANON_KEY=************************...
   ```

3. **Verify the file** (make sure `.env` is in `.gitignore` to avoid committing secrets)

### Step 4: Database Setup

1. **Enable Anonymous Authentication**

   - Go to Authentication → Providers in Supabase dashboard
   - Enable "Anonymous" provider
   - Save changes

2. **Create Database Tables**

   Open the SQL Editor in Supabase and run the following SQL:

   ```sql
   -- Create accumulated_point_balance table
   CREATE TABLE accumulated_point_balance (
     id BIGSERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     balance INTEGER DEFAULT 0 NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create claim_days table
   CREATE TABLE claim_days (
     id BIGSERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     claim_date DATE NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create referral_codes table
   CREATE TABLE referral_codes (
     id BIGSERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
     code VARCHAR(8) NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create referrals table
   CREATE TABLE referrals (
     id BIGSERIAL PRIMARY KEY,
     referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     referral_code VARCHAR(8) NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create top_tool_claims table
   CREATE TABLE top_tool_claims (
     id BIGSERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     email VARCHAR(255) NOT NULL,
     status VARCHAR(50) DEFAULT 'pending',
     screenshot_filename VARCHAR(255),
     file_size INTEGER,
     file_type VARCHAR(100),
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create rewards table (configuration)
   CREATE TABLE rewards (
     id BIGSERIAL PRIMARY KEY,
     daily_reward INTEGER DEFAULT 5,
     share_stack_reward INTEGER DEFAULT 25,
     top_tool_reward INTEGER DEFAULT 25,
     referal_reward INTEGER DEFAULT 25,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Insert default rewards configuration
   INSERT INTO rewards (daily_reward, share_stack_reward, top_tool_reward, referal_reward)
   VALUES (5, 25, 25, 25);

   -- Create redeemables table
   CREATE TABLE redeemables (
     id BIGSERIAL PRIMARY KEY,
     icon VARCHAR(50) NOT NULL,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     points INTEGER NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create redeemed table (redemption history)
   CREATE TABLE redeemed (
     id BIGSERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     item_name VARCHAR(255) NOT NULL,
     point INTEGER NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Create stack table
   CREATE TABLE stack (
     id BIGSERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     tool VARCHAR(255) NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

3. **Set up Row Level Security (RLS) Policies**

   Enable RLS and create policies to allow users to access only their own data:

   ```sql
   -- Enable RLS on all tables
   ALTER TABLE accumulated_point_balance ENABLE ROW LEVEL SECURITY;
   ALTER TABLE claim_days ENABLE ROW LEVEL SECURITY;
   ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
   ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
   ALTER TABLE top_tool_claims ENABLE ROW LEVEL SECURITY;
   ALTER TABLE redeemables ENABLE ROW LEVEL SECURITY;
   ALTER TABLE redeemed ENABLE ROW LEVEL SECURITY;
   ALTER TABLE stack ENABLE ROW LEVEL SECURITY;

   -- Policy: Users can read/write their own point balance
   CREATE POLICY "Users can manage own balance"
     ON accumulated_point_balance
     FOR ALL
     USING (auth.uid() = user_id);

   -- Policy: Users can read/write their own claims
   CREATE POLICY "Users can manage own claims"
     ON claim_days
     FOR ALL
     USING (auth.uid() = user_id);

   -- Policy: Users can read/write their own referral code
   CREATE POLICY "Users can manage own referral code"
     ON referral_codes
     FOR ALL
     USING (auth.uid() = user_id);

   -- Policy: Users can read referrals where they are referrer or referred
   CREATE POLICY "Users can view related referrals"
     ON referrals
     FOR SELECT
     USING (auth.uid() = referrer_id OR auth.uid() = user_id);

   -- Policy: Anyone can insert referrals (for referral processing)
   CREATE POLICY "Anyone can create referrals"
     ON referrals
     FOR INSERT
     WITH CHECK (true);

   -- Policy: Users can manage their own top tool claims
   CREATE POLICY "Users can manage own top tool claims"
     ON top_tool_claims
     FOR ALL
     USING (auth.uid() = user_id);

   -- Policy: Everyone can read rewards config (public)
   CREATE POLICY "Rewards are public"
     ON rewards
     FOR SELECT
     USING (true);

   -- Policy: Everyone can read redeemables (public)
   CREATE POLICY "Redeemables are public"
     ON redeemables
     FOR SELECT
     USING (true);

   -- Policy: Users can manage their own redemptions
   CREATE POLICY "Users can manage own redemptions"
     ON redeemed
     FOR ALL
     USING (auth.uid() = user_id);

   -- Policy: Users can manage their own stacks
   CREATE POLICY "Users can manage own stacks"
     ON stack
     FOR ALL
     USING (auth.uid() = user_id);
   ```

4. **Create Indexes for Performance** (Optional but recommended)

   ```sql
   -- Indexes for faster queries
   CREATE INDEX idx_balance_user_id ON accumulated_point_balance(user_id);
   CREATE INDEX idx_claims_user_date ON claim_days(user_id, claim_date);
   CREATE INDEX idx_referral_code ON referral_codes(code);
   CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
   CREATE INDEX idx_referrals_user ON referrals(user_id);
   CREATE INDEX idx_top_tool_user ON top_tool_claims(user_id);
   CREATE INDEX idx_redeemed_user ON redeemed(user_id);
   CREATE INDEX idx_stack_user ON stack(user_id);
   ```

### Step 5: Verify Setup

1. **Check environment variables are loaded**

   - Restart your development server if it's running
   - Check browser console for any Supabase connection errors

2. **Test anonymous authentication**

   - Open the app in browser
   - Click "Login" button in sidebar
   - Verify you're logged in as "Guest User"

3. **Test database connection**
   - Try claiming a daily reward
   - Check Supabase dashboard → Table Editor to see if data is inserted

### Step 6: Run the Application

1. **Start development server**

   ```bash
   npm run dev
   ```

2. **Open in browser**

   - The app will typically run on `https://flowvahub-test.vercel.app/`
   - Check the terminal output for the exact URL

3. **Build for production** (when ready)
   ```bash
   npm run build
   ```
   The built files will be in the `dist/` directory.

### Troubleshooting

**Issue: "Failed to fetch" errors**

- Check that your `.env` file has correct Supabase URL and key
- Verify Supabase project is active (not paused)
- Check browser console for specific error messages

**Issue: "Row Level Security policy violation"**

- Verify RLS policies are created correctly
- Check that anonymous authentication is enabled
- Ensure user is authenticated before making requests

**Issue: "Table does not exist"**

- Verify all tables are created in Supabase SQL Editor
- Check table names match exactly (case-sensitive)
- Refresh Supabase dashboard

**Issue: Balance not updating**

- Check browser console for errors
- Verify `accumulated_point_balance` table has RLS policies
- Check that user is authenticated (not null user_id)

## Environment Variables

| Variable                      | Description                 | Required |
| ----------------------------- | --------------------------- | -------- |
| `VITE_FLOWVAHUB_SUPABASE_URL` | Supabase project URL        | Yes      |
| `VITE_FLOWVAHUB_ANON_KEY`     |  Supabase anonymous key     | Yes      |

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

## Assumptions and Trade-offs

### Assumptions

1. **Anonymous Authentication is Sufficient**

   - **Assumption**: Since i was asked to create only the rewardhub and authentication is essential, i decided to use the anonymous autentication provided by supabase
   - **Rationale**: Lowers barrier to entry, allows immediate engagement
   - **Trade-off/limitation**: Limited user identification, cant to recover accounts

2. **Application-Level Duplicate Prevention**

   - **Assumption**: Database constraints may not be sufficient, application handles duplicates
   - **Rationale**: More flexible error handling, better user experience
   - **Trade-off**: Additional application logic, potential race conditions

3. **Optimistic UI Updates**

   - **Assumption**: Most database operations will succeed
   - **Rationale**: Better perceived performance, instant feedback
   - **Trade-off**: Needed rollback logic, potential UI/data inconsistency

4. **Single Balance Record Per User**

   - **Assumption**: Users should have one balance record (oldest kept, duplicates deleted)
   - **Rationale**: Simpler queries, consistent data model
   - **Trade-off**: Requires cleanup logic, potential data loss if not handled correctly

5. **Referral Links Use site link**

   - **Assumption**: Development environment uses site link
   - **Rationale**: Quick development setup
   - **Trade-off**: Must update for production deployment

6. **Rewards Configuration in Database**

   - **Assumption**: Reward amounts should be configurable without code changes
   - **Rationale**: Business flexibility, easier A/B testing
   - **Trade-off**: Additional database query on app load

7. **No File Storage for Screenshots**

   - **Assumption**: File uploads are validated but not stored (metadata only)
   - **Rationale**: Simplified implementation, reduces storage costs
   - **Trade-off**: Cannot verify claims later, manual verification required

8. **Share Stack Rewards Implementation**
   - **Assumption**: Points are awarded immediately on share (as implemented)
   - **Rationale**: Immediate gratification, simpler flow
   - **Trade-off**: Potential for abuse if not properly validated (note: main site may not reward to avoid loopholes)

### Trade-offs Made

1. **Performance vs. Data Consistency**

   - **Choice**: Optimistic updates with eventual consistency
   - **Benefit**: Fast UI response
   - **Cost**: Potential brief inconsistencies, need for refetch logic

2. **Simplicity vs. Robustness**

   - **Choice**: Application-level duplicate handling instead of strict DB constraints
   - **Benefit**: More user-friendly error messages
   - **Cost**: More complex code, potential edge cases

3. **Development Speed vs. Production Readiness**

   - **Choice**: site link URLs, no file storage, basic validation
   - **Benefit**: Faster development iteration
   - **Cost**: Requires updates before production deployment

4. **User Experience vs. Security**

   - **Choice**: Anonymous auth for easy access
   - **Benefit**: No signup friction
   - **Cost**: Limited account recovery, potential abuse

5. **Code Simplicity vs. Feature Completeness**

   - **Choice**: Basic referral system without advanced tracking
   - **Benefit**: Easier to maintain
   - **Cost**: Limited analytics, no referral tiers

6. **State Management: Context API vs. Redux**

   - **Choice**: React Context for global state
   - **Benefit**: Simpler setup, no additional dependencies
   - **Cost**: Potential performance issues with frequent updates, less tooling

7. **Database: Application Logic vs. Database Functions**
   - **Choice**: Business logic in application code
   - **Benefit**: Easier debugging, version control
   - **Cost**: More network roundtrips, less database-level optimization

### Recommendations for Production

1. **Update Referral Links**: (https://flowvahub-test.vercel.app/${referral_code})
2. **Implement File Storage**: Use Supabase Storage for screenshot uploads
3. **Add Email Authentication**: Provide option for users to link email to anonymous accounts
4. **Add Rate Limiting**: Prevent abuse of reward claims
5. **Implement Transaction Logs**: Track all point changes for audit trail
6. **Add Database Constraints**: Use unique constraints at DB level as backup
7. **Implement Real-time Updates**: Use Supabase Realtime for live balance updates
8. **Add Validation**: Server-side validation for all reward claims
9. **Security**: Review and tighten RLS policies
10. **Monitoring**: Add error tracking and analytics

## Notes

- The application uses anonymous authentication by default
- All rewards are configurable via the `rewards` table
- Referral links use (https://flowvahub-test.vercel.app/) 
- File uploads in TopToolClaimModal are validated but not yet uploaded to storage
- The application handles duplicate data gracefully with automatic cleanup
- Share stack rewards are implemented to award points immediately (main site may not do this to avoid loopholes - consider validation in production)
