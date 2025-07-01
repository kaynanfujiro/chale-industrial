"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlugueis = exports.getAlugueis = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAlugueis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alugueis = yield prisma_1.default.aluguel.findMany();
        res.json(alugueis);
    }
    catch (error) {
        console.error("Erro ao buscar os alugueis", error);
        res.status(500).json({ message: "Erro ao buscar os alugueis" });
    }
});
exports.getAlugueis = getAlugueis;
const createAlugueis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("Dados recebidos:", req.body); // Log dos dados do formulário
        console.log("Arquivos recebidos:", req.files); // Log dos arquivos enviados
        // Extrai os dados do corpo da requisição
        const { name, description, type, value } = req.body;
        // Faz o type assertion para garantir que req.files seja do tipo MulterFiles
        const files = req.files;
        // Extrai os arquivos enviados
        const imageP = (_a = files.imageP) === null || _a === void 0 ? void 0 : _a[0]; // Imagem principal
        const images = files.images; // Array de imagens
        const video = (_b = files.video) === null || _b === void 0 ? void 0 : _b[0]; // Vídeo
        // Cria o novo aluguel no banco de dados
        const novoAluguel = yield prisma_1.default.aluguel.create({
            data: {
                name,
                description,
                type,
                value: parseInt(value), // Converte para número
                imageP: imageP ? imageP.path.replace(/\\/g, "/").replace("public/", "/") : "", // Remove o prefixo "public/"
                images: images ? images.map((img) => img.path.replace(/\\/g, "/").replace("public/", "/")).join(",") : "", // Remove o prefixo "public/" e junta em uma string
                video: video ? video.path.replace(/\\/g, "/").replace("public/", "/") : "", // Remove o prefixo "public/"
            },
        });
        console.log("Imagem principal:", imageP);
        console.log("Imagens gerais:", images);
        console.log("Vídeo:", video);
        console.log("Aluguel Criado:", novoAluguel);
        res.status(201).json(novoAluguel);
    }
    catch (error) {
        console.error("Erro ao criar o Aluguel:", error);
        res.status(500).json({ message: "Erro ao criar o aluguel" });
    }
});
exports.createAlugueis = createAlugueis;
