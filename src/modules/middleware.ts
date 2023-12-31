import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400)
        res.send({ errors: errors.array() })
    } else {
        next()
    }
}

export const catchErrors = (
    error: NodeJS.ErrnoException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error.name === 'auth') {
        res.status(401).json({ message: 'Unauthorized' })
    } else if (error.name === 'input') {
        res.status(400).json({ message: 'Invalid input' })
    } else {
        res.status(500).json({ message: 'Server error' })
    }
}
