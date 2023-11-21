"use client";
import React, { useEffect, useState } from "react";
import { FaLock, FaRegUser } from "react-icons/fa6";
import useLogin from "./hooks/useLogin";
import { toastError, toastSuccess } from "./toasts";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, accessToken } = useLogin();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      toastError("Login failed!");
    }
  };

  useEffect(() => {
    if (accessToken) {
      router.push("/app");
      toastSuccess("Login successful!");
    }
  }, [accessToken]);

  return (
    <div className="flex flex-row h-full w-full">
      <div className="flex flex-col h-full w-1/3 text-white justify-center bg-secondary-color">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold">Virdx Apply</h1>
        </div>
      </div>
      <form className="flex flex-col w-2/3 justify-center">
        <div className="flex flex-col w-7/12 ml-24">
          <div className="w-full flex flex-col items-start justify-center">
            <label className="text-gray-400 text-xl">Username</label>
            <div className="flex w-full items-center border-2 border-primary-color rounded-md">
              <FaRegUser className="text-gray-400 text-xl mx-2" />
              <input
                type="text"
                className="w-full p-2 focus:outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start">
            <label className="text-gray-400 text-xl">Password</label>
            <div className="flex w-full items-center border-2 border-primary-color rounded-md">
              <FaLock className="text-gray-400 text-xl mx-2" />
              <input
                type="password"
                className="w-full p-2 focus:outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button
            className="w-full mt-4 px-2 py-3 bg-primary-color text-white rounded-md transition hover:bg-secondary-color"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
