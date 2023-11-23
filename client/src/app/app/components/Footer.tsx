import useMe from "@/app/hooks/useMe";
import React from "react";

const Footer = () => {
  const { me, error, isLoading } = useMe();

  if (isLoading) return null;
  return (
    <div className="flex w-full justify-between text-gray-400 text-xs mt-2">
      <span>{me?.full_name}</span>
      <span>{me?.email}</span>
    </div>
  );
};

export default Footer;
