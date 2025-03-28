import { supabase } from '../utils/supabaseClient';

export const fetchShiftData = async () => {
	const { data, error } = await supabase.from('shifts').select('*');
	if (error) throw error;
	return data;
};
