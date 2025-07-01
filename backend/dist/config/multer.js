"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuração do multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        let folder = "uploads/"; // Pasta padrão (caso não seja imagem ou vídeo)
        // Verifica o tipo de arquivo
        if (file.mimetype.startsWith("image/")) {
            folder = "public/images/"; // Salva na pasta de imagens
        }
        else if (file.mimetype.startsWith("video/")) {
            folder = "public/videos/"; // Salva na pasta de vídeos
        }
        cb(null, folder); // Define a pasta de destino
    },
    filename: (req, file, cb) => {
        // Gera um nome único para o arquivo
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extname = path_1.default.extname(file.originalname); // Extensão do arquivo
        cb(null, uniqueSuffix + extname); // Nome do arquivo
    },
});
exports.upload = (0, multer_1.default)({ storage });
