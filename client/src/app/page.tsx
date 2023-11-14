"use client";
import React from "react";
import Leaderbord from "./components/Leaderbord";
import InviteApplicant from "./components/InviteApplicant";
import LeftSidebar from "./components/LeftSidebar";

const Home = () => {
  const [activeComponent, setActiveComponent] = React.useState("leaderboard");

  const changeActiveComponent = (component: string) => {
    setActiveComponent(component);
  };

  const renderComponent = {
    leaderboard: <Leaderbord />,
    inviteApplicant: <InviteApplicant />,
  };

  return (
    <div className="flex h-full">
      <LeftSidebar changeActiveComponent={changeActiveComponent} />
      {renderComponent[activeComponent as keyof typeof renderComponent]}
    </div>
  );
};

export default Home;
