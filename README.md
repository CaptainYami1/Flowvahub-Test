# Flowva Test - Rewards Hub Application

A modern React-based rewards and gamification platform built with TypeScript, Vite, and Supabase. This application provides users with a comprehensive rewards system where they can earn points through various activities and redeem them for rewards.

## 🚀 Features

### Core Functionality

#### 1. **Point Balance System**

- Real-time point balance tracking
- User-scoped balance management (each user has their own balance)
- Automatic balance updates with optimistic UI updates
- Balance is only created when user updates it (not on fetch)
- Uses first (oldest) record only - prevents duplicate records
- Automatic duplicate cleanup and consolidation
- Auth state synchronization (refetches on login/logout)
- Point deduction when redeeming rewards
- Balance updates immediately in UI without page reload

#### 2. **Daily Streak Tracking**

- 7-day streak visualization
- User-scoped daily claims (each user has their own streak)
- Daily claim functionality with point rewards
- Streak calculation based on consecutive days
- Visual indicators for claimed days and today's status
- Success modal after claiming daily rewards
- Prevents duplicate claims for the same day
- Uses first (oldest) record per date - prevents duplicates
- Automatic duplicate cleanup
- Auth state synchronization (refetches on login/logout)
- Resets daily claims when balance is reset to 0

#### 3. **Rewards Hub**

The main hub is divided into two main sections:

##### **Earn Points Tab**

- **Your Rewards Journey Section:**

  - Point Balance Card: Displays current accumulated points
  - Daily Streak Card: Track and claim daily rewards
  - Top Tool Spotlight: Featured tool promotion with sign-up rewards

- **Earn More Points Section:**

  - Refer and Win: Contest promotion (10,000 points for top 5 winners)
  - Share Your Stack: Earn points by sharing your tech stack

- **Refer & Earn Section:**
  - Personal referral link generation (first 8 characters of user ID)
  - Referral code stored in `referral_codes` table
  - Automatic referral processing when users visit with `?ref={code}` parameter
  - Referral tracking in `referrals` table
  - Referral statistics tracking (count and points earned)
  - Social media sharing buttons (Facebook, Twitter/X, LinkedIn, WhatsApp)
  - Copy-to-clipboard functionality for referral links
  - Prevents duplicate referral processing

##### **Redeem Rewards Tab**

- Filterable reward categories:
  - All Rewards
  - Unlocked (affordable rewards)
  - Locked (requires more points)
  - Coming Soon (upcoming rewards)
- Reward cards with:
  - Icon display
  - Name and description
  - Point cost
  - Redeem button (disabled for locked/coming soon items)
- Real-time balance validation
- Loading skeletons during data fetch
- Success/error toast notifications

#### 4. **Share Stack Feature**

