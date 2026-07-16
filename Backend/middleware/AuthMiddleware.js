const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const AuthMiddleware = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await UserModel.findById(decoded.userId).select("-password");

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }
}

module.exports = AuthMiddleware;