import { NextRequest, NextResponse} from 'next/server';
import {articles} from "../../utils/data";

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
 * import {NextRequest, NextResponse} from 'next/server';
 * export function GET (request:NextRequest){
 * console.log(request);
 * return NextResponse.json(articles,{status:200});
 * }
 */