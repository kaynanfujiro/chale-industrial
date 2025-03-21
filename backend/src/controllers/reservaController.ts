import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar reserva
export const createReserva = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, number, email, startDate, endDate, aluguelId } = req.body;

    const reserva = await prisma.reservas.create({
      data: { name, number, email, startDate, endDate, aluguelId },
    });

    res.status(201).json(reserva);
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ error: "Erro ao criar reserva" });
  }
};

// Listar reservas
export const getReservas = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservas = await prisma.reservas.findMany();
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    res.status(500).json({ error: "Erro ao buscar reservas" });
  }
};

// Atualizar status da reserva
export const updateReservaStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["APROVAR", "RECUSAR"].includes(status)) {
      res.status(400).json({ error: "Status inválido" });
      return;
    }

    const reservaAtualizada = await prisma.reservas.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.status(200).json(reservaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);
    res.status(500).json({ error: "Erro ao atualizar reserva" });
  }
};
