import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);

  app.get("/health", (_, res) => {
    res.send("API funcionando 🚀");
  });

  app.use(errorMiddleware);

  return app;
}
