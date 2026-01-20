import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar todos los usuarios (con filtros opcionales)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       # User filters
 *       - in: query
 *         name: user_id
 *         schema: { type: string }
 *         description: ID del usuario (BigInt en backend)
 *       - in: query
 *         name: username
 *         schema: { type: string }
 *         description: Búsqueda parcial por username (case-insensitive)
 *       - in: query
 *         name: first_nm
 *         schema: { type: string }
 *         description: Búsqueda parcial por nombre (case-insensitive)
 *       - in: query
 *         name: last_nm
 *         schema: { type: string }
 *         description: Búsqueda parcial por apellido (case-insensitive)
 *       - in: query
 *         name: documentation_type
 *         schema: { type: string }
 *         description: Tipo de documento (trim)
 *       - in: query
 *         name: documentation_id
 *         schema: { type: string }
 *         description: Número de documento (trim)
 *       - in: query
 *         name: gender
 *         schema: { type: string }
 *         description: Género
 *       - in: query
 *         name: birth_dt
 *         schema: { type: string, format: date }
 *         description: Fecha de nacimiento (YYYY-MM-DD)
 *       - in: query
 *         name: active_since
 *         schema: { type: string, format: date-time }
 *         description: Activo desde (ISO 8601)
 *       - in: query
 *         name: last_login
 *         schema: { type: string, format: date-time }
 *         description: Último login (ISO 8601)
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, driver, parent]
 *         description: Filtra por rol (determina filtros adicionales)
 *
 *       # Driver filters (si role=driver)
 *       - in: query
 *         name: driver_license_nmbr
 *         schema: { type: string }
 *         description: Licencia de conducción
 *       - in: query
 *         name: driver_license_expiration_dt
 *         schema: { type: string, format: date }
 *         description: Expiración licencia (YYYY-MM-DD)
 *       - in: query
 *         name: vehicle_id
 *         schema: { type: string }
 *         description: ID del vehículo (BigInt)
 *
 *       # Parent filters (si role=parent)
 *       - in: query
 *         name: aproximate_income_amt
 *         schema: { type: number }
 *         description: Ingreso aproximado
 *       - in: query
 *         name: children_amt
 *         schema: { type: integer }
 *         description: Cantidad de hijos
 *
 *       # Shared filters
 *       - in: query
 *         name: status_cd
 *         schema: { type: string }
 *         description: Código de estado (driver/parent)
 *       - in: query
 *         name: ocupation_txt
 *         schema: { type: string }
 *         description: Ocupación (admin/parent)
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserListItem'
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, userController.listUsers);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/me", authMiddleware, userController.getProfile);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Actualizar perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *           examples:
 *             ejemplo:
 *               value:
 *                 firstNm: "Juan"
 *                 lastNm: "Pérez"
 *                 gender: "M"
 *                 documentationType: "CC"
 *                 documentationId: "123456789"
 *                 birthDt: "1995-01-10"
 *     responses:
 *       200:
 *         description: Usuario editado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario editado correctamente
 *                 updatedUser:
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Solicitud inválida (por ejemplo, sin campos a actualizar)
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/", authMiddleware, userController.updateProfile);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Eliminar un usuario (solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar (BigInt en backend)
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *       400:
 *         description: userId es requerido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No permitido (rol inválido)
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:userId", authMiddleware, userController.deleteUser);

export default router;
