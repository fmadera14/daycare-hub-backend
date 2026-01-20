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
};
