CREATE TABLE "postTags" (
	"postId" integer NOT NULL,
	"tagId" integer NOT NULL,
	CONSTRAINT "postTags_postId_tagId_pk" PRIMARY KEY("postId","tagId")
);
--> statement-breakpoint
ALTER TABLE " postTags" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE " postTags" CASCADE;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "parentId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "postTags" ADD CONSTRAINT "postTags_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postTags" ADD CONSTRAINT "postTags_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tag"("id") ON DELETE no action ON UPDATE no action;