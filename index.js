import express from "express";
import { prisma } from "./src/lib/prisma.js";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();

app.use(express.json());
console.log("Prisma models:", Object.keys(prisma));

app.get("/health", (_, res) => {
  res.send("API funcionando 🚀");
});

app.get("/users", async (_, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
