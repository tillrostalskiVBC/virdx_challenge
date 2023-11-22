import Cookies from "js-cookie";
import { removeCookie } from "./api";
import { toastInfo } from "./toasts";
import { accessTokenName } from "./constants";

interface FetcherOptions {
  method?: "GET" | "POST" | "DELETE";
  body?: BodyInit | null;
}

export const fetcher = async (
  url: string,
  options?: FetcherOptions
): Promise<any> => {
  const accessToken = Cookies.get(accessTokenName);
  const headers: { [key: string]: string } = {};

  // If the access token exists, add it to the headers
  if (accessToken) {
    headers["Authorization"] = `${accessToken}`;
  }

  // Set default fetch options
  const fetchOptions: RequestInit = {
    headers: headers,
    method: options?.method || "GET",
  };

  // Add body if method is POST (or other methods that require body) and body is provided
  if (
    ["POST", "PUT", "PATCH"].includes(fetchOptions.method || "GET") &&
    options?.body
  ) {
    fetchOptions.body = options.body;
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, fetchOptions);

  if ([401, 403].includes(res.status)) {
    removeCookie();
    window.location.href = "/";
    toastInfo("You have been logged out");
  }

  if (!res.ok) {
    throw new Error("Could not fetch data");
  }

  return res.json();
};
