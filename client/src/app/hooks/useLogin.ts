import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { accessTokenName, apiUrl } from "../constants";
import qs from "qs"; // Make sure to install qs using npm or yarn

const useLogin = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = qs.stringify({
        username: email,
        password: password,
      });

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const response = await axios.post(
        apiUrl + "/login/access-token",
        data,
        config
      );
      const { access_token, token_type } = response.data;
      Cookies.set(accessTokenName, `${token_type} ${access_token}`, {
        expires: 7,
      });
      setAccessToken(`${token_type} ${access_token}`);
      setError(null);
    } catch (err) {
      setAccessToken(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically attempt to retrieve the token from cookies on mount
  useEffect(() => {
    const token = Cookies.get(accessTokenName);
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return {
    accessToken,
    isLoading,
    error,
    login,
  };
};

export default useLogin;
