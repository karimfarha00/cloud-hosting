

import { CreateArticleSchema } from './../../utils/validationSchemas';
import { NextRequest, NextResponse} from 'next/server';

import {CreateArticleDto} from '../../utils/dtos';
import {  Article } from '@prisma/client';
import prisma from '../../utils/db';





/**
 * @method GET 
 * @route http://localhost/3000/api/articles or ~/api/articles
 * @description GET All Articles
 * @access public
 *  
 */





export async function GET(request:NextRequest){
   try{
const articles=await prisma.article.findMany();
    return NextResponse.json(articles,{status:200});
   }catch(error){
       console.error(error);
       return NextResponse.json({message:"Internal Server Error"},
        {status:500});
   }

}


/**
 * @method POST
 * @route http://localhost/3000/api/articles or ~/api/articles
 * @description Create a new Article
 * @access public
 *  
 */


export async function POST(request:NextRequest){
   try{
 const body =(await request.json()) as CreateArticleDto;

    //here i want to make a validation notice how we build it 
    const validation =CreateArticleSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({message:validation.error.issues[0].message},{status:400});
    }
const newArticle :Article = await prisma.article.create({
    data:{
        title:body.title,
        description:body.description,
       }
});


return NextResponse.json(newArticle,{status:201});
   } catch(error){
       console.error(error);
       return NextResponse.json({message:"Internal Server Error"},
        {status:500});
   }
}




