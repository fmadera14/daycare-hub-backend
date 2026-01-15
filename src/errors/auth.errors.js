export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: {
    status: 401,
    message: "Credenciales inválidas",
  },

  INVALID_OR_EXPIRED_TOKEN: {
    status: 400,
    message: "Token inválido o expirado",
  },

  INVALID_TOKEN_TYPE: {
    status: 400,
    message: "Token inválido o expirado",
  },

  DATABASE_UNAVAILABLE: {
    status: 503,
    message: "Base de datos no disponible, intente más tarde",
  },

  MISSING_CREDENTIALS: {
    status: 400,
    message: "Faltan credenciales",
  },

  RESET_PASSWORD_MISSING_PARAMS: {
    status: 400,
    message: "Token y nueva contraseña requeridos",
  },
};
