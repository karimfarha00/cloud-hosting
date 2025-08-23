import { NextRequest, NextResponse } from "next/server";

import { UpdateArticleDto } from "../../../utils/dtos";
import prisma from "../../../utils/db";







interface Props{
    params:{id:string}
}


/**
 * @method GET 
 * @route http://localhost/3000/api/articles or ~/api/articles/:id
 * @description GET Article by ID
 * @access public
 *  
 */



export async function GET(request:NextRequest,{params}:Props ){
try{
    const article=await prisma.article.findUnique({
        where:{
            id:parseInt(params.id)
        }
    });
if(!article){
    return NextResponse.json({message:"Article not found"}, {status:404});
}
return NextResponse.json(article, {status:200});
} catch(error){
    console.error(error);
    return NextResponse.json({message:"Internal Server Error"},
     {status:500});
}
}




/**
 * @method PUT 
 * @route http://localhost/3000/api/articles or ~/api/articles/:id
 * @description Update Article 
 * @access public
 *  
 */



export async function PUT(request:NextRequest, {params}:Props){
   try {
     const article =await prisma.article.findUnique({
        where:{
            id:parseInt(params.id)
        }
    });
    if(!article){
        return NextResponse.json({message:"Article not found"}, {status:404});
    }
    // throw new Error() this make a fake error to test the catch(error)
    const body=(await request.json()) as UpdateArticleDto;
   const updateArticle= await prisma.article.update({
        where :{id:parseInt(params.id)},
        data:{
            title:body.title,
            description:body.description
        }
    })
    return NextResponse.json(updateArticle, {status:200});
   }catch(error){
    console.error(error);
    return NextResponse.json({message:"Internal Server Error"},
     {status:500});
   }
}












/**
 * @method DELETE 
 * @route http://localhost/3000/api/articles or ~/api/articles/:id
 * @description Delete Article
 * @access public
 *  
 */




export async function DELETE(request:NextRequest, {params}:Props){
    try{
        // this to take the information(article) from the DATABASE
    const article =await prisma.article.findUnique({
        where:{
            id:parseInt(params.id)
        }
    })
    if(!article){
        return NextResponse.json({message:"Article not found"}, {status:404});
    }
    const deleteArticle=await prisma.article.delete({
        where:{
            id:parseInt(params.id)
        }
    });
     return NextResponse.json(deleteArticle, {status:200});
    }catch(error){
        console.log(error);
        return NextResponse.json({message:"Internal Server Error"},
     {status:500});
    }

}