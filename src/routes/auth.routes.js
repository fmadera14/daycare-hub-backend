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

  //const isValid = await bcrypt.compare(password, user.password);
  //
  //if (!isValid) {
  //  return res.status(401).json({ message: "Credenciales inválidas" });
  //}

  const token = generateToken({
    userId: user.user_id.toString(), // BigInt → string
    username: user.username,
  });

  res.json({ token });
});

export default router;
