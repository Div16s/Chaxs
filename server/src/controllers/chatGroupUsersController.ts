import { Request, Response } from "express";
import prisma from "../config/db.config.js";

interface GroupUserType {
  name: string;
  group_id: string;
}

class ChatGroupUsersController {
  static async index(req: Request, res: Response): Promise<any> {
    try {
      const { group_id } = req.query;
      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: group_id as string,
        },
      });

      return res.json({ 
        message: "Users fetched successfully!", 
        data: users 
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error!" });
    }
  }

  static async store(req: Request, res: Response): Promise<any> {
    try {
      const body: GroupUserType = req.body;
      const user = await prisma.groupUsers.create({
        data: body,
      });
      return res.json({ 
        message: "User added successfully!", 
        data: user 
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error!" });
    }
  }
}

export default ChatGroupUsersController;