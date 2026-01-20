import { prisma } from "../config/prisma.js";

export const nurseryRepository = {
  list() {
    return prisma.nurseries.findMany();
  },
};
