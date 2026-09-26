import{
    integer,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { relations, InferSelectModel } from "drizzle-orm";
import { post } from "@/db/schema/post";
import { comment } from "@/db/schema/comment";
import { createInsertSchema } from "drizzle-zod";
import {z} from "zod";
export const user =pgTable("user",{

id:serial("id").primaryKey().notNull(),
fullName:varchar("fullName",{length:255}).notNull(),
age:integer().notNull(),
password:varchar("password",{length:255}).notNull(),
email:varchar("email",{length:255}).notNull(),
 created_at: timestamp("created_at",{mode:"string"}).defaultNow().notNull(),
 updated_at: timestamp("updated_at",{mode:"string"}).defaultNow().notNull(),

});

export const userRelations=relations(user,({many})=>({
 
    posts:many(post),
    comment:many(comment),
}))

const baseSchema=createInsertSchema(user,{
    fullName:(schema)=>schema.min(1),
    password:(schema)=>schema.min(1),
    age:z.coerce.number().min(18).max(99),
    email:(schema)=>schema.email(),                       

}).pick({
    fullName:true,password:true,age:true,email:true
});

export const userSchema=z.union([
z.object({
mode:z.literal("signUp"),
email:baseSchema.shape.email,
password:baseSchema.shape.password,
fullName:baseSchema.shape.fullName,
age:baseSchema.shape.age,

}),
z.object({
    mode:z.literal("update"),
    fullName:baseSchema.shape.fullName,
    age:baseSchema.shape.age,
    id:z.number().min(1),
}),
z.object({
   mode:z.literal("signIn") ,
   email:baseSchema.shape.email,
   password:baseSchema.shape.password,
})
]);

   export type UserSchema=z.infer<typeof userSchema>;
   export type SelectUserModel=InferSelectModel<typeof user>;
   
  















