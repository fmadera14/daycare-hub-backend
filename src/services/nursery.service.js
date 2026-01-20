import { nurseryRepository } from "../repositories/nursery.repository.js";

export const nurseryServices = {
  async listNurseries() {
    return await nurseryRepository.list();
  },

  async createNursery(data) {
    const { userId, nurseryNm, addressTxt, openSince, statusCd } = data;

    if (!userId) {
      throw { code: "MISSING_USER_ID" };
    }

    let validUserId;
    try {
      validUserId = BigInt(userId);
    } catch {
      throw { code: "INVALID_USER_ID" };
    }

    if (!nurseryNm || typeof nurseryNm !== "string") {
      throw { code: "MISSING_NURSERY_NAME" };
    }

    if (!addressTxt || typeof addressTxt !== "string") {
      throw { code: "MISSING_ADDRESS" };
    }

    if (!openSince) {
      throw { code: "MISSING_OPEN_SINCE" };
    }

    const openSinceDate = new Date(openSince);
    if (isNaN(openSinceDate.getTime())) {
      throw { code: "INVALID_OPEN_SINCE_DATE" };
    }

    return await nurseryRepository.create({
      user_id: validUserId,
      nursery_nm: nurseryNm,
      address_txt: addressTxt,
      open_since_dt: new Date(openSince),
      ...(statusCd && { status_cd: statusCd }),
    });
  },

  async updateNursery(userId, nurseryId, data) {
    const { nurseryNm, addressTxt, openSince, statusCd } = data;

    const userIdInt = BigInt(userId);
    const nurseryIdInt = BigInt(nurseryId);

    const existingNursery = await nurseryRepository.findById(nurseryIdInt);

    if (!existingNursery) {
      throw { code: "NURSERY_NOT_FOUND" };
    }

    if (existingNursery.nursery_id !== nurseryIdInt) {
      throw { code: "NURSERY_ACCESS_DENIED" };
    }

    const updateData = {};

    if (nurseryNm) updateData.nursery_nm = nurseryNm;
    if (addressTxt) updateData.address_txt = addressTxt;
    if (openSince) updateData.open_since_dt = new Date(openSince);
    if (statusCd) updateData.status_cd = statusCd;

    if (Object.keys(updateData).length === 0) {
      throw { code: "NO_FIELDS_TO_UPDATE" };
    }

    const updatedNursery = await nurseryRepository.update(
      nurseryIdInt,
      updateData,
    );

    return updatedNursery;
  },
};
