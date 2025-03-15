import { Router } from "express";
import { getChaletById } from "../controllers/chalets.controller";

const router = Router();

// Rota GET /chalets/:id
router.get("/:id", getChaletById);

export default router;