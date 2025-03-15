import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function revertPasswords() {
    try {
        const users = await prisma.useradmin.findMany();

        for (const user of users) {
            // Atualiza a senha para texto simples (substitua "senha_padrao" pela senha desejada)
            await prisma.useradmin.update({
                where: { id: user.id },
                data: { password: "senha_padrao" }, // Defina a senha em texto simples
            });

            console.log(`Senha do usuário ${user.username} atualizada para texto simples.`);
        }
    } catch (error) {
        console.error("Erro ao reverter senhas:", error);
    } finally {
        await prisma.$disconnect();
    }
}

revertPasswords();