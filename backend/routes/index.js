import express from 'express'
import AdminController from '../controller/admin'
const router = express.Router()

// Admin
router.get('/get/admins', AdminController.getAdmins)
router.get('/get/profile', AdminController.getProfile)
router.put('/update/profile', AdminController.updateProfile)
router.get('/get/admins/:id', AdminController.getAdminId)
router.post('/sign-up', AdminController.signUp)
router.post('/sign-in', AdminController.signIn)
router.put('/update/admins/:id', AdminController.updateAdminId)
router.delete('/delete/admins/:id', AdminController.deleteAdminId)
// Category
router.get('/get/category', CategoryController.getCategory)
router.post('/create/category', CategoryController.createCategory)
router.put('/update/category/:id', CategoryController.updateCategory)
router.delete('/delete/category/:id', CategoryController.deleteCategory)

export default router