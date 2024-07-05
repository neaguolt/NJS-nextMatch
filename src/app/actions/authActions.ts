'use server';

import { signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { LoginSchema } from '@/lib/schemas/loginSchema';
import {RegisterSchema, registerSchema} from '@/lib/schemas/registerSchema'
import { ActionResult } from '@/type';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth';

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>>{
    try {
        const result= await signIn('credentials',{
            email: data.email,
            password: data.password,
            redirect: false,
        });
        console.log(result);
        
        return {status: 'success', data: "Login success" };
    } catch (error) {
        console.log(error);
        if(error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {status: 'error', error: 'Invalid credentials'};
                default:
                    return {status: 'error', error: 'Something went wrong'};
            }            
        } else {
            return {status: 'error', error: 'Something else went wrong'}
        }
    }
}

export async function registerUser(data: RegisterSchema):Promise<ActionResult<User>> {
    try {
    //validate data on server side
    const validated = registerSchema.safeParse(data);

    // The result of the safeParse method returns an object 
    // This object contains two properties:
    //  - success: A boolean indicating whether the validation was successful.
    //  - data or error: Depending on the outcome, it either contains the validated data or the validation errors.

    if(!validated.success) {
        return {status: 'error', error: validated.error.errors}
    }

    //destructurare obiect data
    const { name, email, password } = validated.data;

    // cauta email daca exista in baza de date
    const existingUser= await prisma.user.findUnique({
        where: {email}    //email: email dar coloana are acelasi nume si merge direct
    })

    if (existingUser) return {status: 'error', error: ('User already exist')}

    //incepem procedura de inregistrare prin hashing the password

    const passwordHash= await bcrypt.hash(password,10);

    const user= await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,            
        }
    })
    return {status:'success', data: user}
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'Something went wrong'}
    }   
}
//helper functions to work with data base
export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({where: {email}});
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({where: {id}});
}