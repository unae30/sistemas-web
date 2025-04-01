"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await api.login(email, senha);

      document.cookie = `token=${data.token}; path=/;`;

      router.push("/eventos/visualizar");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h1 className="text-2xl font-bold mb-1 text-center">Fazer login</h1>
      <img src="/minhaufop-logo.jpg" alt="Logomarca UFOP" className="w-16 mx-auto mb-4" />
      <p className="text-xs mb-4 text-center">Faça o login com as credenciais da MinhaUFOP</p>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm font-medium">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#962038] text-white py-2 rounded hover:bg-[#7a1a2e]"
        > 
          Entrar
        </button>
      </form>
    </div>
  );
}