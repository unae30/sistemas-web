"use client";

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#ecf0f5] shadow-md p-4">
      <h1 className="text-3xl font-semibold text-center">
        Sistema de Gerenciamento de Eventos
        <br /> <i>Campus ICEA</i> - UFOP
      </h1>
    </header>
  );
};

export default Header;