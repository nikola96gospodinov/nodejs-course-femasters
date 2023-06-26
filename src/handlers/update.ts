import { Request, Response } from 'express'
import prisma from '../db'

// Get all
export const getUpdates = async (req: Request, res: Response) => {
    // All updates for the particular user
    const allUpdates = await prisma.update.findMany({
        where: {
            belongsToId: req.body.user.id
        }
    })

    // All updates for a particular product
    // This is where we'll need to either make a new route or give the user the ability to send a product id
    const product = await prisma.product.findUnique({
        where: {
            id: 'some id' // get it from either the route params or req.body
        },
        include: {
            updates: true
        }
    })
    const allProductUpdates = product?.updates

    res.json({ data: allUpdates })
}

// Get one
export const getUpdate = async (req: Request, res: Response) => {
    const update = await prisma.update.findUnique({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.body.user.id
            }
        }
    })

    res.json({ data: update })
}

// Create one
export const createUpdate = async (req: Request, res: Response) => {
    const { title, body, productId, user } = req.body

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })

    if (!product) {
        res.json({ message: 'Not your product' })
        return
    }

    const update = await prisma.update.create({
        data: {
            title,
            body,
            productId,
            belongsToId: user.id
        }
    })

    res.json({ data: update })
}

// Update one
export const updateUpdate = async (req: Request, res: Response) => {
    const { title, body, productId, user } = req.body

    const updated = await prisma.update.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.body.user.id
            }
        },
        data: {
            title,
            body,
            productId,
            belongsToId: user.id
        }
    })

    res.json({ data: updated })
}

// Delete one
export const deleteUpdate = async (req: Request, res: Response) => {
    const deleted = await prisma.update.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.body.user.id
            }
        }
    })

    res.json({ data: deleted })
}
