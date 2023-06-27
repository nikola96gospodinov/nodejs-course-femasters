import { handleInputErrors } from '../modules/middleware'
import { body } from 'express-validator'

export const editProductValidators = [
    body('name').exists().isString(),
    handleInputErrors
]
export const addProductValidators = [
    body('name').exists().isString(),
    handleInputErrors
]
