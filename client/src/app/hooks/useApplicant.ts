import React from "react";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { applicantsEndpoint } from "../api";
import { Applicant } from "../types";
import { apiUrl } from "../constants";

const useApplicant = (id: number) => {
  const endpoint = applicantsEndpoint + "/" + id;
  const { data, isLoading, error, mutate } = useSWR<Applicant>(
    endpoint,
    fetcher
  );

  const deleteComment = async (commentId: number) => {
    try {
      const deleteEndpoint = apiUrl + `/comments/${commentId}`;
      await fetcher(deleteEndpoint, { method: "DELETE" });
      mutate();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return {
    data,
    isLoading,
    error,
    mutate,
    deleteComment,
  };
};

export default useApplicant;
