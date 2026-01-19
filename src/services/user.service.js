import { userRepository } from "../repositories/user.repository.js";

export const userService = {
  async listUsers(filters) {
    const {
      // User filters
      user_id,
      first_nm,
      last_nm,
      documentation_type,
      documentation_id,
      gender,
      birth_dt,
      active_since,
      last_login,
      username,
      role,
      // admin filters
      // driver filters
      driver_license_nmbr,
      driver_license_expiration_dt,
      vehicle_id,
      // paent filters
      aproximate_income_amt,
      children_amt,
      // driver & parent filters
      status_cd,
      // admin & parent filters
      ocupation_txt,
    } = filters;

    const where = {};

    if (user_id) where.user_id = BigInt(user_id);
    if (username) where.username = { contains: username, mode: "insensitive" };
    if (first_nm) where.first_nm = { contains: first_nm, mode: "insensitive" };
    if (last_nm) where.last_nm = { contains: last_nm, mode: "insensitive" };
    if (documentation_type)
      where.documentation_type = documentation_type.trim();
    if (documentation_id) where.documentation_id = documentation_id.trim();
    if (gender) where.gender = gender;
    if (birth_dt) where.birth_dt = new Date(birth_dt);
    if (active_since) where.active_since = new Date(active_since);
    if (last_login) where.last_login = new Date(last_login);

    if (role === "driver") {
      where.drivers = {
        some: {
          ...(driver_license_nmbr && { driver_license_nmbr }),
          ...(driver_license_expiration_dt && {
            driver_license_expiration_dt: new Date(
              driver_license_expiration_dt,
            ),
          }),
          ...(status_cd && { status_cd }),
          ...(vehicle_id && { vehicle_id: BigInt(vehicle_id) }),
        },
      };
    }

    if (role === "parent") {
      where.parents = {
        some: {
          ...(aproximate_income_amt && { aproximate_income_amt }),
          ...(children_amt && { children_amt }),
          ...(ocupation_txt && { ocupation_txt }),
          ...(status_cd && { status_cd }),
        },
      };
    }

    if (role === "admin") {
      where.admins = {
        some: { ...(ocupation_txt && { ocupation_txt }) },
      };
    }

    const users = await userRepository.listUsers(where);

    return users.map((user) => ({
      ...user,
      role: user.parents.length
        ? "parent"
        : user.drivers.length
          ? "driver"
          : user.admins.length
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
