import useSWR from "swr";
import { fetcher } from "../fetcher";
import { User } from "../types";
import { apiUrl } from "../constants";

const useUsers = () => {
  const endpoint = apiUrl + "/users";
  const { data, isLoading, error, mutate } = useSWR<User[]>(endpoint, fetcher);
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useUsers;
