import { prisma } from "../../database/clients.js";

export class GetEventosByUsuarioController {
  async handle(request, response) {
    const { id: usuarioId } = request.user; 

    try {
      const eventos = await prisma.evento.findMany({
        where: { usuarioId },
      });

      return response.status(200).json(eventos);
    } catch (error) {
      console.error("Erro ao buscar eventos do usuário:", error);
      return response.status(500).json({ message: "Erro interno ao buscar eventos." });
    }
  }
}