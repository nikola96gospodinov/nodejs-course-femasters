import { body } from 'express-validator'
import { nameValidator } from './common'
import { handleInputErrors } from '../modules/middleware'

export const addUpdatePointValidators = [
    nameValidator,
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    handleInputErrors
]
export const editUpdatePointValidators = [
    body('name').optional().isString(),
    body('description').optional().isString(),
    handleInputErrors
]
