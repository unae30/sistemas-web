import type React from "react";
import { Inter } from "next/font/google";
import Sidebar from "@/components/menu/Sidebar";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex min-h-screen ${inter.className}`}>
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="bg-[#ecf0f5]">{children}</div>
      </div>
    </div>
  );
}