import { userRepository } from "../repositories/user.repository.js";

export const userService = {
  async listUsers(filters) {
    const {
      // User filters
      userId,
      firstNm,
      lastNm,
      documentationType,
      documentationId,
      gender,
      birthDt,
      activeSince,
      lastLogin,
      username,
      role,
      // admin filters
      // driver filters
      driverLicenseNmbr,
      driverLicenseExpirationDt,
      vehicleId,
      // paent filters
      aproximateIncomeAmt,
      childrenAmt,
      // driver & parent filters
      statusCd,
      // admin & parent filters
      ocupationTxt,
    } = filters;

    const where = {};

    if (userId) where.user_id = BigInt(userId);
    if (username) where.username = { contains: username, mode: "insensitive" };
    if (firstNm) where.first_nm = { contains: firstNm, mode: "insensitive" };
    if (lastNm) where.last_nm = { contains: lastNm, mode: "insensitive" };
    if (documentationType) where.documentation_type = documentationType.trim();
    if (documentationId) where.documentation_id = documentationId.trim();
    if (gender) where.gender = gender;
    if (birthDt) where.birth_dt = new Date(birthDt);
    if (activeSince) where.active_since = new Date(activeSince);
    if (lastLogin) where.last_login = new Date(lastLogin);

    if (role === "driver") {
      where.drivers = {
        some: {
          ...(driverLicenseNmbr && { driver_license_nmbr: driverLicenseNmbr }),
          ...(driverLicenseExpirationDt && {
            driver_license_expiration_dt: new Date(driverLicenseExpirationDt),
          }),
          ...(statusCd && { status_cd: statusCd }),
          ...(vehicleId && { vehicle_id: BigInt(vehicleId) }),
        },
      };
    }

    if (role === "parent") {
      where.parents = {
        some: {
          ...(aproximateIncomeAmt && {
            aproximate_income_amt: aproximateIncomeAmt,
          }),
          ...(childrenAmt && { children_amt: childrenAmt }),
          ...(ocupationTxt && { ocupation_txt: ocupationTxt }),
          ...(statusCd && { status_cd: statusCd }),
        },
      };
    }

    if (role === "admin") {
      where.admins = {
        some: { ...(ocupationTxt && { ocupation_txt: ocupationTxt }) },
      };
    }

    const users = await userRepository.listUsers(where);

    return users.map((user) => ({
      ...user,
      role: user.parents
        ? "parent"
        : user.drivers
          ? "driver"
          : user.admins
            ? "admin"
            : "no_role",
    }));
  },

  async updateProfile(userId, data) {
    if (!userId) {
      throw { code: "USER_ID_REQUIRED" };
    }

    const userIdInt = BigInt(userId);

    const existingUser = await userRepository.findById(userIdInt);

    if (!existingUser) {
      throw { code: "USER_NOT_FOUND" };
    }

    const updateData = {};

    if (data.firstNm) updateData.first_nm = data.firstNm;
    if (data.lastNm) updateData.last_nm = data.lastNm;
    if (data.gender) updateData.gender = data.gender;
    if (data.documentationType)
      updateData.documentation_type = data.documentationType;
    if (data.documentationId)
      updateData.documentation_id = data.documentationId;
    if (data.birthDt) updateData.birth_dt = new Date(data.birthDt);

    // ❌ Nada que actualizar
    if (Object.keys(updateData).length === 0) {
      throw { code: "NO_FIELDS_TO_UPDATE" };
    }

    // 💾 Update
    const updatedUser = await userRepository.update(userIdInt, updateData);

    return updatedUser;
  },

  async findUser(userId) {
    return await userRepository.findById(userId);
  },

  async deleteUser(userId, role) {
    if (role !== "admin") throw { code: "INVALID_ROLE" };
    return await userRepository.deleteUser(userId);
  },
};
