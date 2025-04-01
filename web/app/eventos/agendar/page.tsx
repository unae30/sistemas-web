"use client"

import type React from "react"

import { useState } from "react"
import { createEvent } from "@/services/api"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import "../../../styles/globals.css"

export default function AgendarEventoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
  
    try {
      const newEvent = {
        titulo: formData.get("titulo") as string,
        descricao: formData.get("descricao") as string,
        tipo_evento: formData.get("tipo_evento") as string,
        data_inicio: new Date(formData.get("data_inicio") as string).toISOString(),
        data_fim: new Date(formData.get("data_fim") as string).toISOString(),
        local: formData.get("local") as string,
      };
  
      await createEvent(newEvent);
      alert("Evento agendado com sucesso!");
      form.reset();
      router.push("/eventos/visualizar");
    } catch (err) {
      setError("Erro ao agendar evento. Por favor, tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-medium">Agendar Evento</h1>
      <p className="mb-8 text-lg">Preencha o formulário abaixo para agendar um novo evento.</p>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="mb-1 block text-sm font-medium">
              Título do Evento <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Digite o título do evento"
              className="w-full rounded border border-gray-300 p-3"
              required
            />
          </div>

          <div>
            <label htmlFor="tipo_evento" className="mb-1 block text-sm font-medium">
              Tipo do Evento <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="tipo_evento"
                name="tipo_evento"
                className="w-full appearance-none rounded border border-gray-300 p-3 pr-10"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione o tipo de evento
                </option>
                <option value="Extensão">Extensão</option>
                <option value="Acadêmico">Acadêmico</option>
                <option value="Entretenimento">Entretenimento</option>
                <option value="Saúde/Social">Saúde/Social</option>
                <option value="Outro">Outro</option>

              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="data_inicio" className="mb-1 block text-sm font-medium">
                Data e Hora de Início <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="data_inicio"
                name="data_inicio"
                className="w-full rounded border border-gray-300 p-3"
                required
              />
            </div>

            <div>
              <label htmlFor="data_fim" className="mb-1 block text-sm font-medium">
                Data e Hora de Término <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="data_fim"
                name="data_fim"
                className="w-full rounded border border-gray-300 p-3"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="local" className="mb-1 block text-sm font-medium">
              Local <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="local"
              name="local"
              placeholder="Digite o local do evento"
              className="w-full rounded border border-gray-300 p-3"
              required
            />
          </div>

          <div>
            <label htmlFor="descricao" className="mb-1 block text-sm font-medium">
              Descrição do Evento <span className="text-red-500">*</span>
            </label>
            <textarea
              id="descricao"
              name="descricao"
              placeholder="Digite a descrição do evento"
              className="w-full rounded border border-gray-300 p-3"
              rows={4}
              required
            ></textarea>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#962038] py-3 text-center font-medium text-white hover:bg-[#7a1a2e]"
          >
            {loading ? "Agendando..." : "Agendar Evento"}
          </Button>
        </form>
      </div>
    </div>
  )
}

