import express from 'express'
import cors from 'cors'
import { mainRouter } from './routes/main.js'
import { eventosRouter } from './routes/eventos.js'
import { usuariosRouter } from "./routes/usuarios.js";


const server = express()
const PORT = 5555

server.use(express.json())
server.use(cors())

// Routes
server.use(mainRouter)
server.use(eventosRouter)
server.use(usuariosRouter);


// Start - listen:
server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`)
})
