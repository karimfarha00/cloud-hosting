

import {z} from 'zod';

export const CreateArticleSchema = z.object({
    title: z.string()
        .nonempty("Title is required")
        .min(2, "Title is required and should be at least 2 characters long")
        .max(100, "Title should not exceed 100 characters"),
    description: z.string()
        .nonempty("Description is required")
        .min(10, "Description is required and should be at least 10 characters long")
        .max(500, "Description should not exceed 500 characters"),
});

//register Schema
export const RegisterUserSchema = z.object({
    Username: z.string()
        .nonempty("Username is required")
        .min(2, "Username should be at least 2 characters long")
        .max(100, "Username should not exceed 100 characters"),
        //.optional this make the user if email is not provided
    email: z.string()
        .nonempty("Email is required")
        .email()
        .refine(val => !!val, { message: "Invalid email format" }),
    password: z.string()
        .nonempty("Password is required")
        .min(6, "Password should be at least 6 characters long")
        .max(100, "Password should not exceed 100 characters"),
});