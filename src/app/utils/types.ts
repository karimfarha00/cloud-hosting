

export type Article={
    id:number;
    userID:number;
    title:string;
    body:string;
}

export type JWTPayload={
    id:number;
    isAdmin:boolean;
    username:string;
}