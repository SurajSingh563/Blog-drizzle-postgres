import {DB} from "@/db";
import {category, CategorySchema} from "@/db/schema/category";

const mock:CategorySchema[]=[
{
    name:"Node.js"
},                                                                                       
{
    name:"React"
},
{
     name:"Python"
},
{
     name:"JavaScript"
},
{
     name:"Algorithms"
},
{
     name:"Devops"
},
{
    name:"APIs"
}


]
export async function seed(db:DB){
    await db.insert(category).values(mock);
}







