import { nurseryServices } from "../services/nursery.service.js";

export const nurseryController = {
  async listNurseries(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        throw { code: "MISSING_CREDENTIALS" };
      }
      const nurseries = await nurseryServices.listNurseries();
      res.json(nurseries);
    } catch (error) {
      next(error);
    }
  },
};
