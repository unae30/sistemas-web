"use client";

import { useState, useEffect } from "react";
import { deleteEvent, updateEvent, getEventsByUserId, getAuthenticatedUser } from "@/services/api";
import type { EventType } from "@/types/event";
import { Edit, Trash2, Calendar, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import "../../../styles/globals.css";

export default function GerenciarEventoPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      try {
        const userData = await getAuthenticatedUser();
        const userId = userData.usuario.id;

        const eventsData = await getEventsByUserId();
        setEvents(eventsData);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar eventos. Por favor, tente novamente.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchUserAndEvents();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      try {
        await deleteEvent(id);
        setEvents(events.filter((event) => event.id !== id));
      } catch (err) {
        alert("Erro ao excluir evento. Por favor, tente novamente.");
        console.error(err);
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
  
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
  
    try {
      const updatedEvent = {
        titulo: formData.get("titulo") as string,
        descricao: formData.get("descricao") as string,
        tipo_evento: formData.get("tipo_evento") as string,
        data_inicio: new Date(formData.get("data_inicio") as string).toISOString(),
        data_fim: new Date(formData.get("data_fim") as string).toISOString(),
        local: formData.get("local") as string,
      };
  
      await updateEvent(selectedEvent.id, updatedEvent);
      setEvents(events.map((event) => (event.id === selectedEvent.id ? { ...event, ...updatedEvent } : event)));
      setIsDialogOpen(false);
      alert("Evento atualizado com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar evento. Por favor, tente novamente.");
      console.error(err);
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateForInput = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 16);
  };

  return (
      <div className="p-10">
        <h1 className="mb-6 text-3xl font-medium">Gerenciar Eventos</h1>
        <p className="mb-8 text-lg">Visualize, edite ou exclua os eventos agendados.</p>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <p>Carregando eventos...</p>
          </div>
        ) : error ? (
          <div className="flex h-40 items-center justify-center text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{event.titulo}</h2>
                    <div className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      {event.tipo_evento}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-gray-200"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-gray-200"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(event.data_inicio)} - {formatDate(event.data_fim)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.local}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Tag className="mr-2 h-4 w-4" />
                    {event.tipo_evento}
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-600">{event.descricao}</p>
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <div className="flex h-40 items-center justify-center rounded-lg bg-white">
                <p className="text-gray-500">Não há eventos agendados.</p>
              </div>
            )}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Evento</DialogTitle>
            </DialogHeader>
            {selectedEvent && (
              <form onSubmit={handleUpdate} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="titulo" className="text-sm font-medium">
                    Título do Evento
                  </label>
                  <input
                    id="titulo"
                    name="titulo"
                    defaultValue={selectedEvent.titulo}
                    className="w-full rounded border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="descricao" className="text-sm font-medium">
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    defaultValue={selectedEvent.descricao}
                    className="w-full rounded border border-gray-300 p-2"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="tipo_evento" className="text-sm font-medium">
                    Tipo de Evento
                  </label>
                  <select
                    id="tipo_evento"
                    name="tipo_evento"
                    defaultValue={selectedEvent.tipo_evento}
                    className="w-full rounded border border-gray-300 p-2"
                    required
                  >
                    <option value="Extensão">Extensão</option>
                    <option value="Acadêmico">Acadêmico</option>
                    <option value="Entretenimento">Entretenimento</option>
                    <option value="Saúde/Social">Saúde/Social</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="data_inicio" className="text-sm font-medium">
                      Data de Início
                    </label>
                    <input
                      id="data_inicio"
                      name="data_inicio"
                      type="datetime-local"
                      defaultValue={formatDateForInput(selectedEvent.data_inicio)}
                      className="w-full rounded border border-gray-300 p-2"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="data_fim" className="text-sm font-medium">
                      Data de Fim
                    </label>
                    <input
                      id="data_fim"
                      name="data_fim"
                      type="datetime-local"
                      defaultValue={formatDateForInput(selectedEvent.data_fim)}
                      className="w-full rounded border border-gray-300 p-2"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="local" className="text-sm font-medium">
                    Local
                  </label>
                  <input
                    id="local"
                    name="local"
                    defaultValue={selectedEvent.local}
                    className="w-full rounded border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#962038] hover:bg-[#7a1a2e]">
                    Salvar alterações
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
  );
}