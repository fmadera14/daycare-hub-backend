import { prisma } from "../config/prisma.js";

export const userRepository = {
  findByUsername(username) {
    return prisma.users.findUnique({
      where: { username },
    });
  },

  create(data) {
    return prisma.users.create({ data });
  },

  listUsers() {
    return prisma.users.findMany();
  },
};
