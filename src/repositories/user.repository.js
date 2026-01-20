import { prisma } from "../config/prisma.js";

export const userRepository = {
  async findByUsername(username) {
    const user = await prisma.users.findUnique({
      where: { username },
      include: {
        parents: true,
        admins: true,
        drivers: true,
      },
    });

    if (!user) return null;

    // inferir rol
    let role = "user";
    if (user.parents && user.parents.length) role = "parent";
    if (user.admins && user.admins.length) role = "admin";
    if (user.drivers && user.drivers.length) role = "driver";

    console.log(user);

    return {
      ...user,
      userId: user.user_id,
      firstNm: user.first_nm,
      lastNm: user.last_nm,
      documentationType: user.documentation_type,
      documentationId: user.documentation_id,
      birthDt: user.birth_dt,
      activeSince: user.active_since,
      last_login: user.last_login,
      ...(role === "admin" && {
        adminId: user.admins.admin_id,
      }),
    };
  },

  create(data, prismaClient = prisma) {
    return prismaClient.users.create({ data });
  },

  listUsers(where = {}) {
    return prisma.users.findMany({
      where,
      include: {
        parents: true,
        drivers: true,
        admins: true,
      },
    });
  },

  updatePassword(userId, password) {
    return prisma.users.update({
      where: { user_id: userId },
      data: { password },
    });
  },

  findById(id) {
    return prisma.users.findUnique({ where: { user_id: id } });
  },

  update(userId, updateData) {
    const allowedFields = {
      first_nm: updateData.first_nm,
      last_nm: updateData.last_nm,
      documentation_type: updateData.documentation_type,
      documentation_id: updateData.documentation_id,
      gender: updateData.gender,
      birth_dt: updateData.birth_dt ? new Date(updateData.birth_dt) : undefined,
    };

    return prisma.users.update({
      where: { user_id: userId },
      data: allowedFields,
    });
  },

  deleteUser(userId) {
    return prisma.users.delete({ where: { user_id: userId } });
  },
};
