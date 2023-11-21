import Cookies from "js-cookie";
import { removeCookie } from "./api";
import { toastInfo } from "./toasts";
import { accessTokenName } from "./constants";

export const fetcher = async (url: string): Promise<any> => {
  const accessToken = Cookies.get(accessTokenName);
  const headers: { [key: string]: string } = {};

  // If the access token exists, add it to the headers
  if (accessToken) {
    headers["Authorization"] = `${accessToken}`;
  }

  const res = await fetch(url, {
    headers: headers,
  });

  if (res.status === 401) {
    removeCookie();
    window.location.href = "/";
    toastInfo("You have been logged out");
  }

  if (!res.ok) {
    throw new Error("Could not fetch data");
  }

  return res.json();
};
