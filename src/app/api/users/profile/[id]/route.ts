import  bcrypt  from 'bcryptjs';

import prisma from '@/app/utils/db';
import { NextRequest, NextResponse } from "next/server";

import {verifyToken} from "../../../../utils/verifyToken"
import { UpdateUserDto } from '@/app/utils/dtos';
 





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


if(userFromToken!== null && userFromToken.id === user.id){
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


/**
 * @method GET
 * @route http://localhost:3002/api/users/profile/[id]
 * @description GET profile by Id
 * @access private(only user himself can GET his account)(authorizations means delete the account for him not another any person)
 *  
 */

export async function GET(request:NextRequest,{params}:{ params: { id: string } }){
try{

const user =await prisma.user.findUnique({
    where:{id:parseInt(params.id)},
    select:{
        id:true,
        email:true,
        Username:true,
        createdAt:true,
        isAdmin:true
    }
});
if(!user){
    return NextResponse.json({message:'user not found'},{status:404});
}

const userFromToken=verifyToken(request);
  
if(userFromToken ===null || userFromToken.id !== user.id){
    return NextResponse.json(
        {message:'you are not allowed ,access denied'},
        {status:403},
    )
}

return NextResponse.json(user,{status:200});


}catch(error){
    console.log(error)
    return NextResponse.json(
        {message:'internal server error'},
        {status:500}
    )
}
}



/**
 * @method PUT
 * @route http://localhost:3002/api/users/profile/[id]
 * @description Update profile by Id
 * @access private(only user himself can Update his account)(authorizations means delete the account for him not another any person)
 *  
 */


export async function PUT(request:NextRequest,{params}:Props){
    try{
const user = await prisma.user.findUnique({
    where:{id:parseInt(params.id)},
    select:{
         id:true,
        email:true,
        Username:true,
        createdAt:true,
        isAdmin:true
    }

});

if(!user){
   return NextResponse.json({message:'user not found'},{status:404});
}

//now we take the user from the token (userFromToken)
const userFromToken=verifyToken(request);
if(userFromToken===null || userFromToken.id !==user.id){
    return NextResponse.json(
        {message:'you are not allowed , access denied'},
        {status:403})
}

const body =await request.json() as UpdateUserDto;

//we make this before the updateuser if i want to edit the password keep it encrypted
if(body.password){
    const salt =await bcrypt.genSalt(10);
    body.password=await bcrypt.hash(body.password,salt);
}

//this make UPDATED on the user 
const updatedUser=await prisma.user.update({
where:{id:parseInt(params.id)},
data:{
    Username:body.username,
    email:body.email,
    password:body.password
},
select:{
     id:true,
        email:true,
        Username:true,
        createdAt:true,
        isAdmin:true
}
});
return NextResponse.json(updatedUser,{status:200});

    }catch(error){
    console.log(error)
    return NextResponse.json(
        {message:'internal server error'},
        {status:500}
    )
}
}

