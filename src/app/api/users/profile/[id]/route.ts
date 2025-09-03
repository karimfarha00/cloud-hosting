
import prisma from '@/app/utils/db';
import { NextRequest, NextResponse } from "next/server";

import {verifyToken} from "../../../../utils/verifyToken"





/**
 * @method DELETE
 * @route http://localhost:3002/api/users/profile/[id]
 * @description Delete User Profile
 * @access private(only user himself can delete his account)(authorizations means delete the account for him not another any person)
 *  
 */


interface Props{
    params:{id:string}
}

export async function DELETE(request:NextRequest,{params}:Props){
   try{
  
    //3am nekhod user from DB
const user=await prisma.user.findUnique({
    where:{
        id:parseInt(params.id)
    }
  
});
   
  if(!user){
        return NextResponse.json(
            {message:'User not found'},
            {status:404});
    }


//hon 3am nekkhod token from header i put this token in header to delete the account 
// we remove this code because put it inside the middleware and check for the token in the middleware 
    // const authToken=request.headers.get('authToken')as string;
// if(!authToken){
//     return NextResponse.json(
//         {message:'not token provided , access denied'},
//         {status:401});// Unauthorized (enta ma 3amel login )
// }

//now we need to take all information from the cookies 
// const jwtToken=request.cookies.get("jwtToken");  
// const token=jwtToken?.value as string;





//this line of code open the encryption of the token 
const userFromToken=verifyToken(request);


if(userFromToken!== null &&  userFromToken.id === user.id){
await prisma.user.delete({
where:{id:parseInt(params.id)}
});
return NextResponse.json(
    {message:'your profile (account) has been deleted'},
    {status:200});
}
return NextResponse.json(
    {message:"Only user himself can delete his profile,forbidden"},
    {status:403});//403 Forbidden ya3ni mamnu3


}catch(error){
    console.log(error);
    return NextResponse.json (
        {message:'Server Error'},
        {status:500});
   }
}


