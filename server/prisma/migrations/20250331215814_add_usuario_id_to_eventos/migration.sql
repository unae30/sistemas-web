/*
  Warnings:

  - Added the required column `usuarioId` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_eventos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo_evento" TEXT NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL,
    "local" TEXT NOT NULL,
    "usuarioId" INTEGER, -- Permitir valores nulos temporariamente
    CONSTRAINT "eventos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_eventos" ("data_fim", "data_inicio", "descricao", "id", "local", "tipo_evento", "titulo") SELECT "data_fim", "data_inicio", "descricao", "id", "local", "tipo_evento", "titulo" FROM "eventos";
DROP TABLE "eventos";
ALTER TABLE "new_eventos" RENAME TO "eventos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
