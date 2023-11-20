import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full w-full bg-main-bg">{children}</div>;
}
