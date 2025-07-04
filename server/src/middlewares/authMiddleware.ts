import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction): void | any => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized", status: 404 });
    }

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded as AuthUser;
        next(); 
    } catch (error: any) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;