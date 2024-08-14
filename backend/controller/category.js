import { Category, validateCategory } from "../models/categorySchema.js"

class CategoryController {
    // get category
    async getCategory(req, res) {
        try {
            const category = await Category.find();
            if (!category) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Ma'lumot topilmadi",
                    payload: null
                })
            }
            res.status(200).json({
                variant: "success",
                msg: "Category is successfully",
                payload: category
            })
        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // create category
    async createCategory(req, res) {
        try {
            const { error } = validateCategory(req.body);
            if (error) {
                return res.status(400).json({
                    variant: "error",
                    msg: error.details[0].message,
                    payload: null
                })
            }
            const category = new Category.create(req.body)
            res.status(201).json({
                variant: "success",
                msg: "Category is successfully",
                payload: category
            })
        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // update category
    async updateCategory(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Ma'lumot topilmadi",
                    payload: null
                })
            }
            const { error } = validateCategory(req.body);
            if (error) {
                return res.status(400).json({
                    variant: "error",
                    msg: error.details[0].message,
                    payload: null
                })
            }
            const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json({
                variant: "success",
                msg: "Category is successfully",
                payload: category
            })
        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // delete category
    async deleteCategory(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Ma'lumot topilmadi",
                    payload: null
                })
            }
            await Category.findByIdAndDelete(id);
            res.status(200).json({
                variant: "success",
                msg: "Category is successfully",
                payload: null
            })
        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
}

export default new CategoryController()