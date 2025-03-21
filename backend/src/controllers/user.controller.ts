import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "chave_secreta";

// Função para login
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Buscar usuário pelo username
        const user = await prisma.userAdmin.findFirst({
            where: { username },
        });

        if (!user || password !== user.password) {
            return res.status(401).json({ message: "Usuário ou Senha incorreta!" });
        }

        // Gerando token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};