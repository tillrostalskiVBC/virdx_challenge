import React from "react";
import Footer from "./Footer";
import LeftSidebar from "./LeftSidebar";

interface Props {
  children: React.ReactNode;
}

const MainWrapper = (props: Props) => {
  const [activeComponent, setActiveComponent] = React.useState("leaderboard");
  const { children } = props;

  const changeActiveComponent = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex h-full w-full">
      <LeftSidebar changeActiveComponent={changeActiveComponent} />
      <div className="container mx-auto flex flex-col w-full h-full py-4 px-8">
        {children}
        <div className="grow" />
        <Footer />
      </div>
    </div>
  );
};

export default MainWrapper;
