import { authService } from "../services/auth.service.js";

export const authController = {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  },

  async register(req, res, next) {
    try {
      const token = await authService.register(req.body);
      res.status(201).json({
        message: "Usuario creado correctamente",
        token,
      });
    } catch (err) {
      next(err);
    }
  },
};
