"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReservaStatus = exports.getReservaById = exports.getReservas = exports.createReserva = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Criar reserva
const createReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, number, email, startDate, endDate, aluguelId } = req.body;
        const reserva = yield prisma_1.default.reservas.create({
            data: { name, number, email, startDate, endDate, aluguelId },
        });
        res.status(201).json(reserva); // Retorna a reserva criada
    }
    catch (error) {
        console.error("Erro ao criar reserva:", error);
        res.status(500).json({ message: "Erro ao criar reserva" });
    }
});
exports.createReserva = createReserva;
// Listar reservas
const getReservas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { aluguelId } = req.query;
        let reservas;
        if (aluguelId) {
            // Se tiver aluguelId, filtra por ele
            reservas = yield prisma_1.default.reservas.findMany({
                where: {
                    aluguelId: Number(aluguelId)
                }
            });
        }
        else {
            // Caso contrário, retorna todas as reservas
            reservas = yield prisma_1.default.reservas.findMany();
        }
        res.json(reservas); // Retorna a lista de reservas
    }
    catch (error) {
        console.error("Erro ao buscar reservas:", error);
        res.status(500).json({ message: "Erro ao buscar reservas" });
    }
});
exports.getReservas = getReservas;
// Buscar uma reserva por ID
const getReservaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reserva = yield prisma_1.default.reservas.findUnique({
            where: { id: Number(id) }, // Converte o id para número
        });
        if (!reserva) {
            res.status(404).json({ message: "Reserva não encontrada" });
            return;
        }
        res.json(reserva); // Retorna a reserva encontrada
    }
    catch (error) {
        console.error("Erro ao buscar reserva:", error);
        res.status(500).json({ message: "Erro ao buscar reserva" });
    }
});
exports.getReservaById = getReservaById;
// Atualizar status da reserva
const updateReservaStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Valida se o status é válido
        if (!["APROVADO", "REPROVADO"].includes(status)) {
            res.status(400).json({ message: "Status inválido" });
            return;
        }
        const reservaAtualizada = yield prisma_1.default.reservas.update({
            where: { id: Number(id) },
            data: { status },
        });
        res.json(reservaAtualizada); // Retorna a reserva atualizada
    }
    catch (error) {
        console.error("Erro ao atualizar reserva:", error);
        res.status(500).json({ message: "Erro ao atualizar reserva" });
    }
});
exports.updateReservaStatus = updateReservaStatus;
