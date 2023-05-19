-- CreateTable
CREATE TABLE "Panda" (
    "nome" TEXT NOT NULL,
    "personalidade" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "vacinado" BOOLEAN NOT NULL,

    CONSTRAINT "Panda_pkey" PRIMARY KEY ("nome")
);
