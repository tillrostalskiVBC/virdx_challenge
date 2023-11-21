import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${inter.className} text-text-primary h-screen w-screen`}
      >
        <div className="flex h-full w-full">
          <main className="flex h-full w-full">{children}</main>
          <ToastContainer autoClose={3000} theme="light" />
        </div>
      </body>
    </html>
  );
}
