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
    if (user.parents.length) role = "parent";
    if (user.admins.length) role = "admin";
    if (user.drivers.length) role = "driver";

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
