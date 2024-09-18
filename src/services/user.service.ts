import { prisma } from "../libs"
import { users } from "@prisma/client"
import { jwt } from '@elysiajs/jwt'

export const findUserByEmail = async (email : string) : Promise<users | null> => {
    try {

        const result = await prisma.users.findUnique(
            {
                where : {
                    email : email
                }
            }
        )

        return result

    } catch (err) {
        throw err
    }
}

export const findUserByUsername = async (username : string) : Promise<users | null> => {
    try {

        const result = await prisma.users.findUnique(
            {
                where : {
                    username : username
                }
            }
        )

        return result

    } catch (err) {
        throw err
    }
}

export const signupUser = async (name : string, username : string, email : string, password : string)  : Promise<void> =>{
    try {
        await prisma.users.create( {
            data : {
                name : name,
                username : username,
                email : email,
                password : password,
                created_at : new Date(),
                updated_at : new Date()
            }
        })
    } catch (err) {
        throw err
    }
}

export const hashPassword = async(password : string) : Promise<string | undefined> => {
    try {
        const hashedPassword = await Bun.password.hash(password, {
            algorithm: "argon2i",
            memoryCost: 4,
            timeCost : 3
        })

        return hashedPassword

    } catch (err) {
        throw err
    }
}

export const matchPassword = async(password : string, hashedPassword : string) => {
    try {

        const isMatch = await Bun.password.verify(password, hashedPassword)

        return isMatch

    } catch (err) {
        throw err
    }
}
