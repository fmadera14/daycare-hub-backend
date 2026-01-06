import { userService } from "../services/user.service.js";

export const userController = {
  async listUsers(_, res, next) {
    try {
      const users = await userService.listUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
};
