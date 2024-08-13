import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Category = mongoose.model('exam-category', categorySchema)

export const validateCategory = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        adminId: Joi.string().required()
    })
    return schema.validateCategory(data)
}