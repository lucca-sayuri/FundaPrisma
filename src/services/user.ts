import { Prisma } from "@prisma/client"
import { prisma } from '../libs/prisma'

type CreateUserProps = {
    name: string
    email: string
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        return await prisma.user.create({ data })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                console.error('Error: Email already exists')
                return false
            }
        }
        console.log('Error creating user:', error)
    }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try {
        return await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        })
    } catch(error) {
        console.log('Error creating users:', error)
        return false
    }
}

export const getAllUsers = async () => {
    try {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                status: true
            }
        })
    } catch (error) {
        console.log('Error catching users:', error)
        return false
    }
}