import { Router } from "express";
import { createReserva, getReservas, updateReservaStatus } from "../controllers/reservaController";

const router = Router();

router.post("/", createReserva); // Criar reserva
router.get("/", getReservas); // Listar reservas
router.patch("/:id", updateReservaStatus); // Atualizar status

export default router;
