import React from "react";
import { applicantsEndpoint } from "../api";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Applicant } from "../types";

const useApplicants = () => {
  const endpoint = applicantsEndpoint;
  const { data, isLoading, error, mutate } = useSWR<Applicant[]>(
    endpoint,
    fetcher
  );
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useApplicants;
