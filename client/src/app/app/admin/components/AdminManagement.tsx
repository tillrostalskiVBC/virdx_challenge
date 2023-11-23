import React, { useState } from "react";
import { Tab, TabBar } from "../../components/TabBar";
import UserManagement from "./UserManagement";
import ApplicantManagement from "./ApplicantManagement";

const AdminManagement = () => {
  const [activeTabValue, setActiveTabValue] = useState<string>();

  const tabs = [
    {
      label: "Users",
      value: "users",
      onClick: () => setActiveTabValue("users"),
    },
    {
      label: "Applicants",
      value: "applicants",
      onClick: () => setActiveTabValue("applicants"),
    },
  ];

  const renderContent = {
    users: <UserManagement />,
    applicants: <ApplicantManagement />,
  };

  return (
    <div className="container mx-auto">
      <div className="mb-2">
        <TabBar tabs={tabs} activeTabValue={activeTabValue || "users"} />
      </div>
      {renderContent[(activeTabValue as keyof typeof renderContent) || "users"]}
    </div>
  );
};

export default AdminManagement;
