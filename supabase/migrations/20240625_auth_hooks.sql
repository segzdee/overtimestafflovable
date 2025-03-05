
-- Create table for tracking registration attempts
CREATE TABLE IF NOT EXISTS public.registration_attempts (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  attempt_timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  success BOOLEAN DEFAULT false,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create table for tracking registration backups for offline support
CREATE TABLE IF NOT EXISTS public.registration_backups (
  id SERIAL PRIMARY KEY,
  user_data JSONB NOT NULL,
  attempts INTEGER DEFAULT 0,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create table for auth diagnostics
CREATE TABLE IF NOT EXISTS public.auth_diagnostics (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create function to update registration error stats
CREATE OR REPLACE FUNCTION public.update_registration_error_stats(
  p_error_message TEXT,
  p_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
)
RETURNS VOID AS $$
BEGIN
  -- This function could be expanded to aggregate error stats
  -- For now it's a placeholder that could be used for analytics
  INSERT INTO public.error_stats (
    error_type, 
    error_message, 
    count, 
    last_occurrence
  ) 
  VALUES (
    'registration_error',
    p_error_message,
    1,
    p_timestamp
  )
  ON CONFLICT (error_type, error_message) 
  DO UPDATE SET
    count = error_stats.count + 1,
    last_occurrence = p_timestamp;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create error stats table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.error_stats (
  id SERIAL PRIMARY KEY,
  error_type TEXT NOT NULL,
  error_message TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  first_occurrence TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_occurrence TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(error_type, error_message)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS registration_attempts_email_idx ON public.registration_attempts(email);
CREATE INDEX IF NOT EXISTS registration_attempts_ip_address_idx ON public.registration_attempts(ip_address);
CREATE INDEX IF NOT EXISTS auth_diagnostics_user_id_idx ON public.auth_diagnostics(user_id);
CREATE INDEX IF NOT EXISTS auth_diagnostics_event_type_idx ON public.auth_diagnostics(event_type);

-- Add RLS policies
ALTER TABLE public.registration_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registration_backups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_stats ENABLE ROW LEVEL SECURITY;

-- Only admins can view registration attempts
CREATE POLICY "Only admins can view registration attempts"
  ON public.registration_attempts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can view registration backups
CREATE POLICY "Only admins can view registration backups"
  ON public.registration_backups
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Users can view their own auth diagnostics
CREATE POLICY "Users can view their own auth diagnostics"
  ON public.auth_diagnostics
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can view error stats
CREATE POLICY "Only admins can view error stats"
  ON public.error_stats
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
