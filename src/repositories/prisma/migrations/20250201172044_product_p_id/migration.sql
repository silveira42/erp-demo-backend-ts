/*
  Warnings:

  - You are about to drop the column `productId` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `productPId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_productId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "productId",
ADD COLUMN     "productPId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_productPId_fkey" FOREIGN KEY ("productPId") REFERENCES "Products"("pId") ON DELETE NO ACTION ON UPDATE NO ACTION;
