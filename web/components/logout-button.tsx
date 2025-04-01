"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-950 px-4 py-2 rounded hover:text-red-600"
    >
      Sair
    </button>
  );
}