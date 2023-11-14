import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const MainWrapper = (props: Props) => {
  const { title, children } = props;
  return (
    <div className="container mx-auto flex flex-col w-full h-full py-4 px-8 gap-2 text-secondary-color">
      <div >
        <span className="text-2xl font-semibold">{title}</span>
      </div>
      {children}
    </div>
  );
};

export default MainWrapper;
