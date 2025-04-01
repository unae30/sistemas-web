import { prisma } from "../../database/clients.js";

export class UpdateEventosController {
    async handle(request, response) {
        const { id } = request.params;

        if (!id || isNaN(Number(id))) {
            return response.status(400).json({
                message: "ID inválido.",
            });
        }

        const { id: _, ...data } = request.body;

        try {
            const evento = await prisma.evento.update({
                where: {
                    id: Number(id),
                },
                data,
            });

            return response.status(200).json(evento);
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
            return response.status(500).json({
                message: "Erro interno ao atualizar evento.",
            });
        }
    }
}