"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Calendar, PlusCircle, ListChecks } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "../logout-button"

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[70px]" : "w-[306px]"
      }`}
    >
      <div className="p-4">
        <button onClick={toggleSidebar} className="absolute text-[#962038] hover:bg-gray-100 rounded-full p-1">
          {isCollapsed ? <ArrowRight className="h-6 w-6" /> : <ArrowLeft className="h-6 w-6" />}
        </button>
        <div className={`flex items-center justify-center pt-6 ${isCollapsed ? "flex-col" : ""}`}>
          <Calendar className="h-8 w-8 text-[#962038]" />
          {!isCollapsed && <h1 className="ml-2 text-2xl font-bold text-[#962038]">SisEve</h1>}
        </div>
      </div>
      <div className="mt-4 border-t border-gray-200"></div>
      <div className="p-4">
        <Link href="/eventos/visualizar">
          <button
            className={`mb-4 w-full rounded py-4 text-center font-medium ${
              pathname === "/eventos/visualizar" ? "bg-[#962038] text-white" : "bg-[#d9d9d9] text-black"
            } ${isCollapsed ? "px-2" : ""}`}
            title="Visualizar Eventos"
          >
            {isCollapsed ? (
              <div className="flex justify-center">
                <Calendar className="h-5 w-5" />
              </div>
            ) : (
              "Visualizar Eventos"
            )}
          </button>
        </Link>
        <Link href="/eventos/agendar">
          <button
            className={`mb-4 w-full rounded py-4 text-center font-medium ${
              pathname === "/eventos/agendar" ? "bg-[#962038] text-white" : "bg-[#d9d9d9] text-black"
            } ${isCollapsed ? "px-2" : ""}`}
            title="Agendar Evento"
          >
            {isCollapsed ? (
              <div className="flex justify-center">
                <PlusCircle className="h-5 w-5" />
              </div>
            ) : (
              "Agendar Evento"
            )}
          </button>
        </Link>
        <Link href="/eventos/gerenciar">
          <button
            className={`w-full rounded py-4 text-center font-medium ${
              pathname === "/eventos/gerenciar" ? "bg-[#962038] text-white" : "bg-[#d9d9d9] text-black"
            } ${isCollapsed ? "px-2" : ""}`}
            title="Gerenciar Eventos"
          >
            {isCollapsed ? (
              <div className="flex justify-center">
                <ListChecks className="h-5 w-5" />
              </div>
            ) : (
              "Gerenciar Eventos"
            )}
          </button>
        </Link>
      </div>
      <div className="p-4 border-t border-gray-200 flex justify-center items-end">
        {!isCollapsed && <LogoutButton />}
      </div>
    </div>
  )
}

