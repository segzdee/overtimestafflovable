
// Mock Supabase client for development
export const supabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      order: (column: string, { ascending }: { ascending: boolean }) => ({
        then: (callback: (result: any) => void) => {
          callback({ data: [], error: null });
          return { data: [], error: null };
        },
      }),
    }),
  }),
  functions: {
    invoke: (name: string, options?: { body?: any }) => {
      return Promise.resolve({ data: null, error: null });
    },
  },
};
