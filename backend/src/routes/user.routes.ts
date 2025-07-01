import { Router } from "express";
import { login } from "../controllers/user.controller";

const router = Router();

// Definição da rota de login
router.post("/login", async (req, res) => {
    await login(req, res);
});

export default router;