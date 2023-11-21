import React from "react";
import { applicantsEndpoint } from "../api";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Applicant } from "../types";

const useApplicants = () => {
  const endpoint = applicantsEndpoint;
  const { data, isLoading, error } = useSWR<Applicant[]>(endpoint, fetcher);
  return {
    data,
    isLoading,
    error,
  };
};

export default useApplicants;
