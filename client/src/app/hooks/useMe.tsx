import useSWR from "swr";
import { apiUrl } from "../constants";
import { fetcher } from "../fetcher";
import { User } from "../types";

const useMe = () => {
  const { data, isLoading, error } = useSWR<User>(
    apiUrl + "/users/me",
    fetcher
  );

  return {
    me: data,
    isLoading,
    error,
  };
};
export default useMe;
