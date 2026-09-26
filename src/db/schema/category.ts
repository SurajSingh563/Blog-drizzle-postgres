import { varchar,serial,pgTable } from "drizzle-orm/pg-core";
import {  relations } from "drizzle-orm";
import { post } from "@/db/schema/post";
import {z} from "zod";
import{createInsertSchema} from "drizzle-zod";




export const category=pgTable("category",{
id:serial("id").primaryKey(),
name:varchar("name",{length:255}).notNull().unique(),


});

export const categoryRelations=relations(category,({many})=>({
posts:many(post),
}));
export const categorySchema=createInsertSchema(category);
export type CategorySchema=z.infer<typeof categorySchema>;


























                         











