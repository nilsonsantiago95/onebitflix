import { Request, Response } from "express"
import { categoryService } from "../services/categoryService"
import { getPaginationParams } from "../helpers/getPaginationParam"

export const categorioriesController = {
    // GET /categories
    index: async (req: Request, res: Response) => {
        const [ page, perPage ] = getPaginationParams(req.query)
        
        try {
            const paginatedCategories = await categoryService.findAllPaginated(page, perPage)
            console.log(paginatedCategories)
            return res.json(paginatedCategories)
        } catch (error) {
            if (error instanceof Error) return res.status(400).json({ message: error.message })
        }
    },

    // GET /categories/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const category = await categoryService.findByIdWithCourses(id)
            console.log(category)
            return res.json(category)
        } catch (error) {
            if (error instanceof Error) return res.status(400).json({ message: error.message })
        }
    }
}