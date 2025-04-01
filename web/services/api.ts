import type { EventType } from "@/types/event"

const API_URL = "http://localhost:5555"

export async function getAllEvents(): Promise<EventType[]> {
  const response = await fetch(`${API_URL}/eventos`)
  if (!response.ok) {
    throw new Error("Falha ao buscar eventos")
  }
  return response.json()
}

export async function getEventsByUserId(): Promise<EventType[]> {
  // Obter o token dos cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  // Fazer a requisição para buscar os eventos do usuário
  const response = await fetch(`${API_URL}/eventos/usuario`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Adicionar o token no cabeçalho
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar eventos do usuário.");
  }

  return response.json();
}

export async function getAuthenticatedUser(): Promise<{ id: number; [key: string]: any }> {
  // Obter o token dos cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  // Fazer a requisição para obter os dados do usuário
  const response = await fetch(`${API_URL}/usuarios/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Adicionar o token no cabeçalho
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao obter informações do usuário.");
  }

  return response.json();
}

export async function createEvent(eventData: {
  titulo: string;
  descricao: string;
  tipo_evento: string;
  data_inicio: string;
  data_fim: string;
  local: string;
}): Promise<void> {
  // Obter o token dos cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  // Obter o ID do usuário autenticado
  const userData = await getAuthenticatedUser();
  const usuarioId = userData.id;

  // Fazer a requisição para criar o evento
  const response = await fetch(`${API_URL}/eventos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Adicionar o token no cabeçalho
    },
    body: JSON.stringify({ ...eventData, usuarioId }), // Adicionar o ID do usuário ao corpo da requisição
  });

  if (!response.ok) {
    throw new Error("Falha ao agendar o evento.");
  }
}

export async function updateEvent(eventId: number, eventData: {
  titulo: string;
  descricao: string;
  tipo_evento: string;
  data_inicio: string;
  data_fim: string;
  local: string;
}): Promise<void> {
  // Obter o token dos cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  // Fazer a requisição para atualizar o evento
  const response = await fetch(`${API_URL}/eventos/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Adicionar o token no cabeçalho
    },
    body: JSON.stringify(eventData), // Enviar os dados atualizados no corpo da requisição
  });

  if (!response.ok) {
    throw new Error("Falha ao atualizar o evento.");
  }
}

export async function deleteEvent(eventId: number): Promise<void> {
  // Obter o token dos cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  // Fazer a requisição para deletar o evento
  const response = await fetch(`${API_URL}/eventos/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Adicionar o token no cabeçalho
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao deletar o evento.");
  }
}

export const api = {
  login: async (email: string, senha: string) => {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Erro ao fazer login");
    }

    return response.json();
  },
}