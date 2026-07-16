ALTER TABLE "prompts" ALTER COLUMN "started_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "prompts" ALTER COLUMN "started_date" DROP NOT NULL;