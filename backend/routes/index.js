import express from 'express'
import AdminController from '../controller/admin.js'
import CategoryController from "../controller/category.js"
import { auth } from '../middleware/auth.js'
const router = express.Router()

// Admin
router.get('/get/admins', AdminController.getAdmins)
router.get('/get/profile', [auth], AdminController.getProfile)
router.put('/update/profile', AdminController.updateProfile)
router.get('/get/admins/:id', [auth], AdminController.getAdminId)
router.post('/sign-up', AdminController.signUp)
router.post('/sign-in', AdminController.signIn)
router.put('/update/admins/:id', [auth], AdminController.updateAdminId)
router.delete('/delete/admins/:id', [auth], AdminController.deleteAdminId)
// Admin end

// Category
router.get('/get/category', CategoryController.getCategory)
router.post('/create/category', CategoryController.createCategory)
router.put('/update/category/:id', CategoryController.updateCategory)
router.delete('/delete/category/:id', CategoryController.deleteCategory)
// Category end

export default router