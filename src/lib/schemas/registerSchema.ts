import {z} from 'zod'
import { loginSchema } from './loginSchema'
/*
export const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6,{
        message: "Parola de min 6 caractere"
    }),
})
**use extend to combine existing schema with new elemnts**/

export const registerSchema = loginSchema.extend({
    name: z.string().min(3),
})

export type RegisterSchema = z.infer<typeof registerSchema>