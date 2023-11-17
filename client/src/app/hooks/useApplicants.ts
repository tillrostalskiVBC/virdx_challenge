import React from "react";
import { applicantsEndpoint } from "../api";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export interface Applicant {
  id: number;
  accuracy: number;
  full_name: string;
  github_name: string;
  comment: string;
  feedback: string;
  repo_link: string;
  rating?: number;
  rank?: number;
  created_at: string;
}

const useApplicants = () => {
  const endpoint = applicantsEndpoint;
  const { data, isLoading, error } = useSWR<Applicant[]>(endpoint, fetcher);
  console.log(data);
  return {
    data,
    isLoading,
    error,
  };
};

export default useApplicants;
