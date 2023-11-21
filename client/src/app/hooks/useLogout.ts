import React, { useState, useCallback } from "react";
import { removeCookie } from "../api";

const useLogout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logout = useCallback(() => {
    removeCookie();
    setIsLoggedOut(true);
  }, []);

  return {
    isLoggedOut,
    logout,
  };
};

export default useLogout;
