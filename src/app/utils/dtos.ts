
export interface CreateArticleDto{
    title:string;
    description:string;
}


export interface UpdateArticleDto{
    title?:string;
    description?:string;
}

export interface RegisterUserDto{
    Username:string;
    email:string;
    password:string;
}