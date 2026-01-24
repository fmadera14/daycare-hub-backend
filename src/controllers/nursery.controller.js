import { nurseryServices } from "../services/nursery.service.js";

export const nurseryController = {
  async listNurseries(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        throw { code: "INVALID_ROLE" };
      }
      const filters = req.query;
      const userId = req.user.userId;
      const nurseries = await nurseryServices.listNurseries(filters, userId);
      res.json(nurseries);
    } catch (error) {
      next(error);
    }
  },

  async createNursery(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        throw { code: "INVALID_ROLE" };
      }

      const nursery = await nurseryServices.createNursery(req.body);
      res.json(nursery);
    } catch (error) {
      next(error);
    }
  },

  async updateNursery(req, res, next) {
    try {
      const nursery = await nurseryServices.updateNursery(
        req.user.userId,
        req.params.nurseryId,
        req.body,
      );
      res.json(nursery);
    } catch (error) {
      next(error);
    }
  },

  async deleteNursery(req, res, next) {
    try {
      const { nurseryId } = req.params;
      const { userId, role } = req.user;

      if (role !== "admin") {
        throw { code: "INVALID_ROLE" };
      }

      await nurseryServices.deleteNursery(nurseryId, userId);
      res.status(200).json({ message: "Nursery eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  },
};
