import { userService } from "../services/user.service.js";

export const userController = {
  async listUsers(req, res, next) {
    try {
      const filters = req.query;
      const users = await userService.listUsers(filters);
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
        req.body,
      );

      res.status(200).json({
        message: "Usuario editado correctamente",
        updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { role } = req.user;

      if (!userId)
        return res.status(400).json({ message: "userId es requerido" });

      await userService.deleteUser(BigInt(userId), role);

      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  },
};
