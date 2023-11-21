import { Applicant } from "../types";

export const computeRanks = (applicants: Applicant[]) => {
  const sortedApplicants = applicants.sort((a, b) => b.accuracy - a.accuracy);
  sortedApplicants.forEach((applicant, index) => {
    applicant.rank = index + 1;
  });
  return sortedApplicants;
};

export const computeAverageRating = (
  applicant: Applicant,
  ratingType: string
) => {
  let sum = 0;
  applicant.ratings.forEach((rating) => {
    if (rating.type === ratingType) sum += rating.score;
  });
  return sum / applicant.ratings.length;
};
