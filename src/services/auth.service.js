import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository.js";
import pkg from "jsonwebtoken";
import { parentRepository } from "../repositories/parent.repository.js";
import { prisma } from "../config/prisma.js";
import { driverRepository } from "../repositories/driver.repository.js";
import { adminRepository } from "../repositories/admin.repository.js";
import { JWT_SECRET } from "../config/env.js";

const { sign, verify } = pkg;

export const authService = {
  async login(username, password) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return prisma.$transaction(async (tx) => {
      const parent = await parentRepository.findByUserId(user.user_id, tx);
      if (parent) {
        return { user, role: "parent" };
      }

      const driver = await driverRepository.findByUserId(user.user_id, tx);
      if (driver) {
        return { user, role: "driver" };
      }

      const admin = await adminRepository.findByUserId(user.user_id, tx);
      if (admin) {
        return { user, role: "admin" };
      }

      throw new Error("NO_ROLE");
    });
  },

  async register(data) {
    const existing = await userRepository.findByUsername(data.username);

    if (existing) {
      throw new Error("USERNAME_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.$transaction(async (tx) => {
      // 1️⃣ crear usuario
      const user = await userRepository.create(
        {
          username: data.username,
          password: hashedPassword,
          first_nm: data.first_nm,
          last_nm: data.last_nm,
          documentation_type: data.documentation_type,
          documentation_id: data.documentation_id,
          gender: data.gender,
          birth_dt: new Date(data.birth_dt),
        },
        tx // 👈 prisma transaction
      );

      // 2️⃣ crear rol
      switch (data.role) {
        case "parent":
          await parentRepository.create(
            {
              user_id: user.user_id,
              ocupation_txt: data.ocupation_txt,
              aproximate_income_amt: data.aproximate_income_amt,
              children_amt: data.children_amt,
              status_cd: data.status_cd,
            },
            tx
          );
          break;

        case "driver":
          await driverRepository.create(
            {
              user_id: user.user_id,
              driver_license_nmbr: data.driver_license_nmbr,
              driver_license_expiration_dt: new Date(
                data.driver_license_expiration_dt
              ),
              status_cd: data.status_cd,
              vehicle_id: data.vehicle_id,
            },
            tx
          );
          break;

        case "admin":
          await adminRepository.create(
            {
              user_id: user.user_id,
              ocupation_txt: data.ocupation_txt,
              nursery_id: data.nursery_id,
            },
            tx
          );
          break;

        default:
          throw new Error("INVALID_ROLE");
      }

      return user;
    });
  },

  async recoveryPassword(username) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const token = sign(
      {
        userId: user.user_id.toString(),
        type: "PASSWORD_RECOVERY",
      },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    return {
      recoveryToken: token,
    };
  },

  async resetPassword(token, newPassword) {
    let payload;

    try {
      payload = verify(token, JWT_SECRET);
    } catch {
      throw new Error("INVALID_OR_EXPIRED_TOKEN");
    }

    if (payload.type !== "PASSWORD_RECOVERY") {
      throw new Error("INVALID_TOKEN_TYPE");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(BigInt(payload.userId), hashedPassword);
  },
};
