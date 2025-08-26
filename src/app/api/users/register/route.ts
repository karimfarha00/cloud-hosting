import {NextRequest,NextResponse} from 'next/server';
import type { RegisterUserDto } from '@/app/utils/dtos'; // Adjust the import path as needed
import { RegisterUserSchema } from '@/app/utils/validationSchemas';
import prisma from '@/app/utils/db';
import bcrypt from 'bcryptjs';
import { generateJWT } from '@/app/utils/generateToken';
import { JWTPayload } from '@/app/utils/types';
/**
 * @method POST
 * @route http://localhost:3002/api/users/register
 * @description Create New User {sign up}
 * @access public
 *  
 */


export async function POST(request:NextRequest){
    try{
const body =await request.json() as RegisterUserDto;
const validation=RegisterUserSchema.safeParse(body);
if(!validation.success){
    return NextResponse.json({error:validation.error.issues[0].message},
      {status:400});
}

//check if the email is already exist

const user=await prisma.user.findUnique({
    where:{email:body.email}
    
});

if (user){
    return NextResponse.json({error:'User already exists'},
        {status:400});
}

//tshfer the password
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(body.password,salt);

//take the data from the user 
const newUser=await prisma.user.create({
data:{
    Username:body.Username,
    email:body.email,
    password:hashedPassword
},
//shu bdi 2e3rud lal user make select 
select:{
    Username:true,
    id:true,
    isAdmin:true,
}


});

const jwtPayload:JWTPayload={
    id:newUser.id,
    isAdmin:newUser.isAdmin,
    username:newUser.Username
}

const token = generateJWT(jwtPayload);
return NextResponse.json({ ...newUser, token },
     { status: 201 });

} catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' },
        { status: 500 });
}
}



















