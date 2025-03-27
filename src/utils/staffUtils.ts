
import { mockStaffData, type StaffMember } from '../data/mockStaffData';

export type { StaffMember };

export const fetchStaffData = (): StaffMember[] => mockStaffData;

export const calculateReliabilityScore = (staffMember: StaffMember): number => {
  const { clientRating, reliability, cancellations, lateArrivals, swaps } = staffMember.ratings;
  const reliabilityScore = (
    (clientRating * 0.3) +
    (reliability * 0.3) -
    (cancellations * 0.2) -
    (lateArrivals * 0.1) -
    (swaps * 0.1)
  );
  return Math.max(0, Math.min(5, parseFloat(reliabilityScore.toFixed(1))));
};
