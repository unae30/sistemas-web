import { prisma } from "../../database/clients.js";

export class GetAllEventosController {
    async handle(request, response) {
        try {
            const eventos = await prisma.evento.findMany();

            return response.status(200).json(eventos);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            return response.status(500).json({
                message: "Erro interno ao buscar eventos.",
            });
        }
    }
}