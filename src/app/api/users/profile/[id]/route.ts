import {NextRequest,NextResponse} from 'next/server';
import prisma from '@/app/utils/db';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/app/utils/types';


interface Props{
    params:{id:string}
}

/**
 * @method DELETE
 * @route http://localhost:3002/api/users/profile/[id]
 * @description Delete User Profile
 * @access private(only user himself can delete his account)
 *  
 */

export async function DELETE(request:NextRequest,{params}:Props){
   //but this code is public any person can delete this account ({i need to make it private how !!!!1})
    try{
        
const user=await prisma.user.findUnique({
    where :{
        id:parseInt(params.id)
    }
});
if(!user){
return NextResponse.json({error:'User not found'},{status:404});
}



const authToken=request.headers.get('authToken') as string;
if(!authToken){
return NextResponse.json({error:'Not token provided,access denied'},{status:401});//401 UnAuthorized
}
//this line of code open the encryption of this user
const userFromToken= jwt.verify(authToken,process.env.JWT_SECRET as string) as JWTPayload; 


if(userFromToken.id === user.id){
await prisma.user.delete({
    where:{
        id:parseInt(params.id)
    }
});

return NextResponse.json({message:'User deleted successfully'},{status:200});
}
return NextResponse.json({message:"Only user himself can delete his profile,forbidden"},{status:403});//403 Forbidden ya3ni mamnu3 


}catch(error){
    console.log(error);
    return NextResponse.json({error:'Server Error'},{status:500});
   }
}