import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'

import { User } from '@prisma/client'

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10)
}

export const createJWT = (user: User) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET as string
    )

    return token
}

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({ message: 'Not authorized' })
        return
    }

    const [, token] = bearer.split(' ')
    if (!token) {
        res.status(401)
        res.json({ message: 'Not authorized' })
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as string)
        req.body.user = user
        next()
    } catch (error) {
        console.error(error)
        res.status(401)
        res.json({ message: 'Not authorized' })
        return
    }
}
