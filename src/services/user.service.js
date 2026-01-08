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

        return { ...user };
      })
    );
  },
};
