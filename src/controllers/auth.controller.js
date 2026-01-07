import { authService } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";

export const authController = {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const { user, role } = await authService.login(username, password);

      const token = generateToken({
        userId: user.user_id.toString(),
        username: user.username,
        role: role,
      });

      res.json({ token });
    } catch (err) {
      next(err);
    }
  },

  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);

      const token = generateToken({
        userId: user.user_id.toString(),
        username: user.username,
        role: req.body.role,
      });

      res.status(201).json({
        message: "Usuario creado correctamente",
        token,
      });
    } catch (err) {
      next(err);
    }
  },

  async recoveryPassword(req, res, next) {
    try {
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({
          message: "Username requerido",
        });
      }

      const result = await authService.recoveryPassword(username);

      res.json({
        message: "Proceso de recuperación iniciado",
        ...result,
      });
    } catch (err) {
      next(err);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          message: "Token y nueva contraseña requeridos",
        });
      }

      await authService.resetPassword(token, newPassword);

      res.json({
        message: "Contraseña actualizada correctamente",
      });
    } catch (err) {
      next(err);
    }
  },
};
