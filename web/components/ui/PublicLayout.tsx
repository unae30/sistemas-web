"use client";

import React from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}