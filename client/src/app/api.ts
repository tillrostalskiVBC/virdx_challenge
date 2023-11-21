import Cookies from "js-cookie";
import { accessTokenName } from "./constants";

export const applicantsEndpoint =
  process.env.NEXT_PUBLIC_API_URL + "/applicants";

export const removeCookie = () => {
  // Remove the access token from the cookies
  Cookies.remove(accessTokenName);
};
