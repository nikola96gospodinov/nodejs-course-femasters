import { NextFunction, Request, Response } from 'express'
import prisma from '../db'

// Get all
export const getProducts = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.body.user.id
        },
        include: {
            products: true
        }
    })

    res.json({ data: user?.products })
}

// Get one
export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.body.user.id
                }
            }
        })

        res.json({ data: product })
    } catch (error) {
        next(error)
    }
}

// Create one
export const createProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.body.user.id
        }
    })

    res.json({ data: product })
}

// Update one
export const updateProduct = async (req: Request, res: Response) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.body.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({ data: updated })
}

// Delete one
export const deleteProduct = async (req: Request, res: Response) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.body.user.id
            }
        }
    })

    res.json({ data: deleted })
}
