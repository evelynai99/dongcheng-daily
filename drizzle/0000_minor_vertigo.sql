CREATE TABLE `procurement_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`district` text NOT NULL,
	`project_id` text,
	`title` text NOT NULL,
	`purchaser` text,
	`notice_type` text NOT NULL,
	`status` text NOT NULL,
	`amount` text,
	`published_at` text NOT NULL,
	`source_name` text NOT NULL,
	`source_type` text NOT NULL,
	`source_url` text NOT NULL,
	`collected_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `procurement_source_url_idx` ON `procurement_records` (`source_url`);--> statement-breakpoint
CREATE TABLE `soe_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`district` text NOT NULL,
	`enterprise` text,
	`ownership_level` text,
	`event_type` text NOT NULL,
	`title` text NOT NULL,
	`summary` text,
	`published_at` text NOT NULL,
	`source_name` text NOT NULL,
	`source_type` text NOT NULL,
	`source_url` text NOT NULL,
	`collected_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `soe_source_url_idx` ON `soe_records` (`source_url`);