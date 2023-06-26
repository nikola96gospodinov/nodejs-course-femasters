import { Request, Response, Router } from 'express'
import {
    addProductValidators,
    editProductValidators
} from './validators/product'
import { addUpdateValidators, editUpdateValidators } from './validators/update'
import {
    addUpdatePointValidators,
    editUpdatePointValidators
} from './validators/updatePoint'
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from './handlers/product'
import {
    createUpdate,
    deleteUpdate,
    getUpdate,
    getUpdates,
    updateUpdate
} from './handlers/update'

const router = Router()

// Product
router
    .route('/product')
    .get(getProducts)
    .post(addProductValidators, createProduct)

router
    .route('/product/:id')
    .get(getProduct)
    .put(editProductValidators, updateProduct)
    .delete(deleteProduct)

// Update
router.route('/update').get(getUpdates).post(addUpdateValidators, createUpdate)

router
    .route('/update/:id')
    .get(getUpdate)
    .put(editUpdateValidators, updateUpdate)
    .delete(deleteUpdate)

// Update Point
router
    .route('/update-point')
    .get(() => {})
    .post(addUpdatePointValidators, (req: Request, res: Response) => {})

router
    .route('/update-point/:id')
    .get(() => {})
    .put(editUpdatePointValidators, (req: Request, res: Response) => {})
    .delete(() => {})

export default router
