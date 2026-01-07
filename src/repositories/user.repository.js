import { prisma } from "../config/prisma.js";

export const userRepository = {
  findByUsername(username) {
    return prisma.users.findUnique({
      where: { username },
    });
  },

  create(data, prismaClient = prisma) {
    return prismaClient.users.create({ data });
  },

  listUsers() {
    return prisma.users.findMany();
  },

  updatePassword(userId, password) {
    return prisma.users.update({
      where: { user_id: userId },
      data: { password },
    });
  },
};
