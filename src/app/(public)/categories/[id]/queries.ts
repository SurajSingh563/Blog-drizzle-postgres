import { db } from "@/db";
import { post } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuery";
import { wait } from "@/lib/utils";

import { eq,count } from "drizzle-orm";
import { desc } from "drizzle-orm";
export async function getCategoryPostsCount(categoryId: number) {
	return executeQuery({
		queryFn:async ()=>
			await db
		.select({count:count()})
		.from(post)
		.where(eq(post.categoryId,categoryId))
		.then((res)=> res[0].count),
		isProtected:false,
	})
}

export async function getPostsByCategoryId(
	page: number,
	limit: number,
	categoryId: number
) {
	return executeQuery({
		queryFn:async ()=>
			await db
		.select({
			id:post.id,
			title:post.title,
			shortDescription:post.shortDescription,
			updatedAt:post.updated_at, 
		})
		.from(post)
		.offset(page * limit) 
		.limit(limit)
		.where(eq(post.categoryId,categoryId))
		.orderBy(desc(post.created_at)),

		serverErrorMessage:"getCategoryPostsCount",
		isProtected:false,

	})
}
