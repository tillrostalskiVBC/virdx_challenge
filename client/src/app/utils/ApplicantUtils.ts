import { Applicant } from "../hooks/useApplicants";

export const computeRanks = (applicants: Applicant[]) => {
  const sortedApplicants = applicants.sort((a, b) => b.accuracy - a.accuracy);
  sortedApplicants.forEach((applicant, index) => {
    applicant.rank = index + 1;
  });
  return sortedApplicants;
};
