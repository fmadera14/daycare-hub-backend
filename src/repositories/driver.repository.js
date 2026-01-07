import { prisma } from "../config/prisma.js";

export const driverRepository = {
  create(data, prismaClient = prisma) {
    return prismaClient.drivers.create({ data });
  },

  findByUserId(userId, prismaClient = prisma) {
    return prismaClient.drivers.findUnique({
      where: { user_id: userId },
    });
  },
};
