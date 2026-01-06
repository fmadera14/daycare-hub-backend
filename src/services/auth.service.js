import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository.js";
import { generateToken } from "../utils/jwt.js";

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
};
