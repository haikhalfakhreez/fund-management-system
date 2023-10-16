CREATE TABLE `comparisons` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`fundIds` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
