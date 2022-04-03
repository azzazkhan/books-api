-- DropForeignKey
ALTER TABLE `bookmarks` DROP FOREIGN KEY `bookmarks_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `bookmarks` ADD CONSTRAINT `bookmarks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