- Share your tech stack to earn points
- Fetches stacks from database on "Share" button click
- Modal notification when no stack is available (`NoStackModal`)
- Stack list modal when stacks are available (`StackAvailModal`)
- Share options modal with social media sharing (`ShareOptionModal`)
- Stacks stored in AppContext for global access
- User-scoped stack data (only shows user's own stacks)

#### 5. **Top Tool Spotlight**

- Featured tool promotion (currently Reclaim.ai)
- Sign-up and claim buttons
- Gradient card design with featured badge
- **Top Tool Claim Modal**:
  - Email validation (Reclaim sign-up email)
  - File upload validation (screenshot requirement)
  - Checks if user has already claimed (prevents duplicates)
  - Creates proof of claim in database (`top_tool_claims` table)
  - Automatically awards points after successful claim submission
  - Status tracking (pending, verified, rejected)

### Technical Features

#### **Real-time Data Synchronization**

- Supabase real-time subscriptions for point balance updates
- Automatic data refresh mechanisms
- Optimistic UI updates

#### **Responsive Design**

- Mobile-first approach
- Responsive sidebar navigation
- Adaptive grid layouts
- Mobile hamburger menu with overlay

#### **User Interface Components**

- Custom card components with multiple variants (shadow, border, redeemable)
- Tab navigation system
- Modal dialogs with portal rendering (prevents flickering)
- Proper z-index stacking for nested modals
- Toast notifications
- Loading skeletons
- Progress indicators
- Custom buttons with variants
- Custom font system (`font-ui` class for system fonts)

#### **Authentication System**

- Anonymous authentication via Supabase
- Login button in sidebar (triggers anonymous login)
- Conditional rendering based on auth state
- User information display (name, email, avatar initial)
- Auth state synchronization across components
- Automatic data refresh on login/logout

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.11.0** - Client-side routing
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Lucide React 0.562.0** - Icon library
- **React Toastify 11.0.5** - Toast notifications
- **clsx & tailwind-merge** - Conditional class utilities

### Backend & Database

- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Real-time subscriptions
  - RESTful API

### Development Tools

- **ESLint 9.39.1** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite React Plugin** - React support for Vite

## 📁 Project Structure

```
src/
├── assets/
│   └── logos/              # Application logos
├── components/
│   ├── icons/              # Custom icon components
│   ├── Layout/
│   │   ├── AppLayout.tsx   # Main application layout
│   │   └── AppSidebar.tsx  # Sidebar navigation component
│   ├── rewards/
│   │   ├── DailyClaimSuccessModal.tsx
│   │   ├── DailyStreak.tsx
│   │   ├── NoStackModal.tsx
│   │   ├── PointBalanceCard.tsx
│   │   ├── Redeemables.tsx
│   │   ├── ReferAndEarn.tsx
│   │   ├── ReferAndWin.tsx
│   │   ├── ShareStack.tsx
│   │   ├── ShareOptionModal.tsx
│   │   ├── StackAvailModal.tsx
│   │   ├── TopSpotlightTool.tsx
│   │   └── TopToolClaimModal.tsx
│   └── ui/                 # Reusable UI components
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
│   └── AppContext.tsx      # Global application state
├── hooks/
│   ├── usePointBalance.tsx # Point balance management hook
│   └── useRewards.tsx      # Rewards data fetching hook
├── lib/
│   └── utils.ts           # Utility functions
├── pages/
│   └── RewardsHub/
│       ├── EarnPoint/
│       │   └── EarnPoint.tsx
│       ├── RedeemRewards/
│       │   └── RedeemRewards.tsx
│       └── RewardsHub.tsx
├── services/
│   ├── config.ts          # Supabase client configuration
│   └── pointBalance.ts    # Point balance service functions
├── App.tsx                # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## 🗄️ Database Schema

The application uses the following Supabase tables:

### `accumulated_point_balance`

- `id` (number): Primary key
- `user_id` (uuid): Foreign key to auth.users
- `balance` (number): Current point balance
- **Note**: Only the first (oldest) record per user is used and updated

### `claim_days`

- `id` (number): Primary key
- `user_id` (uuid): Foreign key to auth.users
- `claim_date` (string): Date of daily claim (ISO format)
- **Note**: Only the first (oldest) record per user per date is used

### `rewards`

- `daily_reward` (number): Points for daily claim
- `share_stack_reward` (number): Points for sharing stack
- `top_tool_reward` (number): Points for top tool signup
- `referal_reward` (number): Points for referral

### `redeemables`

- `id` (number): Primary key
- `icon` (string): Emoji or icon identifier
- `name` (string): Reward name
- `description` (string): Reward description
- `points` (number): Point cost (0 for coming soon)

### `redeemed`

- `id` (number): Primary key
- `user_id` (uuid): Foreign key to auth.users
- `item_name` (string): Name of redeemed item
- `point` (number): Points deducted

### `stack`

- `id` (number): Primary key
- `user_id` (uuid): Foreign key to auth.users
- `name` (string): Stack name
- `description` (string): Stack description
- `tool` (string): Tool name

### `top_tool_claims`

- `id` (number): Primary key
- `user_id` (uuid): Foreign key to auth.users (unique - one claim per user)
- `email` (string): Email used for tool signup
- `status` (string): Claim status ("pending", "verified", "rejected")
- `created_at` (timestamp): When the claim was submitted

### `referral_codes`

- `id` (number): Primary key
- `user_id` (uuid): Foreign key to auth.users (unique - one code per user)
- `code` (string): Referral code (first 8 characters of user ID)

### `referrals`

- `id` (number): Primary key
- `referrer_id` (uuid): Foreign key to auth.users (person who shared link)
- `user_id` (uuid): Foreign key to auth.users (person who clicked link)
- `referral_code` (string): The referral code used

## 🎨 UI/UX Features

### Design System

- **Color Scheme**: Purple/primary theme (#9013FE) with cyan accents (#70D6FF)
- **Typography**:
  - Default font: Roboto (applied to body)
  - UI font: System font stack (`ui-sans-serif, system-ui, sans-serif...`) via `.font-ui` class
  - Custom font family with semantic sizing
- **Spacing**: Consistent spacing system using Tailwind utilities
- **Components**: Reusable component library with variants

### User Experience

- Loading states with skeletons
- Error handling with toast notifications
- Success feedback with modals
- Disabled states for unavailable actions
- Responsive navigation
- Smooth transitions and animations

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd flowva-test
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
VITE_FLOWVAHUB_SUPABASE_URL=your_supabase_url
VITE_FLOWVAHUB_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
```

## 📝 Available Scripts

- `npm run dev` - Start development server

## 🔧 Configuration

### Vite Configuration

- React plugin enabled
- Tailwind CSS plugin enabled
- TypeScript support configured

### TypeScript Configuration

- Strict type checking enabled
- React JSX support
- Path aliases configured

### ESLint Configuration

- React hooks rules enabled
- React refresh plugin
- TypeScript ESLint integration

## 🎯 Key Features Implementation

### Authentication & User Management

- Anonymous authentication via Supabase
- Login button in sidebar triggers anonymous login
- Conditional UI rendering based on auth state
- User information display (name, email, avatar initial)
- Auth state synchronization across all components
- All database operations are user-scoped via `user_id` filtering

### Data Integrity & Duplicate Prevention

- **Point Balance**: Uses first (oldest) record only, automatic duplicate cleanup
- **Daily Claims**: Uses first (oldest) record per date, automatic duplicate cleanup
- **Top Tool Claims**: One claim per user (enforced by database check)
- **Referrals**: Prevents duplicate referral processing per user
- All operations filter by `user_id` to ensure data isolation

### Modal System

- Portal-based rendering (prevents flickering)
- Proper z-index stacking for nested modals
- Body scroll prevention
- Click-outside-to-close functionality
- Proper cleanup on unmount

### Real-time Point Balance

- User-scoped balance (each user has their own balance)
- Uses first (oldest) record only - prevents duplicates
- Automatic duplicate cleanup
- Balance only created when user updates it (not on fetch)
- Optimistic UI updates for instant feedback
- Automatic refetch after successful updates
- Auth state synchronization (refetches on login/logout)

### Daily Streak System

- User-scoped daily claims (each user has their own streak)
- Tracks last 7 days of claims
- Uses first (oldest) record per date - prevents duplicates
- Automatic duplicate cleanup
- Calculates consecutive streak
- Prevents duplicate daily claims
- Visual calendar representation
- Auth state synchronization
- Resets when balance is reset to 0

### Reward Redemption

- User-scoped redemption tracking
- Balance validation before redemption
- Automatic point deduction
- Transaction logging to `redeemed` table with `user_id`
- Filterable by availability status

### Referral System

- Personal referral code generation (first 8 characters of user ID)
- Referral code stored in `referral_codes` table
- Automatic referral processing on page load with `?ref={code}` parameter
- Prevents duplicate referral processing
- Creates referral record in `referrals` table
- Social media sharing integration
- Referral statistics display
- Copy-to-clipboard functionality

### Top Tool Claim System

- Email and file upload validation
- Checks for existing claims (prevents duplicates)
- Creates proof of claim in `top_tool_claims` table
- Status tracking (pending, verified, rejected)
- Automatically awards points after successful submission
- User-scoped (one claim per user)

### Share Stack System

- Fetches user's stacks on "Share" button click
- Stores stacks in AppContext for global access
- Modal flow: NoStackModal → StackAvailModal → ShareOptionModal
- User-scoped stack data
- Social media sharing options

## 🔐 Environment Variables

Required environment variables:

- `VITE_FLOWVAHUB_SUPABASE_URL` - Supabase project URL
- `VITE_FLOWVAHUB_ANON_KEY` - Supabase anonymous key

## 📱 Responsive Design

- **Mobile**: Hamburger menu, single column layouts
- **Tablet**: Adaptive grid layouts
- **Desktop**: Full sidebar, multi-column grids

## 🎨 Component Library

### Reusable Components

- **Card**: Multiple variants (shadow, border, redeemable)
- **Button**: Primary, secondary, tertiary, disabled variants
- **Modal**: Reusable modal dialog with portal rendering
  - Prevents flickering with proper z-index stacking
  - Supports nested modals
  - Body scroll prevention
- **Tab**: Tab navigation component
- **Skeleton**: Loading state component
- **Header**: Page header with title and description
- **Subheading**: Section subheading component
- **Progress**: Progress bar component for milestone tracking

## 🔄 State Management

- **React Context API**: Global app state
  - Sidebar open/close state
  - Active navigation item
  - User session/access token
  - Stacks data (for sharing functionality)
- **Custom Hooks**:
  - `usePointBalance`: Point balance state and operations
    - Fetches balance for authenticated user only
    - Updates only the first (oldest) balance record
    - Optimistic UI updates
    - Automatic refetch after updates
    - Auth state synchronization
  - `useRewards`: Rewards configuration fetching
- **Local State**: Component-level state with React hooks

## 🚀 Future Enhancements

Potential areas for expansion:

- Full user authentication (email/password, OAuth)
- User profiles and settings
- Reward history and transaction logs
- Leaderboards
- Achievement badges
- Notification system
- Analytics dashboard
- File upload to Supabase Storage for top tool claims
- Email verification for top tool claims
- Referral reward distribution improvements

## 📄 License

This project is private and proprietary.

## 👥 Development

Built with modern React patterns and best practices:

- Functional components with hooks
- TypeScript for type safety
- Component composition
- Custom hooks for reusable logic
- Service layer for API interactions
- User-scoped data architecture
- Duplicate prevention and data integrity
- Optimistic UI updates
- Portal-based modal rendering
- Auth state synchronization

---

**Note**: This application requires a Supabase backend with the appropriate database tables and schema as described above.
