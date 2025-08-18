import { NextRequest, NextResponse } from "next/server";
import  {articles} from '../../../utils/data';
import { UpdateArticleDto } from "../../../utils/dtos";

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

export async function GET(request:NextRequest,{params}:Props){
const article =articles.find(a=>a.id === parseInt(params.id));
if(!article){
    return NextResponse.json({message:"Article not found"}, {status:404});
}
return NextResponse.json(article, {status:200});
} 


/**
 * @method PUT 
 * @route http://localhost/3000/api/articles or ~/api/articles/:id
 * @description Update Article 
 * @access public
 *  
 */

export async function PUT(request:NextRequest,{params}:Props){
const article =articles.find(a=>a.id === parseInt(params.id));
if(!article){
    return NextResponse.json({message:"Article not found"}, {status:404});
}

const body = (await request.json()) as UpdateArticleDto;
console.log(body);
return NextResponse.json({message:'article updated successfully'}, {status:200});
} 


/**
 * @method DELETE 
 * @route http://localhost/3000/api/articles or ~/api/articles/:id
 * @description Delete Article
 * @access public
 *  
 */

export async function DELETE(request:NextRequest,{params}:Props){
const article =articles.find(a=>a.id === parseInt(params.id));
if(!article){
    return NextResponse.json({message:"Article not found"}, {status:404});
}


return NextResponse.json({message:'article DELETED successfully'}, {status:200});
} 