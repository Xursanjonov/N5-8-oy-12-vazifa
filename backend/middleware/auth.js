import jwt from "jsonwebtoken";

const JWT_SECRET = 'Nusratilloh_auth';

export const auth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            msg: "Access denied.",
            variant: "error",
            payload: null,
        });
    }
    try {
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    msg: "Invalid token.",
                    variant: "error",
                    payload: null,
                });
            }
            if (decoded.isActive) {
                req.admin = decoded;
                next();
            } else {
                return res.status(401).json({
                    msg: "Invalid token.",
                    variant: "error",
                    payload: null,
                });
            }
        });
    } catch (err) {
        res.status(400).json({
            msg: "Invalid token.",
            variant: "error",
            payload: null,
        });
    }
};

export const OwnerMiddleware = (req, res, next) => {
    if (req.admin.role === "owner") {
        next();
    } else {
        res.status(403).json({
            msg: "Access denied.",
            variant: "error",
            payload: null,
        });
    }
}