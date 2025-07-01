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
exports.getChaletById = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getChaletById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const chale = yield prisma_1.default.aluguel.findUnique({
            where: { id: Number(id) }, // Converte o id para número
        });
        if (!chale) {
            res.status(404).json({ message: "Chalé não encontrado" });
            return;
        }
        res.json(chale);
    }
    catch (error) {
        console.error("Erro ao buscar chalé:", error);
        res.status(500).json({ message: "Erro ao buscar chalé" });
    }
});
exports.getChaletById = getChaletById;
