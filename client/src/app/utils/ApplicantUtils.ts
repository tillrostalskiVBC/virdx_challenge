import { Applicant, Rating } from "../types";

export const computeRanks = (applicants: Applicant[]) => {
  const sortedApplicants = applicants.sort((a, b) => b.accuracy - a.accuracy);
  sortedApplicants.forEach((applicant, index) => {
    applicant.rank = index + 1;
  });
  return sortedApplicants;
};

export const computeAverageRating = (ratings: Rating[], ratingType: string) => {
  let sum = 0;
  const ratingsOfType = ratings.filter((rating) => rating.type === ratingType);
  ratingsOfType.forEach((rating) => {
    sum += rating.score;
  });
  return sum / ratingsOfType.length;
};
