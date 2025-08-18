import {z} from 'zod';

export  const CreateArticleSchema=z.object({
    
    title:z.string().min(2,"Title is required and should be at least 2 characters long").max(100,"Title should not exceed 100 characters"),
    body:z.string().min(10,"Body is required and should be at least 10 characters long").max(500,"Body should not exceed 500 characters"),
})