import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import router from './router'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'
import { catchErrors } from './modules/middleware'

const app = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Home page
app.get('/', (req, res, next) => {
    res.json({ message: 'hello' })
})

// Routes
app.post('/user', createNewUser)
app.post('/signin', signIn)

// Protected Routes
app.use('/api', protect, router)

app.use(catchErrors)

// Cathing errors in Node.js (ouside of Express)
process.on('uncaughtException', () => {})
process.on('unhandledRejection', () => {})

export default app
