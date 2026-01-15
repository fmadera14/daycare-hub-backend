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

  async getProfile(req, res, next) {
    try {
      const user = await userService.findUser(req.user.userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const updatedUser = await userService.updateProfile(
        req.user.userId,
        req.body
      );

      res.status(200).json({
        message: "Usuario editado correctamente",
        updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },
};
