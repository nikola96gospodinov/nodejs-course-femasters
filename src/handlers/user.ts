import prisma from '../db'
import { NextFunction, Request, Response } from 'express'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: await hashPassword(password)
            }
        })

        const token = createJWT(user)
        res.json({ token })
    } catch (error) {
        console.error(error)
        if (error instanceof Error) {
            error.name = 'input'
        }
        next(error)
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        res.send(400)
        return
    }

    const isValid = await comparePasswords(password, user.password)

    if (!isValid) {
        res.status(401)
        return
    }

    const token = createJWT(user)
    res.json({ token })
}
