import { prisma } from "../../database/clients.js";

export class CreateEventosController {
  async handle(request, response) {
    const { titulo, descricao, tipo_evento, data_inicio, data_fim, local } = request.body;
    const { id: usuarioId } = request.user;

    try {
      const evento = await prisma.evento.create({
        data: {
          titulo,
          descricao,
          tipo_evento,
          data_inicio: new Date(data_inicio),
          data_fim: new Date(data_fim),
          local,
          usuarioId,
        },
      });

      return response.status(201).json(evento);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return response.status(500).json({ message: "Erro interno ao criar evento." });
    }
  }
}