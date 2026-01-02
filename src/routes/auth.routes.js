import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.users.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = generateToken({
    userId: user.user_id.toString(), // BigInt → string
    username: user.username,
  });

  res.json({ token });
});

router.post("/register", async (req, res) => {
  try {
    const {
      username,
      password,
      first_nm,
      last_nm,
      documentation_type,
      documentation_id,
      gender,
      birth_dt,
    } = req.body;

    // Validaciones básicas
    if (
      !username ||
      !password ||
      !first_nm ||
      !last_nm ||
      !documentation_type ||
      !documentation_id ||
      !gender ||
      !birth_dt
    ) {
      return res.status(400).json({
        message: "Faltan campos requeridos",
      });
    }

    // Verificar username único
    const existingUser = await prisma.users.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "El username ya existe",
      });
    }

    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        first_nm,
        last_nm,
        documentation_type,
        documentation_id,
        gender,
        birth_dt: new Date(birth_dt),
      },
    });

    // Generar token
    const token = generateToken({
      userId: user.user_id.toString(),
      username: user.username,
    });

    // Respuesta
    res.status(201).json({
      message: "Usuario creado correctamente",
      token,
    });
  } catch (error) {
    console.error(error);

    // Error de constraint UNIQUE
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Username ya registrado",
      });
    }

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

export default router;
