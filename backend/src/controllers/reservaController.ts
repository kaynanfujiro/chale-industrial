import { Request, Response } from "express";
import prisma from "../config/prisma";

// Criar reserva
export const createReserva = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, number, email, startDate, endDate, aluguelId } = req.body;

    const reserva = await prisma.reservas.create({
      data: { name, number, email, startDate, endDate, aluguelId },
    });

    res.status(201).json(reserva); // Retorna a reserva criada
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ message: "Erro ao criar reserva" });
  }
};

// Listar reservas
export const getReservas = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservas = await prisma.reservas.findMany();
    res.json(reservas); // Retorna a lista de reservas
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    res.status(500).json({ message: "Erro ao buscar reservas" });
  }
};

// Buscar uma reserva por ID
export const getReservaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reserva = await prisma.reservas.findUnique({
      where: { id: Number(id) }, // Converte o id para número
    });

    if (!reserva) {
      res.status(404).json({ message: "Reserva não encontrada" });
      return;
    }

    res.json(reserva); // Retorna a reserva encontrada
  } catch (error) {
    console.error("Erro ao buscar reserva:", error);
    res.status(500).json({ message: "Erro ao buscar reserva" });
  }
};

// Atualizar status da reserva
export const updateReservaStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Valida se o status é válido
    if (!["APROVADO", "REPROVADO"].includes(status)) {
      res.status(400).json({ message: "Status inválido" });
      return;
    }

    const reservaAtualizada = await prisma.reservas.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(reservaAtualizada); // Retorna a reserva atualizada
  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);
    res.status(500).json({ message: "Erro ao atualizar reserva" });
  }
};
