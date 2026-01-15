import { userRepository } from "../repositories/user.repository.js";
import { adminRepository } from "../repositories/admin.repository.js";
import { driverRepository } from "../repositories/driver.repository.js";
import { parentRepository } from "../repositories/parent.repository.js";

export const userService = {
  async listUsers() {
    const users = await userRepository.listUsers();

    return Promise.all(
      users.map(async (user) => {
        const parentInfo = await parentRepository.findByUserId(user.user_id);
        const driverInfo = await driverRepository.findByUserId(user.user_id);
        const adminInfo = await adminRepository.findByUserId(user.user_id);

        if (parentInfo)
          return {
            ...user,
            ...parentInfo,
            role: "parent",
          };

        if (driverInfo)
          return {
            ...user,
            ...driverInfo,
            role: "driver",
          };

        if (adminInfo)
          return {
            ...user,
            ...adminInfo,
            role: "admin",
          };

        return { ...user, role: "no role" };
      })
    );
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
};
