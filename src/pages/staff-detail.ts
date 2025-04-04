
import { mockStaffData } from '../data/mockStaffData';

/**
 * Retrieves a staff member by their ID.
 * @param id - The ID of the staff member.
 * @returns The staff member object or null if not found.
 */
export function getStaffById(id: number) {
    return mockStaffData.find(staff => staff.id === parseInt(id.toString(), 10)) || null;
}
