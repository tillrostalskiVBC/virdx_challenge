import React from 'react'
import { applicantsEndpoint } from '../api';
import useSWR from 'swr';
import { fetcher } from '../fetcher';

export interface Applicant {
    id: number;
    accuracy: number;
    full_name: string;
    github_name: string;
    comment: string;
    feedback: string;
    repo_link: string;
    status: string;
}

const useApplicants = () => {
    const endpoint = applicantsEndpoint
    const { data, isLoading, error } = useSWR<Applicant[]>(endpoint, fetcher)
    return {
        data,
        isLoading,
        error
    }
}

export default useApplicants