import { prisma } from "../config/prisma.js";

export const parentRepository = {
  create(data, prismaClient = prisma) {
    return prismaClient.parents.create({ data });
  },
};
