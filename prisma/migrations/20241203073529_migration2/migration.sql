/*
  Warnings:

  - The values [ToasterOwen] on the enum `Appliances` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `appliances` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `_IngredientToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Appliances_new" AS ENUM ('RiceCooker', 'PaniniPress', 'ToasterOven', 'Toaster', 'Microwave', 'HotPlate');
ALTER TABLE "Recipe" ALTER COLUMN "appliances" DROP DEFAULT;
ALTER TABLE "RecipeAppliance" ALTER COLUMN "appliance" TYPE "Appliances_new" USING ("appliance"::text::"Appliances_new");
ALTER TYPE "Appliances" RENAME TO "Appliances_old";
ALTER TYPE "Appliances_new" RENAME TO "Appliances";
DROP TYPE "Appliances_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userID_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "quantity" TEXT NOT NULL,
ADD COLUMN     "recipeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "appliances",
DROP COLUMN "categories",
DROP COLUMN "owner",
DROP COLUMN "userID",
ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "_IngredientToRecipe";

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeAppliance" (
    "id" SERIAL NOT NULL,
    "appliance" "Appliances" NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "RecipeAppliance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeAppliance" ADD CONSTRAINT "RecipeAppliance_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
