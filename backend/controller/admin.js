import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin, validateAdmin } from "../models/adminSchema.js";
const ADMIN_SECRET = process.env.ADMIN_SECRET;

class AdminController {
    // get Admins
    async getAdmins(req, res) {
        try {
            const admins = await Admin.find();
            if (!admins) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Ma'lumot topilmadi",
                    payload: null
                })
            }
            const totalCount = await Admin.countDocuments();
            res.status(200).json({
                variant: "success",
                msg: "Admins is successfully",
                payload: admins,
                totalCount
            })

        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // get profile
    async getProfile(req, res) {
        try {
            const admin = await Admin.findById(req.user._id).select("-password");
            if (!admin || !admin.isActive) {
                return res.status(401).json({
                    variant: "error",
                    msg: "Invalid token",
                    payload: null
                })
            }
            res.status(200).json({
                variant: "success",
                msg: "Admin is successfully",
                payload: admin
            })

        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // update profile
    async updateProfile(req, res) {
        try {
            const admin = await Admin.findById(req.user._id);
            const id = req.user._id
            const { error } = validateAdmin(req.body);
            if (!admin || error || !id) {
                return res.status(400).json({
                    variant: "error",
                    msg: error.details[0].message,
                    payload: null
                })
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const updatedAdmin = await Admin.findByIdAndUpdate(req.user._id, { ...req.body, password: hashedPassword }, { new: true });
            res.status(200).json({
                variant: "success",
                msg: "Admin is successfully",
                payload: updatedAdmin
            })

        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // get admin id
    async getAdminId(req, res) {
        try {
            const admin = await Admin.findById(req.params.id);
            if (!admin) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Ma'lumot topilmadi",
                    payload: null
                })
            }
            res.status(200).json({
                variant: "success",
                msg: "Admin is successfully",
                payload: admin
            })

        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // sign up
    async signUp(req, res) {
        try {
            const { error } = validateAdmin(req.body);
            // console.log(req.user)
            if (error || !req.body) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Malumot topilmadi",
                    payload: null
                })
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const token = jwt.sign({ _id: req.body._id, isActive: req.body.isActive }, ADMIN_SECRET, { expiresIn: "1d" });
            const admin = new Admin.create({ ...req.body, hashPassword });
            res.status(201).json({
                variant: "success",
                msg: "Admin is successfully",
                payload: { admin, token }
            })
        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // sign in
    async signIn(req, res) {
        try {
            const { error } = validateAdmin(req.body);
            if (error) {
                return res.status(400).json({
                    variant: "error",
                    msg: error.details[0].message,
                    payload: null
                })
            }
            const admin = await Admin.findOne({ phone: req.body.phone });
            if (!admin) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Ma'lumot topilmadi",
                    payload: null
                })
            }
            const validPassword = bcrypt.compare(req.body.hashPassword, admin.hashPassword);
            if (!validPassword) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Ma'lumot topilmadi",
                    payload: null
                })
            }
            const token = jwt.sign({ _id: admin._id }, ADMIN_SECRET, { expiresIn: "1d" });
            res.status(200).json({
                variant: "success",
                msg: "Admin is successfully",
                payload: { admin, token }
            })
        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // update admins id
    async updateAdminId(req, res) {
        try {
            const id = req.params.id
            /* 
            * part - 3
            if (req.body.password || req.body.password === "") {
                return res.status(400).json({
                    variant: "error",
                    msg: "Password kiritilmasligi kerak!",
                    payload: null
                })
            }
            * part - 1
            const { error } = validateAdmin(req.body);
            req.body.password = admin.password
            * part - 2
            const admin = await Admin.findById(id);
            if(!req.body.password & admin) { req.body.password = admin.password }
            */
            if (!id) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Ma'lumot topilmadi",
                    payload: null
                })
            }
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            const admin = await Admin.findByIdAndUpdate(id, { ...req.body, hashPassword }, { new: true });
            res.status(200).json({
                variant: "success",
                msg: "Admin is successfully",
                payload: admin
            })
        } catch {
            res.status(500).json({
                msg: "Server Error",
                variant: "error",
                payload: null
            })
        }
    }
    // delete admins id
    async deleteAdminId(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    variant: "error",
                    msg: "Ma'lumot topilmadi",
                    payload: null
                })
            }
            await Admin.findByIdAndDelete(id);
            res.status(200).json({
                variant: "success",
                msg: "Admin is successfully",
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

export default new AdminController()