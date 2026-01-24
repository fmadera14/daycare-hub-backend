import { prisma } from "../config/prisma.js";

export const nurseryRepository = {
  list(where = {}) {
    return prisma.nurseries.findMany({ where });
  },

  create(data) {
    return prisma.nurseries.create({
      data,
    });
  },

  findByUserId(userId) {
    return prisma.nurseries.findUnique({ where: { user_id: userId } });
  },

  findById(nurseryId) {
    return prisma.nurseries.findFirst({ where: { nursery_id: nurseryId } });
  },

  update(nurseryId, updateData) {
    const allowedFields = {
      nursery_nm: updateData.nursery_nm,
      address_txt: updateData.address_txt,
      status_cd: updateData.status_cd,
      open_since_dt: updateData.open_since_dt
        ? new Date(updateData.open_since_dt)
        : undefined,
    };

    return prisma.nurseries.update({
      where: { nursery_id: nurseryId },
      data: allowedFields,
    });
  },

  delete(nurseryId) {
    return prisma.nurseries.delete({ where: { nursery_id: nurseryId } });
  },
};
