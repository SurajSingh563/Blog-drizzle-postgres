import { 
    serial,
    integer,
    varchar,
    text,
    timestamp,
    pgTable
} from  "drizzle-orm/pg-core";

import{category,user} from "@/db/schema";
import {  relations, InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/singlestore/driver";
import { postTags } from "@/db/schema/postTags";
import { comment } from "@/db/schema/comment";
import { createInsertSchema } from "drizzle-zod";
import{z} from "zod";
export const post=pgTable("post",{

id:serial("id").primaryKey(),
userId:integer("user_id").notNull().references(()=>user.id),
title:varchar("title",{length:255}).notNull(),
shortDescription:text("shortDescription"),
content:text("content").notNull(),
categoryId:integer("category_id").references(()=>category.id).notNull(),
 created_at: timestamp("created_at",{mode:"string"}).defaultNow().notNull(),
 updated_at: timestamp("updated_at",{mode:"string"}).defaultNow().notNull(),


})

export const postRelations=relations(post,({one,many})=>({

user:one(user,{
    fields:[post.userId],
    references:[user.id],
}),                                                       
tags:many(postTags),                                   
comments:many(comment),
category:one(category,{
    fields:[post.categoryId],
    references:[category.id],
}),
})); 
////////////////////////    VALIDATION USING ZOD(A HELPER LIBRARY FOR DRIZZLE)    /////////////////////////////////
const baseSchema=createInsertSchema(post,{
    title:(schema)=>schema.min(1),
    shortDescription:(schema)=>schema.min(1).max(255),
    userId:(schema)=>schema.min(1),
    categoryId:(schema)=>schema.min(1),

}).pick({
    title:true,                         
    shortDescription:true,
    userId:true,
    categoryId:true,
    content:true,
});

export const postSchema=z.union([
z.object({
mode:z.literal("create"),
title:baseSchema.shape.title,
shortDescription:baseSchema.shape.shortDescription,
userId:baseSchema.shape.userId,
categoryId:baseSchema.shape.categoryId,
content:baseSchema.shape.content,
tagIds:z.array(z.number()),
}),
z.object({
mode:z.literal("edit"),
id:z.number().min(1),
title:baseSchema.shape.title,
shortDescription:baseSchema.shape.shortDescription,
userId:baseSchema.shape.userId,
categoryId:baseSchema.shape.categoryId,
content:baseSchema.shape.content,
tagIds:z.array(z.number()),
}),


])


      export type PostSchema=z.infer<typeof postSchema>;
      export type SelectPostModel=InferSelectModel<typeof post>;


 



