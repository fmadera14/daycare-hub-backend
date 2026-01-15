import swaggerJsdoc from "swagger-jsdoc";
import { PORT } from "./env.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentación de la API del proyecto",
      contact: {
        name: "API Support"
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT || 3000}`,
        description: "Servidor de desarrollo"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/*.js"], // Ruta donde están tus archivos de rutas
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };
