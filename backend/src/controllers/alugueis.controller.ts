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


interface MulterFiles {
  imageP?: Express.Multer.File[];
  images?: Express.Multer.File[];
  video?: Express.Multer.File[];
}

export const createAlugueis = async (req: Request, res: Response) => {
  try {

    console.log("Dados recebidos:", req.body); // Log dos dados do formulário
    console.log("Arquivos recebidos:", req.files); // Log dos arquivos enviados

    // Extrai os dados do corpo da requisição
    const { name, description, type, value } = req.body;

    // Faz o type assertion para garantir que req.files seja do tipo MulterFiles
    const files = req.files as MulterFiles;

    // Extrai os arquivos enviados
    const imageP = files.imageP?.[0]; // Imagem principal
    const images = files.images; // Array de imagens
    const video = files.video?.[0]; // Vídeo

    // Cria o novo aluguel no banco de dados
    const novoAluguel = await prisma.aluguel.create({
      data: {
        name,
        description,
        type,
        value: parseInt(value), // Converte para número
        imageP: imageP ? imageP.path.replace(/\\/g, "/").replace("public/", "/") : "", // Remove o prefixo "public/"
        images: images ? images.map((img) => img.path.replace(/\\/g, "/").replace("public/", "/")) : [], // Remove o prefixo "public/"
        video: video ? video.path.replace(/\\/g, "/").replace("public/", "/") : "", // Remove o prefixo "public/"
      },
    });

    console.log("Imagem principal:", imageP);
    console.log("Imagens gerais:", images);
    console.log("Vídeo:", video);

    console.log("Aluguel Criado:", novoAluguel);
    res.status(201).json(novoAluguel);
  } catch (error) {
    console.error("Erro ao criar o Aluguel:", error);
    res.status(500).json({ message: "Erro ao criar o aluguel" });
  }
};