import React from "react";
import { Inter } from "next/font/google";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col min-h-screen bg-[#ecf0f5] ${inter.className}`}>
      <Header />
      <div className="flex flex-1 justify-center items-center">
        {children}
      </div>
    </div>
  );
}