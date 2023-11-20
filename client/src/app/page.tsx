import React from "react";
import { FaLock, FaRegUser } from "react-icons/fa6";

const LoginPage = () => {
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
              <FaRegUser className="text-gray-400 text-xl ml-2" />
              <input
                type="text"
                className="w-full p-2 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start">
            <label className="text-gray-400 text-xl">Password</label>
            <div className="flex w-full items-center border-2 border-primary-color rounded-md">
              <FaLock className="text-gray-400 text-xl ml-2" />
              <input
                type="password"
                className="w-full p-2 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <button className="w-full mt-4 px-2 py-3 bg-primary-color text-white rounded-md">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
