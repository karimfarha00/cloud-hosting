import { NextRequest,NextResponse } from "next/server";
import {cookies} from 'next/headers';



/**
 * @method GET
 * @route http://localhost:3002/api/users/logout
 * @description User (Logout) means (De-authentication) tasbet nafes iza email and password correct 
 * @access public
 */
export async function GET(request: NextRequest) {
    try {
        //to make a logout only we need to delete the cookie so here we make a logout 
       (await cookies()).delete("jwtToken");
       return NextResponse.json({ message: "Logged out successfully" },{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

