export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

// Add other helper functions as needed
