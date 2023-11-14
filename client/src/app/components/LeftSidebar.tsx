"use client";
import React from "react";
import { Tooltip } from "react-tooltip";
import { MdOutlineLeaderboard } from "react-icons/md";
import { MdPersonAddAlt } from "react-icons/md";

interface Props {
  changeActiveComponent: (component: string) => void;
}

const LeftSidebar = (props: Props) => {
  const { changeActiveComponent } = props;
  return (
    <aside className="flex flex-col gap-4 items-center text-white bg-primary-color rounded-r-lg text-sm w-16 h-full pt-8">
      <button
        onClick={() => changeActiveComponent("leaderboard")}
        data-tooltip-id="leaderboard-tooltip"
        data-tooltip-content="Leaderboard"
        data-tooltip-place="right"
        className="flex items-center justify-center w-full p-2 rounded-md transition-colors duration-300 hover:bg-secondary-color"
      >
        <MdOutlineLeaderboard size={28} />
        <Tooltip id="leaderboard-tooltip" />
      </button>
    </aside>
  );
};

export default LeftSidebar;
