import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import nurseryRoutes from "./routes/nursery.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  // Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/nurseries", nurseryRoutes);

  app.get("/health", (_, res) => {
    res.send("API funcionando 🚀");
  });

  app.use(errorMiddleware);

  return app;
}
