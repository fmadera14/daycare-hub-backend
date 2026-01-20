import { nurseryServices } from "../services/nursery.service.js";

export const nurseryController = {
  async listNurseries(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        throw { code: "INVALID_ROLE" };
      }
      const nurseries = await nurseryServices.listNurseries();
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
};
