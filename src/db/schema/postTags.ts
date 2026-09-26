import {integer,pgTable} from "drizzle-orm/pg-core";
import {  relations } from "drizzle-orm";
import { post } from "@/db/schema/post";
import { tag } from "@/db/schema/tag";
import { table } from "console";
import { primaryKey } from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";
import {z} from "zod";
export const postTags=pgTable("postTags",{
postId:integer("postId").notNull().references(()=>post.id),
tagId:integer("tagId").notNull().references(()=>tag.id),

},
(table)=>({
pk: primaryKey({columns:[table.postId,table.tagId]}),
})
);
             
export const postTagsRelations=relations(postTags,({one})=>({
tag:one(tag,{fields:[postTags.tagId],references:[tag.id]}),
post:one(post,{fields:[postTags.postId],references:[post.id]}),
}));                                       



export const postTagsSchema=createInsertSchema(postTags);
export type PostTagsSchema=z.infer<typeof postTagsSchema>;













