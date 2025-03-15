import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAlugueis = async (req: Request, res: Response) => {
  try {
    const alugueis = await prisma.aluguel.findMany();
    res.json(alugueis);
  } catch (error) {
    console.error("Erro ao buscar os alugueis", error);
    res.status(500).json({ message: "Erro ao buscar os alugueis" });
  }
};