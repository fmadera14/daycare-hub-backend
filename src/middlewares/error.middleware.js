export function errorMiddleware(err, req, res, next) {
  console.error(err);

  if (err.message === "INVALID_CREDENTIALS") {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  if (err.message === "USERNAME_EXISTS") {
    return res.status(409).json({ message: "Username ya existe" });
  }

  if (err.message === "USER_NOT_FOUND") {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (
    err.message === "INVALID_OR_EXPIRED_TOKEN" ||
    err.message === "INVALID_TOKEN_TYPE"
  ) {
    return res.status(400).json({ message: "Token inválido o expirado" });
  }

  if (err.code === "ETIMEDOUT") {
    return res.status(503).json({
      message: "Base de datos no disponible, intente más tarde",
    });
  }

  res.status(500).json({
    message: "Error interno del servidor",
  });
}
