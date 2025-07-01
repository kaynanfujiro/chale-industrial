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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function revertPasswords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma.userAdmin.findMany();
            for (const user of users) {
                // Atualiza a senha para texto simples (substitua "senha_padrao" pela senha desejada)
                yield prisma.userAdmin.update({
                    where: { id: user.id },
                    data: { password: "senha_padrao" }, // Defina a senha em texto simples
                });
                console.log(`Senha do usuário ${user.username} atualizada para texto simples.`);
            }
        }
        catch (error) {
            console.error("Erro ao reverter senhas:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
revertPasswords();
