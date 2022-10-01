/*
  Warnings:

  - Added the required column `content` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumb` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `thumb` VARCHAR(191) NOT NULL;
