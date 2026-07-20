CREATE TABLE "answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"prompt_id" uuid,
	"text" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_prompt_id_prompts_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id");