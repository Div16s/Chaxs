import {Router} from 'express';
const router = Router();
import AuthController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import ChatGroupController from '../controllers/chatGroupController.js';
import ChatGroupUsersController from '../controllers/chatGroupUsersController.js';
import ChatsController from '../controllers/chatsController.js';

router.post('/auth/login', AuthController.login);

router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

router.get("/chat-group-users", ChatGroupUsersController.index);
router.post("/chat-group-users", ChatGroupUsersController.store);

router.get("/chats/:groupId", ChatsController.index);

export default router;