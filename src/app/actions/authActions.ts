'use server';

import { prisma } from '@/lib/prisma';
import {RegisterSchema, registerSchema} from '@/lib/schemas/registerSchema'
import { ActionResult } from '@/type';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs'

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