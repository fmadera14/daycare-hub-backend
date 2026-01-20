import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { nurseryController } from "../controllers/nursery.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Nurseries
 *   description: Gestión de nurseries (guarderías)
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /nurseries:
 *   get:
 *     summary: Listar nurseries
 *     tags: [Nurseries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de nurseries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nursery_id:
 *                     type: integer
 *                     example: 1
 *                   nursery_nm:
 *                     type: string
 *                     example: Happy Kids Nursery
 *                   address_txt:
 *                     type: string
 *                     example: Calle Principal #123
 *                   open_since_dt:
 *                     type: string
 *                     format: date
 *                     example: "2020-01-01"
 *                   status_cd:
 *                     type: string
 *                     example: ACTIV
 *       401:
 *         description: No autorizado (token faltante o inválido)
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", authMiddleware, nurseryController.listNurseries);

/**
 * @swagger
 * /nurseries:
 *   post:
 *     summary: Crear una nueva nursery
 *     tags: [Nurseries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nurseryNm
 *               - addressTxt
 *               - openSince
 *             properties:
 *               nurseryNm:
 *                 type: string
 *                 example: Happy Kids Nursery
 *               addressTxt:
 *                 type: string
 *                 example: Calle Principal #123
 *               openSince:
 *                 type: string
 *                 format: date
 *                 example: "2020-01-01"
 *               statusCd:
 *                 type: string
 *                 example: ACTIV
 *     responses:
 *       201:
 *         description: Nursery creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nursery_id:
 *                   type: integer
 *                   example: 1
 *                 nursery_nm:
 *                   type: string
 *                   example: Happy Kids Nursery
 *                 address_txt:
 *                   type: string
 *                   example: Calle Principal #123
 *                 open_since_dt:
 *                   type: string
 *                   format: date
 *                   example: "2020-01-01"
 *                 status_cd:
 *                   type: string
 *                   example: ACTIV
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado (token faltante o inválido)
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", authMiddleware, nurseryController.createNursery);

/**
 * @swagger
 * /nurseries/{nurseryId}:
 *   put:
 *     summary: Actualizar una nursery
 *     tags: [Nurseries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nurseryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la nursery a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nurseryNm:
 *                 type: string
 *                 example: Happy Kids Nursery Updated
 *               addressTxt:
 *                 type: string
 *                 example: Avenida Central #456
 *               openSince:
 *                 type: string
 *                 format: date
 *                 example: "2021-05-01"
 *               statusCd:
 *                 type: string
 *                 example: INACT
 *     responses:
 *       200:
 *         description: Nursery actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nursery_id:
 *                   type: integer
 *                   example: 1
 *                 nursery_nm:
 *                   type: string
 *                   example: Happy Kids Nursery Updated
 *                 address_txt:
 *                   type: string
 *                   example: Avenida Central #456
 *                 open_since_dt:
 *                   type: string
 *                   format: date
 *                   example: "2021-05-01"
 *                 status_cd:
 *                   type: string
 *                   example: INACT
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Nursery no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:nurseryId", authMiddleware, nurseryController.updateNursery);

/**
 * @swagger
 * /nurseries/{nurseryId}:
 *   delete:
 *     summary: Eliminar una nursery
 *     tags: [Nurseries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nurseryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la nursery a eliminar
 *     responses:
 *       204:
 *         description: Nursery eliminada correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Nursery no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:nurseryId", authMiddleware, nurseryController.deleteNursery);

export default router;
