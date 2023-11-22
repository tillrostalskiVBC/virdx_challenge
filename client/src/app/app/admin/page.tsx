"use client";
import React, { use } from "react";
import MainWrapper from "../components/MainWrapper";
import UserManagement from "./components/UserManagement";
import useMe from "@/app/hooks/useMe";

const AdminPage = () => {
  const { me, isLoading, error } = useMe();

  if (isLoading) return null;

  if (!me?.is_superuser) {
    return (
      <MainWrapper>
        <div className="flex items-center justify-center h-full">
          <span className="text-2xl font-semibold text-secondary-color">
            You are not an Admin.
          </span>
        </div>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold text-secondary-color">
          Admin
        </span>
      </div>
      <div>
        <UserManagement />
      </div>
    </MainWrapper>
  );
};

export default AdminPage;
