import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getChaletById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const chale = await prisma.aluguel.findUnique({
      where: { id: Number(id) }, // Converte o id para número
    });

    if (!chale) {
      res.status(404).json({ message: "Chalé não encontrado" });
      return;
    }

    res.json(chale);
  } catch (error) {
    console.error("Erro ao buscar chalé:", error);
    res.status(500).json({ message: "Erro ao buscar chalé" });
  }
};