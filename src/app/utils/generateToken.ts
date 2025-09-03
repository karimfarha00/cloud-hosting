// import jwt from 'jsonwebtoken';
// import { JWTPayload } from './types';
import { serialize } from 'cookie';




// //Generate JWT Token
// export function generateJWT(payload: JWTPayload){
//     const privateKey=process.env.JWT_SECRET as string;
//     const token = jwt.sign(payload, privateKey, { expiresIn: '30d' });
//     return token;
// }


// //Set Cookie with JWT

// export function setCookie(jwtPayload: JWTPayload): string {
//     const token = generateJWT(jwtPayload);
//     const cookie=serialize("jwtToken",token,{
//     httpOnly:true,
//     //this secure for the cookies if i use development=http and production=https.
//     secure:process.env.NODE_ENV === "production",
//     //and this line gives more secure for the cookies
//     sameSite:'strict',
//     path:'/',
//     maxAge:60*60*24*30, //30 days
// });
// return cookie;
// }

// //

import jwt from 'jsonwebtoken';
import {JWTPayload} from './types';


export function generateJWT(jwtPayload:JWTPayload): string{
    const privateKey = process.env.JWT_SECRET as string;
    const token=jwt.sign(
    jwtPayload,
    privateKey,
    {
        expiresIn:'30d'
});
return token;
}

//Set Cookie with JWT
export function setCookie(jwtPayload:JWTPayload):string{
    const token=generateJWT(jwtPayload);
    const cookie=serialize("jwtToken",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:'strict',
        path:'/',
        maxAge:60*60*24*30, //30 days
    });
    return cookie;
}