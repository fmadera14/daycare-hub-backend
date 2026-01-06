export function errorMiddleware(err, req, res, next) {
  console.error(err);

  if (err.message === "INVALID_CREDENTIALS") {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  if (err.message === "USERNAME_EXISTS") {
    return res.status(409).json({ message: "Username ya existe" });
  }

  res.status(500).json({
    message: "Error interno del servidor",
  });
}
