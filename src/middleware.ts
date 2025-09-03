import {NextRequest,NextResponse} from 'next/server';

// export function middleware(request:NextRequest) {
// //    const authToken=request.headers.get('authToken') as string;

//    const jwtToken=request.cookies.get("jwtToken");
//    const token=jwtToken?.value as string;


// if(!token && request.method === "DELETE"){
// return NextResponse.json({error:'Not token provided,access denied , message from middleware'},
//     {status:401});//401 UnAuthorized
// }
// }

// //houn b7aded this middleware for which part of project work by this code 
// export const config={
//     matcher:["/api/users/profile/:path*"]
// }

export function middleware(request:NextRequest){
   
   //takes the information from cookies
   const jwtToken=request.cookies.get("jwtToken");
   const token =jwtToken?.value as string;
   if(!token && request.method === "DELETE"){
       return NextResponse.json({error:'Not token provided,access denied , message from middleware'},
           {status:401});//401 UnAuthorized
   }
}

export const config={
    matcher:["/api/users/profile/:path*"]
}