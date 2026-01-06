import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";

// Mock the prisma module before importing the app
const mockPrisma = {
  users: {
    findMany: jest.fn(),
  },
};

jest.unstable_mockModule("./src/config/prisma.js", () => ({
  prisma: mockPrisma,
}));

// Apply BigInt serialization
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Create test app
const app = express();
app.use(express.json());

app.get("/health", (_, res) => {
  res.send("API funcionando 🚀");
});

app.get("/users", async (_, res) => {
  try {
    const users = await mockPrisma.users.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
});

describe("API Endpoints", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("GET /health", () => {
    it("should return a successful status and the correct message", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);
      expect(response.text).toBe("API funcionando 🚀");
    });
  });

  describe("GET /users", () => {
    it("should successfully retrieve and return a list of users", async () => {
      // Mock data
      const mockUsers = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ];

      mockPrisma.users.findMany.mockResolvedValue(mockUsers);

      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
      expect(mockPrisma.users.findMany).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when fetching users from the database", async () => {
      // Mock an error
      const mockError = new Error("Database connection failed");
      mockPrisma.users.findMany.mockRejectedValue(mockError);

      const response = await request(app).get("/users");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Error obteniendo usuarios" });
      expect(mockPrisma.users.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("BigInt Serialization", () => {
    it("should correctly serialize BigInt values to strings in JSON responses", async () => {
      // Mock data with BigInt values
      const mockUsersWithBigInt = [
        {
          id: BigInt(9007199254740991),
          name: "User One",
          balance: BigInt(1000000),
        },
        {
          id: BigInt(9007199254740992),
          name: "User Two",
          balance: BigInt(2500000),
        },
      ];

      mockPrisma.users.findMany.mockResolvedValue(mockUsersWithBigInt);

      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      // Verify that BigInt values are serialized as strings
      expect(response.body[0].id).toBe("9007199254740991");
      expect(response.body[0].balance).toBe("1000000");
      expect(response.body[1].id).toBe("9007199254740992");
      expect(response.body[1].balance).toBe("2500000");

      // Ensure they are strings, not numbers
      expect(typeof response.body[0].id).toBe("string");
      expect(typeof response.body[0].balance).toBe("string");
    });
  });
});
