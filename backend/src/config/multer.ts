import multer from "multer";
import path from "path";

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/"; // Pasta padrão (caso não seja imagem ou vídeo)

    // Verifica o tipo de arquivo
    if (file.mimetype.startsWith("image/")) {
      folder = "public/images/"; // Salva na pasta de imagens
    } else if (file.mimetype.startsWith("video/")) {
      folder = "public/videos/"; // Salva na pasta de vídeos
    }

    cb(null, folder); // Define a pasta de destino
  },
  filename: (req, file, cb) => {
    // Gera um nome único para o arquivo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname); // Extensão do arquivo
    cb(null, uniqueSuffix + extname); // Nome do arquivo
  },
});

export const upload = multer({ storage });