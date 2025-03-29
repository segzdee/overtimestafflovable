# OVERTIMESTAFF Implementation Guide

This guide outlines the implementation details for the OVERTIMESTAFF platform, focusing on the proper navigation flow and page structure.

## Homepage Structure

The homepage has been implemented with sections in the following order:

1. **TopNav**: Navigation bar with proper redirection
2. **Hero Section**: Main call-to-action area
3. **Account Type Cards**: User role selection
4. **Live Market Preview**: Real-time shift availability
5. **How It Works**: Platform features explanation
6. **Footer**: Site links and information

## Navigation Flow

### TopNav Component
- **"Find Extra Shifts"** button redirects users to the Live Market page
- **"Find Extra Staff"** button takes users to the Staff Availability page
- Users remain as buttons rather than links to ensure proper navigation handling

### Hero Section
- **"Sign Up Free"** button directs to the registration page
- **"Explore Available Shifts"** button leads to the Live Market page

## Authentication Handling

### Live Market Page
- Users can view available shifts without logging in
- Applying for shifts requires authentication
- Unauthenticated users are redirected to login with a return URL
- After login, users are returned to complete their application

### Staff Availability Page
- Users can browse and search for staff without logging in
- Contacting staff members requires authentication
- Proper redirects are in place for login with return URLs

## Staff Availability Implementation

The Staff Availability page has been implemented with:

1. **Search and filtering**:
   - Name and position search
   - Position type filtering
   - Availability status filtering
   - Distance/radius filtering

2. **Mock data**:
   - Uses placeholder staff data until real staff registration is implemented
   - Simulates staff within a specific radius
   - Includes realistic attributes like ratings, verification status, and hourly rates

3. **Authentication gates**:
   - View Profile: Available to all users
   - Contact Staff: Only available to authenticated users
   - Clear visual indicators for login requirements

## Development Mode

Development mode is now properly restricted:

1. **Protected Route**: Only available at `/dev-admin`
2. **Domain Restriction**: Only accessible on approved development URLs
3. **Password Protection**: Requires developer authentication
4. **Role Simulation**: Allows testing different user perspectives

## Implementation Details

### Components Structure
```
src/
├── components/
│   ├── dev/
│   │   ├── DevModeBanner.tsx
│   │   └── DevModeController.tsx
│   ├── home/
│   │   ├── AccountTypeCard.tsx
│   │   └── FeatureCard.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── MobileNav.tsx
│   │   └── TopNav.tsx
│   ├── market/
│   │   └── ShiftCard.tsx
│   ├── staff/
│   │   └── StaffCard.tsx
│   └── ui/
│       └── button.tsx
├── contexts/
│   ├── auth/
│   │   └── AuthContext.tsx
│   └── dev/
│       └── DevModeContext.tsx
└── pages/
    ├── dev-admin/
    │   └── index.tsx
    ├── find-shifts.tsx
    ├── find-staff/
    │   └── index.tsx
    ├── home/
    │   └── index.tsx
    ├── live-market/
    │   └── index.tsx
    └── App.tsx
```

### Page Relationships
- **find-shifts.tsx** -> Redirects to live-market/index.tsx
- **TopNav "Find Extra Shifts"** -> Navigates to live-market/index.tsx
- **TopNav "Find Extra Staff"** -> Navigates to find-staff/index.tsx
- **Hero "Sign Up Free"** -> Navigates to registration page
- **Hero "Explore Available Shifts"** -> Navigates to live-market/index.tsx

## Authentication Flow

1. User attempts to apply for a shift or contact staff
2. System checks authentication status
3. If authenticated, the user proceeds to the application or contact form
4. If not authenticated, user is redirected to login page with a return URL stored in state
5. After successful login, user is automatically redirected back to complete their action

## Mock Data Implementation

Until real data is available from the backend:

1. **Live Market Data**:
   - Pre-populated with realistic shift examples
   - Various priority levels (SWAP, PREMIUM, URGENT)
   - Different experience requirements
   - Location and hourly rate information

2. **Staff Availability Data**:
   - Simulated staff profiles with diverse positions
   - Realistic distance calculations
   - Availability statuses (Available Now, Available Today, Available Tomorrow)
   - Verification badges and ratings

## Visual Design Consistency

1. **Branding**:
   - Purple color for "STAFF" in the logo
   - Green for primary call-to-action buttons
   - Purple for secondary actions

2. **Card Styling**:
   - White backgrounds with subtle shadows for content cards
   - Dark background for the Live Market section
   - Consistent spacing and rounded corners

3. **Typography**:
   - Consistent heading scales
   - Readable body text
   - Proper hierarchy with font weights

## Next Implementation Steps

1. **Backend Integration**:
   - Replace mock data with API calls
   - Implement real authentication flow
   - Set up WebSocket connections for real-time updates

2. **User Management**:
   - Complete registration and login screens
   - Implement profile management
   - Build user dashboards for each role

3. **Shift Management**:
   - Create shift posting interface
   - Develop shift application process
   - Implement shift status tracking

4. **Staff Management**:
   - Build staff registration process
   - Implement verification system
   - Create availability management

5. **AI Features**:
   - Implement matching algorithms
   - Develop recommendation engine
   - Build automated scheduling

## Testing Guidelines

1. **Navigation Flow Testing**:
   - Verify all navigation paths work as expected
   - Test authentication redirects with return URLs
   - Check mobile navigation behavior

2. **Authentication Testing**:
   - Verify protected actions require login
   - Test login flow with return to original action
   - Confirm that unauthenticated users can still browse content

3. **Responsive Testing**:
   - Test all pages on mobile, tablet, and desktop
   - Verify proper stacking and layout changes
   - Ensure touch targets are appropriately sized

4. **Filter Testing**:
   - Test all combinations of filters
   - Verify search functionality works as expected
   - Check edge cases with no results

5. **Performance Testing**:
   - Monitor initial page load times
   - Test filter response times with large data sets
   - Ensure smooth animations and transitions

This implementation guide provides a comprehensive overview of the OVERTIMESTAFF platform architecture, focusing on the proper navigation flow, authentication handling, and component structure to ensure a consistent and user-friendly experience.
