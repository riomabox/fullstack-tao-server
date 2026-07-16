ALTER TABLE "prompts" ADD COLUMN "type" varchar(10);--> statement-breakpoint
ALTER TABLE "prompts" ADD COLUMN "started_date" timestamp DEFAULT now() NOT NULL;