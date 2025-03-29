-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'APROVADO', 'REPROVADO');

-- CreateTable
CREATE TABLE "Aluguel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageP" TEXT NOT NULL,
    "images" TEXT[],
    "video" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Aluguel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "startDate" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aluguelId" INTEGER NOT NULL,

    CONSTRAINT "Reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAdmin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdmin_email_key" ON "UserAdmin"("email");

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_aluguelId_fkey" FOREIGN KEY ("aluguelId") REFERENCES "Aluguel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
