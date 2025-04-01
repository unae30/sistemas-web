import { prisma } from "../../database/clients.js";
import jwt from "jsonwebtoken";

export class LoginUsuarioController {
  async handle(request, response) {
    const { email, senha } = request.body;

    try {
      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario) {
        return response.status(401).json({ message: "Credenciais inválidas." });
      }

      if (senha !== usuario.senha) {
        return response.status(401).json({ message: "Credenciais inválidas." });
      }

      const token = jwt.sign({ id: usuario.id, email: usuario.email }, "secreta-chave", {
        expiresIn: "1h",
      });

      return response.status(200).json({ message: "Login bem-sucedido!", token });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return response.status(500).json({ message: "Erro interno ao fazer login." });
    }
  }
}