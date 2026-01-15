import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const injectRole = (role) => (req, _, next) => {
  req.body.role = role;
  next();
};

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: text
 *                 example: username
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/register/parent:
 *   post:
 *     summary: Registrar un nuevo usuario con rol Padre
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - first_nm
 *               - last_nm
 *               - documentation_type
 *               - documentation_id
 *               - gender
 *               - birth_dt
 *               - ocupation_txt
 *               - aproximate_income_amt
 *               - children_amt
 *               - status_cd
 *             properties:
 *               username:
 *                 type: string
 *                 example: testusername2
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "12345678"
 *               first_nm:
 *                 type: string
 *                 example: Test
 *               last_nm:
 *                 type: string
 *                 example: User
 *               documentation_type:
 *                 type: string
 *                 example: ID
 *               documentation_id:
 *                 type: string
 *                 example: "12345678901"
 *               gender:
 *                 type: string
 *                 description: "1 = Masculino, 0 = Femenino"
 *                 example: "1"
 *               birth_dt:
 *                 type: string
 *                 format: date
 *                 example: "2004-11-02"
 *               ocupation_txt:
 *                 type: string
 *                 example: Programador
 *               aproximate_income_amt:
 *                 type: number
 *                 format: double
 *                 example: 1000000
 *               children_amt:
 *                 type: integer
 *                 example: 2
 *               status_cd:
 *                 type: string
 *                 example: ACTIV
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado correctamente
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Username ya existe
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register/parent", injectRole("parent"), authController.register);

/**
 * @swagger
 * /auth/register/driver:
 *   post:
 *     summary: Registrar un nuevo usuario con rol Driver
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - first_nm
 *               - last_nm
 *               - documentation_type
 *               - documentation_id
 *               - gender
 *               - birth_dt
 *               - driver_license_nmbr
 *               - driver_license_expiration_dt
 *               - status_cd
 *               - vehicle_id
 *             properties:
 *               username:
 *                 type: string
 *                 example: testusername3
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "12345678"
 *               first_nm:
 *                 type: string
 *                 example: Test
 *               last_nm:
 *                 type: string
 *                 example: DRIVER
 *               documentation_type:
 *                 type: string
 *                 example: ID
 *               documentation_id:
 *                 type: string
 *                 example: "12345678901"
 *               gender:
 *                 type: string
 *                 description: "1 = Masculino, 0 = Femenino"
 *                 example: "1"
 *               birth_dt:
 *                 type: string
 *                 format: date
 *                 example: "2004-11-02"
 *               driver_license_nmbr:
 *                 type: string
 *                 example: "123456789012345"
 *               driver_license_expiration_dt:
 *                 type: string
 *                 format: date
 *                 example: "2027-10-10"
 *               status_cd:
 *                 type: string
 *                 example: ACTIV
 *               vehicle_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado correctamente
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Username ya existe
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register/driver", injectRole("driver"), authController.register);

/**
 * @swagger
 * /auth/register/admin:
 *   post:
 *     summary: Registrar un nuevo usuario con rol Admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - first_nm
 *               - last_nm
 *               - documentation_type
 *               - documentation_id
 *               - gender
 *               - birth_dt
 *               - ocupation_txt
 *               - nursery_id
 *             properties:
 *               username:
 *                 type: string
 *                 example: testusername4
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "12345678"
 *               first_nm:
 *                 type: string
 *                 example: Test
 *               last_nm:
 *                 type: string
 *                 example: Admin
 *               documentation_type:
 *                 type: string
 *                 example: ID
 *               documentation_id:
 *                 type: string
 *                 example: "12345678901"
 *               gender:
 *                 type: string
 *                 description: "1 = Masculino, 0 = Femenino"
 *                 example: "1"
 *               birth_dt:
 *                 type: string
 *                 format: date
 *                 example: "2004-11-02"
 *               ocupation_txt:
 *                 type: string
 *                 example: Director
 *               nursery_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado correctamente
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Username ya existe
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register/admin", injectRole("admin"), authController.register);

/**
 * @swagger
 * /auth/recovery-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@ejemplo.com
 *     responses:
 *       200:
 *         description: Email de recuperación enviado
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/recovery-password", authController.recoveryPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Restablecer contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: abc123token
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: nuevaPassword123
 *     responses:
 *       200:
 *         description: Contraseña restablecida exitosamente
 *       400:
 *         description: Token inválido o expirado
 */
router.post("/reset-password", authController.resetPassword);

export default router;
