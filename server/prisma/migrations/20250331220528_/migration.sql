/*
  Warnings:

  - Made the column `usuarioId` on table `eventos` required. This step will fail if there are existing NULL values in that column.

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
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "eventos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_eventos" ("data_fim", "data_inicio", "descricao", "id", "local", "tipo_evento", "titulo", "usuarioId") SELECT "data_fim", "data_inicio", "descricao", "id", "local", "tipo_evento", "titulo", "usuarioId" FROM "eventos";
DROP TABLE "eventos";
ALTER TABLE "new_eventos" RENAME TO "eventos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
