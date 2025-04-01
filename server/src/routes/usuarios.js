import { Router } from "express";
import { LoginUsuarioController } from "../controller/usuarios/LoginUsuarioController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const usuariosRouter = Router();

const loginUsuarioController = new LoginUsuarioController();

usuariosRouter.post('/usuarios/login', loginUsuarioController.handle);

usuariosRouter.get('/usuarios/me', authMiddleware, (req, res) => {
    const { id, email } = req.user; 
    res.status(200).json({
        message: "Usuário autenticado!",
        usuario: {
            id,
            email,
        },
    });
});

export { usuariosRouter };