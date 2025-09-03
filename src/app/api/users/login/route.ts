import {NextRequest,NextResponse} from 'next/server';
import {LoginUserDto} from '../../../utils/dtos';
import { LoginUserSchema } from '@/app/utils/validationSchemas';
import prisma from '@/app/utils/db';
import bcrypt from 'bcryptjs';
import { setCookie } from '@/app/utils/generateToken';




/**
 * @method POST
 * @route http://localhost:3002/api/users/login
 * @description User (Login) means (Authentication) tasbet nafes iza email and password correct 
 * @access public
 *  
*/


export async function POST(request:NextRequest){
    try{
        //hon 3m nekhod bayanet from request or mustakhdem 
        const body = await request.json() as LoginUserDto;

        const validation = LoginUserSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({message:validation.error.issues[0].message}, 
            { status: 400 });
        }
//now we want to take the data of register email from database prisma if registered or not check also 
const user =await prisma.user.findUnique({
    where:{
        email:body.email
    }
});
//if user not register 
if (!user){
    return NextResponse.json(
        {message:'invalid email or password'},
        {status:400});
}

//now we want to open the  encryption of password (hashpassword) and now we want to make check on password if correct or not to login !!!
const isPasswordMatch=await bcrypt.compare(body.password,user.password);
if(!isPasswordMatch){
    return NextResponse.json(
        {message:'invalid email or password'},
        {status:400});
}

//now after check and the email and passowrd correct the user login 
//This code make and ID for every User in server to know each one from ID




const cookie=setCookie({
    id:user.id, 
    isAdmin:user.isAdmin,
    username:user.Username});

return NextResponse.json(
    { message: "Authenticated" },
     {
         status: 200,
         headers:{"Set-Cookie":cookie}
        });

       
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' },
            { status: 500 });
    }
}









