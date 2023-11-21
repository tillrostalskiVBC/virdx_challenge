import React from "react";
import Footer from "./Footer";

interface Props {
  title: string;
  children: React.ReactNode;
}

const MainWrapper = (props: Props) => {
  const { title, children } = props;
  return (
    <div className="container mx-auto flex flex-col w-full h-full py-4 px-8 gap-2">
      <div>
        <span className="text-2xl font-semibold text-secondary-color">
          {title}
        </span>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default MainWrapper;
