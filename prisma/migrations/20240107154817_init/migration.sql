-- CreateTable
CREATE TABLE "Fruit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "genus" TEXT NOT NULL,
    "nutritionsId" INTEGER NOT NULL,
    CONSTRAINT "Fruit_nutritionsId_fkey" FOREIGN KEY ("nutritionsId") REFERENCES "Nutritions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Nutritions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calories" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "sugar" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL
);
