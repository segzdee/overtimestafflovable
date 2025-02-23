
# Supabase Integration

This directory contains the core integration with Supabase for authentication, database operations, and real-time subscriptions.

## Directory Structure

```
lib/
├── auth/
│   └── AuthProvider.tsx      # Authentication context and hooks
├── supabase/
│   ├── client.ts            # Supabase client configuration
│   ├── types.ts            # TypeScript interfaces for database entities
│   ├── queries.ts          # Database queries and mutations
│   ├── hooks.ts           # Custom React hooks for data management
│   └── SupabaseProvider.tsx # Supabase context provider
└── utils/
    └── validation.ts       # Input validation utilities
```

## Usage

### Authentication

```typescript
import { useAuth } from '@/lib/auth/AuthProvider';

function MyComponent() {
  const { user, signIn, signOut } = useAuth();
  
  // Use authentication methods
}
```

### Database Operations

```typescript
import { useSupabase } from '@/lib/supabase/SupabaseProvider';
import { getMarketUpdates } from '@/lib/supabase/queries';

function MyComponent() {
  const supabase = useSupabase();
  
  // Use Supabase client or imported queries
}
```

## Best Practices

1. Always use the provided hooks and utilities instead of direct Supabase client imports
2. Handle errors appropriately using try/catch blocks
3. Use TypeScript interfaces from `types.ts`
4. Implement proper loading and error states
5. Use the toast system for user feedback
