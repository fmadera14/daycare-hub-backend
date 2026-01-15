import { errorMap } from "../errors/error.map.js";

export function errorMiddleware(err, req, res, next) {
  console.error(err);

  // Prisma timeout directo
  if (err.code === "ETIMEDOUT") {
    const mapped = errorMap.DATABASE_UNAVAILABLE;
    return res.status(mapped.status).json({ message: mapped.message });
  }

  // Mapeo por mensaje (compatibilidad con tu código actual)
  const key = err.code || err.message;
  const mapped = errorMap[key];

  if (mapped) {
    return res.status(mapped.status).json({ message: mapped.message });
  }

  return res.status(500).json({
    message: "Error interno del servidor",
  });
}
