import { nurseryRepository } from "../repositories/nursery.repository.js";

export const nurseryServices = {
  async listNurseries() {
    return await nurseryRepository.list();
  },
};
