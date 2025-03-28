import { Router } from "express";
import { createReserva, getReservas, getReservaById, updateReservaStatus } from "../controllers/reservaController";

const router = Router();

// Rota para criar uma reserva
router.post("/", createReserva); // Criar reserva

// Rota para listar as reservas
router.get("/", getReservas); // Listar reservas

// Rota para buscar uma reserva por ID
router.get("/:id", getReservaById); // Buscar reserva específica

// Rota para atualizar o status da reserva
router.patch("/:id", updateReservaStatus); // Atualizar status

export default router;