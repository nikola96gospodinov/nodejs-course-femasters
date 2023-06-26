import { body } from 'express-validator'

export const nameValidator = body('name').exists().isString()
