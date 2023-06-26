import { nameValidator } from './common'
import { handleInputErrors } from '../modules/middleware'

export const editProductValidators = [nameValidator, handleInputErrors]
export const addProductValidators = [nameValidator, handleInputErrors]
