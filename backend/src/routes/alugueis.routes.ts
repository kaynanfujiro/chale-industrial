import express from "express";
import { createAlugueis, getAlugueis } from "../controllers/alugueis.controller";
import { upload } from "../config/multer";

const router = express.Router();

// Rota para criar um aluguel
router.post("/", upload.fields([
  { name: "imageP", maxCount: 1 }, 
  { name: "images", maxCount: 10 }, // Até 10 imagens
  { name: "video", maxCount: 1 },
]), createAlugueis);

// Rota para listar aluguéis
router.get("/", getAlugueis);

export default router;