import jwt from 'jsonwebtoken';
import { JWTPayload } from './types';




export function generateJWT(payload: JWTPayload){
    const privateKey=process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, privateKey, { expiresIn: '30d' });
    return token;
}