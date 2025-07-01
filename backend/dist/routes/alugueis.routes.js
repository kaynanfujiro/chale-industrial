"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alugueis_controller_1 = require("../controllers/alugueis.controller");
const multer_1 = require("../config/multer");
const router = express_1.default.Router();
// Rota para criar um aluguel
router.post("/", multer_1.upload.fields([
    { name: "imageP", maxCount: 1 },
    { name: "images", maxCount: 10 }, // Até 10 imagens
    { name: "video", maxCount: 1 },
]), alugueis_controller_1.createAlugueis);
// Rota para listar aluguéis
router.get("/", alugueis_controller_1.getAlugueis);
exports.default = router;
