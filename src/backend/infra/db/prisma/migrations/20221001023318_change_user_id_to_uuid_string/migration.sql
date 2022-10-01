/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_users_id_fkey`;

-- AlterTable
ALTER TABLE `posts` MODIFY `users_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
