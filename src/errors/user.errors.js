export const USER_ERRORS = {
  USERNAME_EXISTS: {
    status: 409,
    message: "Username ya existe",
  },

  USER_NOT_FOUND: {
    status: 404,
    message: "Usuario no encontrado",
  },

  NO_ROLE: {
    status: 500,
    message: "El usuario no tiene rol",
  },
};
