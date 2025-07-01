"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const alugueis_routes_1 = __importDefault(require("./routes/alugueis.routes"));
const chalet_routes_1 = __importDefault(require("./routes/chalet.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const reservas_routes_1 = __importDefault(require("./routes/reservas.routes")); // Corrigindo a importação
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configura o CORS para permitir o frontend
app.use((0, cors_1.default)({
    origin: 'https://grupoindustrial.kswebsolutions.com.br',
    credentials: true,
}));
app.use(express_1.default.json());
// Rota para a raiz (/)
app.get("/", (_req, res) => {
    res.send("Servidor rodando!");
});
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app.use("/videos", express_1.default.static(path_1.default.join(__dirname, "../public/videos")));
// Rotas principais
app.use("/user", user_routes_1.default);
app.use("/alugueis", alugueis_routes_1.default);
app.use("/chalets", chalet_routes_1.default);
app.use("/reservas", reservas_routes_1.default); // Corrigindo a rota
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
