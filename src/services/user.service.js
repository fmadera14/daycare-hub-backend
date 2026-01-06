import { userRepository } from "../repositories/user.repository.js";

export const userService = {
  async listUsers() {
    return await userRepository.listUsers();
  },
};
