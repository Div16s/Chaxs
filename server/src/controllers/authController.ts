import { NextFunction, Request, Response } from 'express';
import prisma from '../config/db.config.js';
import jwt from 'jsonwebtoken';

interface LoginPayloadType {
    name: string;
    email: string;
    provider: string;
    image: string;
    oauth_id: string;
}

class AuthController {
    static async login(req: Request, res: Response): Promise<any> {
        try {
            const body: LoginPayloadType = req.body;
            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email,
                }
            })

            if(!findUser){
                findUser = await prisma.user.create({
                    data: body
                });
            }

            let JWTPayload = {
                name: findUser.name,
                email: findUser.email,
                id: findUser.id, 
            }

            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
                expiresIn: '1d',
            });

            return res.json({
                message: "Login successful",
                user: {
                    ...findUser,
                    token: `Bearer ${token}`,
                }
            });
        } catch (error: any) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

export default AuthController;