import prisma from '../config/db.config.js';
import jwt from 'jsonwebtoken';
class AuthController {
    static async login(req, res) {
        try {
            const body = req.body;
            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email,
                }
            });
            if (!findUser) {
                findUser = await prisma.user.create({
                    data: body
                });
            }
            let JWTPayload = {
                name: findUser.name,
                email: findUser.email,
                id: findUser.id,
            };
            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });
            return res.json({
                message: "Login successful",
                user: {
                    ...findUser,
                    token: `Bearer ${token}`,
                }
            });
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
export default AuthController;
