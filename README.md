# Flowva Test - Rewards Hub Application

A modern React-based rewards and gamification platform built with TypeScript, Vite, and Supabase. This application provides users with a comprehensive rewards system where they can earn points through various activities and redeem them for rewards.

## 🚀 Features

### Core Functionality

#### 1. **Point Balance System**
- Real-time point balance tracking
- Automatic balance updates with Supabase real-time subscriptions
- Auto-refresh every 2 seconds for live updates
- Initial balance initialization if no record exists
- Point deduction when redeeming rewards

#### 2. **Daily Streak Tracking**
- 7-day streak visualization
- Daily claim functionality with point rewards
- Streak calculation based on consecutive days
- Visual indicators for claimed days and today's status
- Success modal after claiming daily rewards
- Prevents duplicate claims for the same day

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
  - Personal referral link generation
  - Referral statistics tracking
  - Social media sharing buttons (Facebook, Twitter/X, LinkedIn, WhatsApp)
  - Copy-to-clipboard functionality for referral links

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
- Modal notification when no stack is available
- Integration with stack database table

#### 5. **Top Tool Spotlight**
- Featured tool promotion (currently Reclaim.ai)
- Sign-up and claim buttons
- Gradient card design with featured badge

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
- Modal dialogs
- Toast notifications
- Loading skeletons
- Progress indicators
- Custom buttons with variants

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
│   │   └── TopSpotlightTool.tsx
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
- `balance` (number): Current point balance

### `claim_days`
- `claim_date` (string): Date of daily claim (ISO format)

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
- `item_name` (string): Name of redeemed item
- `point` (number): Points deducted

### `stack`
- `id` (number): Primary key
- `name` (string): Stack name
- `description` (string): Stack description
- `tool` (string): Tool name

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Purple/primary theme (#9013FE) with cyan accents (#70D6FF)
- **Typography**: Custom font family with semantic sizing
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

5. Build for production:
```bash
npm run build
```

6. Preview production build:
```bash
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

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

### Real-time Point Balance
- Uses Supabase real-time subscriptions
- Auto-refreshes every 2 seconds
- Optimistic updates for better UX

### Daily Streak System
- Tracks last 7 days of claims
- Calculates consecutive streak
- Prevents duplicate daily claims
- Visual calendar representation

### Reward Redemption
- Balance validation before redemption
- Automatic point deduction
- Transaction logging to `redeemed` table
- Filterable by availability status

### Referral System
- Personal referral link generation
- Social media sharing integration
- Referral statistics display
- Copy-to-clipboard functionality

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
- **Modal**: Reusable modal dialog
- **Tab**: Tab navigation component
- **Skeleton**: Loading state component
- **Header**: Page header with title and description
- **Subheading**: Section subheading component

## 🔄 State Management

- **React Context API**: Global app state (sidebar, active items)
- **Custom Hooks**: 
  - `usePointBalance`: Point balance state and operations
  - `useRewards`: Rewards configuration fetching
- **Local State**: Component-level state with React hooks

## 🚀 Future Enhancements

Potential areas for expansion:
- User authentication
- User profiles
- Reward history
- Leaderboards
- Achievement badges
- Notification system
- Analytics dashboard

## 📄 License

This project is private and proprietary.

## 👥 Development

Built with modern React patterns and best practices:
- Functional components with hooks
- TypeScript for type safety
- Component composition
- Custom hooks for reusable logic
- Service layer for API interactions

---

**Note**: This application requires a Supabase backend with the appropriate database tables and schema as described above.
