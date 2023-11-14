import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const MainWrapper = (props: Props) => {
  const { title, children } = props;
  return (
    <div className="flex flex-col w-full h-full items-center py-8">
      <div>
        <span className="text-2xl font-semibold">{title}</span>
      </div>
      {children}
    </div>
  );
};

export default MainWrapper;
