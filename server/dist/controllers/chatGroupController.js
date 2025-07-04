import prisma from '../config/db.config.js';
class ChatGroupController {
    static async store(req, res) {
        try {
            const body = req.body;
            const user = req.user;
            if (!user || !user.id) {
                return res.status(400).json({ error: 'User information is missing or invalid.' });
            }
            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id,
                },
            });
            return res.status(201).json({
                message: 'Chat group created successfully',
            });
        }
        catch (error) {
            console.error('Error creating chat group:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async index(req, res) {
        try {
            const body = req.body;
            const user = req.user;
            if (!user || !user.id) {
                return res.status(400).json({ error: 'User information is missing or invalid.' });
            }
            const groups = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.id,
                },
                orderBy: {
                    created_at: 'desc',
                }
            });
            return res.status(201).json({
                message: 'Chat groups fetched successfully',
                data: groups,
            });
        }
        catch (error) {
            console.error('Error creating chat group:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async show(req, res) {
        try {
            const { id } = req.params;
            const group = await prisma.chatGroup.findUnique({
                where: {
                    id: id
                }
            });
            return res.status(201).json({
                message: 'Chat group fetched successfully',
                data: group,
            });
        }
        catch (error) {
            console.error('Error creating chat group:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async update(req, res) {
        try {
            const body = req.body;
            const { id } = req.params;
            await prisma.chatGroup.update({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                },
                where: {
                    id: id
                }
            });
            return res.status(201).json({
                message: 'Chat group updated successfully',
            });
        }
        catch (error) {
            console.error('Error creating chat group:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async destroy(req, res) {
        try {
            const { id } = req.params;
            const group = await prisma.chatGroup.delete({
                where: {
                    id: id
                }
            });
            return res.status(201).json({
                message: 'Chat group deleted successfully',
                data: group,
            });
        }
        catch (error) {
            console.error('Error creating chat group:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
export default ChatGroupController;
