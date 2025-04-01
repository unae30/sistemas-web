import { Router } from "express";

import { GetAllEventosController } from "../controller/eventos/GetAllEventosController.js";
import { CreateEventosController } from "../controller/eventos/CreateEventosController.js";
import { UpdateEventosController } from "../controller/eventos/UpdateEventosController.js";
import { DeleteEventosController } from "../controller/eventos/DeleteEventosController.js";
import { GetEventosByUsuarioController } from "../controller/eventos/GetEventosByUsuarioController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const eventosRouter = Router();

const getAllEventosController = new GetAllEventosController();
eventosRouter.get('/eventos', getAllEventosController.handle);

const createEventosController = new CreateEventosController();
eventosRouter.post('/eventos', authMiddleware, createEventosController.handle);

const updateEventosController = new UpdateEventosController();
eventosRouter.patch('/eventos/:id', authMiddleware, updateEventosController.handle);
eventosRouter.put('/eventos/:id', authMiddleware, updateEventosController.handle);

const deleteEventosController = new DeleteEventosController();
eventosRouter.delete('/eventos/:id', authMiddleware, deleteEventosController.handle);

const getEventosByUsuarioController = new GetEventosByUsuarioController();
eventosRouter.get('/eventos/usuario', authMiddleware, getEventosByUsuarioController.handle);

export { eventosRouter };