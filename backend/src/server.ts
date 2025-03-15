import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import alugueisRoutes from "./routes/alugueis.routes";
import chaletRoutes from "./routes/chalet.routes";
import userRoutes from "./routes/user.routes"; // Importando a rota de usuário

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
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

app.get("/user", (req, res) => {
  res.send("Servidor rodando!");
});

app.use("/images", express.static(path.join(__dirname, "../public/images")));

//Rotas
app.use("/user", userRoutes);
app.use("/alugueis", alugueisRoutes);
app.use("/chalets", chaletRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
