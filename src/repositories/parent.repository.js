import { prisma } from "../config/prisma.js";

export const parentRepository = {
  create(data, prismaClient = prisma) {
    return prismaClient.parents.create({ data });
  },

  findByUserId(userId, prismaClient = prisma) {
    return prismaClient.parents.findUnique({
      where: { user_id: userId },
    });
  },
};
