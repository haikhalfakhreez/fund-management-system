CREATE TABLE `accountBalance` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`balance` real NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `balanceHistory` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`balance` real NOT NULL,
	`change` real NOT NULL,
	`changeType` text NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `fund` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`ticker` text NOT NULL,
	`description` text,
	`inceptionDate` integer NOT NULL,
	`currentYtd` real NOT NULL,
	`currentNav` real NOT NULL,
	`investmentType` text NOT NULL,
	`isShariah` integer DEFAULT false,
	`ytdHistory` text NOT NULL,
	`navHistory` text NOT NULL,
	`launchPrice` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `investment` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`fundId` text NOT NULL,
	`units` real,
	`amount` real,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fundId`) REFERENCES `fund`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`fundId` text NOT NULL,
	`transactionType` text NOT NULL,
	`units` real NOT NULL,
	`amount` real NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fundId`) REFERENCES `fund`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`emailVerified` integer,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accountBalance_userId_unique` ON `accountBalance` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `investment_userId_fundId_unique` ON `investment` (`userId`,`fundId`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);