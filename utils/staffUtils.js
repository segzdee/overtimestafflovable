import { mockStaffData } from '../data/mockStaffData';

export const fetchStaffData = () => mockStaffData;

export const calculateReliabilityScore = (staffMember) => {
  const { clientRating, reliability, cancellations, lateArrivals, swaps } = staffMember.ratings;
  const reliabilityScore = (
    (clientRating * 0.3) +
    (reliability * 0.3) -
    (cancellations * 0.2) -
    (lateArrivals * 0.1) -
    (swaps * 0.1)
  ).toFixed(1);
  return Math.max(0, Math.min(5, reliabilityScore));
};
