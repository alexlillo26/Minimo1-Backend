"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user_routes.ts
const express_1 = __importDefault(require("express"));
const combat_controller_js_1 = require("../combats/combat_controller.js");
const router = express_1.default.Router();
/**
 * @openapi
 * /api/combat:
 *   post:
 *     summary: Crea un nuevo combate
 *     description: Añade un nuevo combate con fecha, gimnasio y boxeadores.
 *     tags:
 *       - Combat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora del combate
 *               gym:
 *                 type: string
 *                 description: ID del gimnasio donde se lleva a cabo el combate
 *               boxers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de IDs de los boxeadores participantes
 *     responses:
 *       201:
 *         description: Combate creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/combat', combat_controller_js_1.createCombatHandler);
/**
 * @openapi
 * /api/combat:
 *   get:
 *     summary: Obtiene una lista de combates con paginación
 *     description: Retorna una lista de combates paginada.
 *     tags:
 *       - Combat
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [10, 25, 50]
 *           default: 10
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nombre del combate
 *                   date:
 *                     type: string
 *                     description: Fecha del combate
 *                   location:
 *                     type: string
 *                     description: Ubicación del combate
 *       400:
 *         description: Tamaño de página inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/combat', combat_controller_js_1.getAllCombatsHandler);
/**
 * @openapi
 * /api/combat/{id}:
 *   get:
 *     summary: Obtiene un combate por ID
 *     description: Retorna los detalles de un combate específico.
 *     tags:
 *       - Combat
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora del combate
 *                 gym:
 *                   type: string
 *                   description: ID del gimnasio donde se lleva a cabo el combate
 *                 boxers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de IDs de los boxeadores participantes
 *       404:
 *         description: Combate no encontrado
 */
router.get('/combat/:id', combat_controller_js_1.getCombatByIdHandler);
/**
 * @openapi
 * /api/combat/{id}:
 *   put:
 *     summary: Actualiza un combate por ID
 *     description: Modifica los detalles de un combate específico.
 *     tags:
 *       - Combat
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora del combate
 *               gym:
 *                 type: string
 *                 description: ID del gimnasio donde se lleva a cabo el combate
 *               boxers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de IDs de los boxeadores participantes
 *     responses:
 *       200:
 *         description: Combate actualizado exitosamente
 *       404:
 *         description: Combate no encontrado
 */
router.put('/combat/:id', combat_controller_js_1.updateCombatHandler);
/**
 * @openapi
 * /api/combat/{id}:
 *   delete:
 *     summary: Elimina un combate por ID
 *     description: Elimina un combate específico.
 *     tags:
 *       - Combat
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Combate eliminado exitosamente
 *       404:
 *         description: Combate no encontrado
 */
router.delete('/combat/:id', combat_controller_js_1.deleteCombatHandler);
/**
 * @openapi
 * /api/combat/{id}/boxers:
 *   get:
 *     summary: Obtener boxeadores por ID del combate
 *     description: Obtiene una lista de los boxeadores participantes en un combate específico usando su ID.
 *     tags:
 *       - Combat
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de boxeadores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del boxeador
 *                   name:
 *                     type: string
 *                     description: Nombre del boxeador
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del boxeador
 *       404:
 *         description: Combate no encontrado
 */
router.get('/combat/:id/boxers', combat_controller_js_1.getBoxersByCombatIdHandler);
/**
 * @openapi
 * /api/combat/{id}/oculto:
 *   put:
 *     summary: Cambia la visibilidad de un combate por ID
 *     description: Oculta o muestra un combate específico.
 *     tags:
 *       - Combat
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isHidden:
 *                 type: boolean
 *                 description: Estado de visibilidad del combate
 *     responses:
 *       200:
 *         description: Combate actualizado exitosamente
 *       404:
 *         description: Combate no encontrado
 */
router.put('/combat/:id/oculto', combat_controller_js_1.hideCombatHandler);
exports.default = router;
