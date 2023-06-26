import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'

export const addUpdateValidators = [
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleInputErrors
]
export const editUpdateValidators = [
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional().isString(),
    body('asset').optional().isString(),
    handleInputErrors
]
