"use client";
import React, { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { MdOutlineLeaderboard } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from "@/app/hooks/useLogout";
import { useRouter } from "next/navigation";
import { toastSuccess } from "@/app/toasts";
import useMe from "@/app/hooks/useMe";
import { MdAdminPanelSettings } from "react-icons/md";

interface Props {
  changeActiveComponent: (component: string) => void;
}

const LeftSidebar = (props: Props) => {
  const { changeActiveComponent } = props;
  const { isLoggedOut, logout } = useLogout();
  const router = useRouter();

  const { me, isLoading, error } = useMe();
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isLoggedOut) {
      router.push("/");
      toastSuccess("Logout successful!");
    }
  }, [isLoggedOut, router]);

  if (isLoading) return null;

  return (
    <aside className="flex flex-col pb-12 gap-4 items-center text-white bg-primary-color rounded-r-lg text-sm w-16 h-full pt-8">
      <button
        onClick={() => {
          changeActiveComponent("leaderboard");
          router.push("/app");
        }}
        data-tooltip-id="leaderboard-tooltip"
        data-tooltip-content="Leaderboard"
        data-tooltip-place="right"
        className="flex items-center justify-center w-full p-2 rounded-md transition-colors duration-300 hover:bg-secondary-color"
      >
        <MdOutlineLeaderboard size={28} />
        <Tooltip id="leaderboard-tooltip" />
      </button>
      {me?.is_superuser && (
        <button
          onClick={() => {
            changeActiveComponent("admin");
            router.push("/app/admin");
          }}
          data-tooltip-id="admin-tooltip"
          data-tooltip-content="Admin"
          data-tooltip-place="right"
          className="flex items-center justify-center w-full p-2 rounded-md transition-colors duration-300 hover:bg-secondary-color"
        >
          <MdAdminPanelSettings size={28} />
          <Tooltip id="admin-tooltip" />
        </button>
      )}
      <div className="grow" />
      <button
        className="flex items-center justify-center w-full p-2 rounded-md transition-colors duration-300 hover:bg-secondary-color"
        data-tooltip-id="logout-tooltip"
        data-tooltip-content="Logout"
        data-tooltip-place="right"
        onClick={handleLogout}
      >
        <RiLogoutBoxLine size={28} />
        <Tooltip id="logout-tooltip" />
      </button>
    </aside>
  );
};

export default LeftSidebar;
