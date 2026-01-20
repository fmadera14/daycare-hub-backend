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
    if (!username || !password) {
      throw { code: "MISSING_CREDENTIALS" };
    }

    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw { code: "INVALID_CREDENTIALS" };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw { code: "INVALID_CREDENTIALS" };
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

      throw { code: "NO_ROLE" };
    });
  },

  async register(data) {
    const existing = await userRepository.findByUsername(data.username);

    if (existing) {
      throw { code: "USERNAME_EXISTS" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.$transaction(async (tx) => {
      // 1️⃣ crear usuario
      const user = await userRepository.create(
        {
          username: data.username,
          password: hashedPassword,
          first_nm: data.firstNm,
          last_nm: data.lastNm,
          documentation_type: data.documentationType,
          documentation_id: data.documentationId,
          gender: data.gender,
          birth_dt: new Date(data.birthDt),
        },
        tx // 👈 prisma transaction
      );

      // 2️⃣ crear rol
      switch (data.role) {
        case "parent":
          await parentRepository.create(
            {
              user_id: user.user_id,
              ocupation_txt: data.ocupationTxt,
              aproximate_income_amt: data.aproximateIncomeAmt,
              children_amt: data.childrenAmt,
              status_cd: data.statusCd,
            },
            tx
          );
          break;

        case "driver":
          await driverRepository.create(
            {
              user_id: user.user_id,
              driver_license_nmbr: data.driverLicenseNmbr,
              driver_license_expiration_dt: new Date(
                data.driverLicenseExpirationDt
              ),
              status_cd: data.statusCd,
              vehicle_id: data.vehicleId,
            },
            tx
          );
          break;

        case "admin":
          await adminRepository.create(
            {
              user_id: user.user_id,
              ocupation_txt: data.ocupationTxt,
              nursery_id: data.nurseryId,
            },
            tx
          );
          break;

        default:
          throw { code: "INVALID_ROLE" };
      }

      return user;
    });
  },

  async recoveryPassword(username) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw { code: "USER_NOT_FOUND" };
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
      throw { code: "INVALID_OR_EXPIRED_TOKEN" };
    }

    if (payload.type !== "PASSWORD_RECOVERY") {
      throw { code: "INVALID_TOKEN_TYPE" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(BigInt(payload.userId), hashedPassword);
  },
};
