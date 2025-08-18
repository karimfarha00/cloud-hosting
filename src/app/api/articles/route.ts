import { CreateArticleSchema } from './../../utils/validationSchemas';
import { NextRequest, NextResponse} from 'next/server';
import {articles} from "../../utils/data";
import { Article } from '@/app/utils/types';
import {CreateArticleDto} from '../../utils/dtos';

/**
 * @method GET 
 * @route http://localhost/3000/api/articles or ~/api/articles
 * @description GET All Articles
 * @access public
 *  
 */



export function GET(request: NextRequest){
    console.log(request);
    return NextResponse.json(articles , {status:200});

}


/**
 * @method POST
 * @route http://localhost/3000/api/articles or ~/api/articles
 * @description Create a new Article
 * @access public
 *  
 */
export async function POST(request:NextRequest){
    const body= (await request.json()) as CreateArticleDto;
     
    // if(body.title === "" || body.title.length<2){
    //     return NextResponse.json({message:"Title is required and should be at least 2 characters long"}, {status:400});
    // }


const validation= CreateArticleSchema.safeParse(body);
if(!validation.success){
    return NextResponse.json({message:validation.error.issues[0].message},{status:400});
}


    const newArticle: Article={
        title:body.title,
        body:body.body,
        id:articles.length +1,
        userID:200
    }
    articles.push(newArticle);
    return NextResponse.json(newArticle,{status:201});
}



/**
 * @method POST
 * @route http://localhost/3000/api/articles or ~/api/articles
 * @description Create a new Article
 * @access public
 *  
 */

