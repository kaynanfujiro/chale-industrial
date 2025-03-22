import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import alugueisRoutes from "./routes/alugueis.routes";
import chaletRoutes from "./routes/chalet.routes";
import userRoutes from "./routes/user.routes";
import reservaRoutes from "./routes/reservas.routes"; // Corrigindo a importação

dotenv.config();

const app = express();

// Configura o CORS para permitir o frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Rota para a raiz (/)
app.get("/", (_req, res) => {
  res.send("Servidor rodando!");
});

app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/videos", express.static(path.join(__dirname, "../public/videos")));

// Rotas principais
app.use("/user", userRoutes);
app.use("/alugueis", alugueisRoutes);
app.use("/chalets", chaletRoutes);
app.use("/reservas", reservaRoutes); // Corrigindo a rota

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
