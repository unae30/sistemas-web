import { prisma } from "../../database/clients.js";

export class DeleteEventosController {
  async handle(request, response) {
    const { id } = request.params;
    const { id: usuarioId } = request.user;

    try {
      const evento = await prisma.evento.findUnique({
        where: { id: Number(id) },
      });

      if (!evento) {
        return response.status(404).json({ message: "Evento não encontrado." });
      }

      if (evento.usuarioId !== usuarioId) {
        return response.status(403).json({ message: "Você não tem permissão para excluir este evento." });
      }

      await prisma.evento.delete({
        where: { id: Number(id) },
      });

      return response.status(200).json({ message: "Evento excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      return response.status(500).json({ message: "Erro interno ao excluir evento." });
    }
  }
}