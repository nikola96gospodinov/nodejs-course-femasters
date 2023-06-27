import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'

export const addUpdatePointValidators = [
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    handleInputErrors
]
export const editUpdatePointValidators = [
    body('name').optional().isString(),
    body('description').optional().isString(),
    handleInputErrors
]
