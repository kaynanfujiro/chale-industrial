"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservaController_1 = require("../controllers/reservaController");
const router = (0, express_1.Router)();
// Rota para criar uma reserva
router.post("/", reservaController_1.createReserva); // Criar reserva
// Rota para listar as reservas
router.get("/", reservaController_1.getReservas); // Listar reservas
// Rota para buscar uma reserva por ID
router.get("/:id", reservaController_1.getReservaById); // Buscar reserva específica
// Rota para atualizar o status da reserva
router.patch("/:id", reservaController_1.updateReservaStatus); // Atualizar status
exports.default = router;
