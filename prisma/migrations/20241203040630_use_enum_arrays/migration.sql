-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::"Category"[],
ALTER COLUMN "appliances" SET DEFAULT ARRAY[]::"Appliances"[];
