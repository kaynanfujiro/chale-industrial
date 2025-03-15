import { Router } from "express";
import { getAlugueis } from "../controllers/alugueis.controller";

const router = Router();

router.get("/", getAlugueis);

export default router;