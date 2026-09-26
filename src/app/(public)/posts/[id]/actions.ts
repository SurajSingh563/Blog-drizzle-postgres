"use server";
import { revalidatePath } from "next/cache";
import { CommentSchema, commentSchema } from "@/db/schema/comment";
import { wait } from "@/lib/utils";
import { comment } from "@/db/schema/comment";
import { db } from "@/db";
import { executeAction } from "@/db/utils/executeAction";

export async function createComment(data: CommentSchema) {
	return executeAction({
		actionFn:async()=>{
			const validatedData=commentSchema.parse(data);
	 		await db.insert(comment).values(validatedData);
			revalidatePath(`/posts/${validatedData.id}`);

		},
		isProtected:true,
		clientSuccessMessage:"Comment created successfully",
		serverErrorMessage:"createComment",
	});
}









