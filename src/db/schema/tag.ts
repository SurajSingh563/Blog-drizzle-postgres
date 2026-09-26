import{pgTable,serial,varchar} from "drizzle-orm/pg-core";
import { postTags } from "@/db/schema/postTags";
import {  relations } from "drizzle-orm";
import{createInsertSchema} from  "drizzle-zod";
import {z} from "zod";
export const tag=pgTable("tag",{
    id:serial("id").primaryKey(),
    name:varchar("name", {length:255}).notNull().unique(),
});

//////////////////RELATIONS  //////////////////////////////////////////////
export const  tagRelations=relations(tag,({many})=>({

 postToTag:many(postTags),                             
}));
                                   

///////////////////////////// VALIDATIONS //////////////////////////////////
export const tagSchema=createInsertSchema(tag);


//////////////////FOR SEEDING ////////////////////////////////////////////// 
export type TagSchema=z.infer<typeof tagSchema>;





  
   
   
   





