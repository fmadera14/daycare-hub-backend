import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository.js";
import { generateToken } from "../utils/jwt.js";
import { sign, verify } from "jsonwebtoken";

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

    return generateToken({
      userId: user.user_id.toString(),
      username: user.username,
    });
  },

  async register(data) {
    const existing = await userRepository.findByUsername(data.username);

    if (existing) {
      throw new Error("USERNAME_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
      birth_dt: new Date(data.birth_dt),
    });

    return generateToken({
      userId: user.user_id.toString(),
      username: user.username,
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
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return {
      recoveryToken: token,
    };
  },

  async resetPassword(token, newPassword) {
    let payload;

    try {
      payload = verify(token, process.env.JWT_SECRET);
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
