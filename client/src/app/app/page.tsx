"use client";
import React from "react";
import Leaderbord from "./components/Leaderbord";
import LeftSidebar from "./components/LeftSidebar";
import useMe from "../hooks/useMe";
import Spinner from "../components/Spinner";
import Footer from "./components/Footer";

const Home = () => {
  const [activeComponent, setActiveComponent] = React.useState("leaderboard");

  const { me, isLoading, error } = useMe();

  const changeActiveComponent = (component: string) => {
    setActiveComponent(component);
  };

  const renderComponent = {
    leaderboard: <Leaderbord />,
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex h-full w-full">
      <LeftSidebar changeActiveComponent={changeActiveComponent} />
      <div className="flex flex-col h-full w-full">
        {renderComponent[activeComponent as keyof typeof renderComponent]}
      </div>
    </div>
  );
};

export default Home;
