import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import router from './router'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'

const app = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.json({ message: 'hello' })
})

// Routes
app.post('/user', createNewUser)
app.post('/signin', signIn)

// Protected Routes
app.use('/api', protect, router)

app.use(
    (
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
)

// Cathing errors in Node.js (ouside of Express)
process.on('uncaughtException', () => {})
process.on('unhandledRejection', () => {})

export default app
