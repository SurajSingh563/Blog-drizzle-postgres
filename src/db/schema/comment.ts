import{
AnyPgColumn,
integer,
pgTable,
text,
timestamp,
serial
} from "drizzle-orm/pg-core";                                                                                                                    
import {createInsertSchema} from "drizzle-zod";
import {z} from "zod";
import {user} from "@/db/schema";
import { post } from "@/db/schema/post";
import { relations } from "drizzle-orm";
export const comment=pgTable("comment",{                                                                                                         
id:serial("id").primaryKey(),
parentId:integer("parentId").references(():AnyPgColumn=>comment.id),
userId:integer("userId").references(()=>user.id).notNull(),                                                                      
content:text("content").notNull(),
postId:integer("post_Id").references(()=>post.id).notNull(),
 created_at: timestamp("created_at",{mode:"string"}).defaultNow().notNull(),
 updated_at: timestamp("updated_at",{mode:"string"}).defaultNow().notNull(),

})

                                                                              

export const commentRelations=relations(comment,({one})=>({
user:one(user,{
    fields:[comment.userId],
    references:[user.id],
}),
post:one(post,{
    fields:[comment.postId],
    references:[post.id],
})
 
}));


export const commentSchema=createInsertSchema(comment,{
postId:(schema)=>schema.min(1),
content:(schema)=>schema.min(1),
userId:(schema)=>schema.min(1)
                                                                                                                     
}).pick({
    postId:true,
    content:true,
    parentId:true,
    userId:true,
    id:true,
});
export type CommentSchema=z.infer<typeof commentSchema>







