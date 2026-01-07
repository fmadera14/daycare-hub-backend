import { prisma } from "../config/prisma.js";

export const adminRepository = {
  create(data, prismaClient = prisma) {
    return prismaClient.admins.create({ data });
  },

  findByUserId(userId, prismaClient = prisma) {
    return prismaClient.admins.findUnique({
      where: { user_id: userId },
    });
  },
};
