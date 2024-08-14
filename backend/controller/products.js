import { Products, validateProduct } from "../models/productSchema.js";

class ProductsController {
    // get products
    async getProducts(req, res) {
        try {
            const { limit = 10, skip = 0 } = req.query
            const allProducts = Products.find().limit(limit).skip(skip * limit)
            if (!allProducts) {
                return res.status(400).json({
                    msg: "Products not found",
                    variant: "warning",
                    payload: null
                })
            }
            const totalCount = await Products.countDocuments();
            res.status(200).json({
                msg: "Products is successfully",
                variant: "success",
                payload: allProducts,
                totalCount
            })
        } catch {
            return res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            })
        }
    }
    // get product details
    async getProductId(req, res) {
        try {
            const product = await Products.findById(req.params.id)
            if (!product || !req.params.id) {
                return res.status(400).json({
                    msg: "Products not found",
                    variant: "warning",
                    payload: null
                })
            }
            res.status(200).json({
                msg: "Products is successfully",
                variant: "success",
                payload: product
            })
        } catch {
            return res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            })
        }
    }
    // post products
    async createProducts(req, res) {
        // try {
        const { error } = validateProduct(req.body)
        if (error) {
            return res.status(400).json({
                msg: error.details[0].message,
                variant: "error",
                payload: null
            })
        }
        const product = new Products(req.body)
        res.status(201).json({
            msg: "Products is created successfully",
            variant: "success",
            payload: product
        })
        // } catch {
        //     return res.status(500).json({
        //         msg: "Server error",
        //         variant: "error",
        //         payload: null
        //     })
        // }
    }
    // update products
    async updateProducts(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    msg: "Products not found",
                    variant: "warning",
                    payload: null
                })
            }
            const { error } = validateProduct(req.body)
            if (error) {
                return res.status(400).json({
                    msg: error.details[0].message,
                    variant: "error",
                    payload: null
                })
            }
            const product = await Products.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json({
                msg: "Products is updated successfully",
                variant: "success",
                payload: product
            })
        } catch {
            return res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            })
        }
    }
    // delete products
    async deleteProducts(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    msg: "Products not found",
                    variant: "warning",
                    payload: null
                })
            }
            await Products.findByIdAndDelete(id)
            res.status(200).json({
                msg: "Products is deleted successfully",
                variant: "success",
                payload: null
            })
        } catch {
            return res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            })
        }
    }
}

export default new ProductsController()