"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gym_controller_js_1 = require("./gym_controller.js");
const router = express_1.default.Router();
/**
 * @openapi
 * /api/gym:
 *   post:
 *     summary: Crea un nuevo gimnasio
 *     description: Añade un nuevo gimnasio con nombre, ubicación y precio.
 *     tags:
 *       - Gym
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del gimnasio
 *               place:
 *                 type: string
 *                 description: Ubicación del gimnasio
 *               price:
 *                 type: number
 *                 description: Precio de uso del gimnasio
 *               email:
 *                 type: string
 *                 description: Correo electrónico del gimnasio
 *               phone:
 *                 type: string
 *                 description: Teléfono del gimnasio
 *               password:
 *                 type: string
 *                 description: Contraseña del gimnasio
 *     responses:
 *       201:
 *         description: Gimnasio añadido exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/gym', gym_controller_js_1.addGymHandler);
/**
 * @openapi
 * /api/gym:
 *   get:
 *     summary: Obtiene una lista de gimnasios con paginación
 *     description: Retorna una lista de gimnasios paginada.
 *     tags:
 *       - Gym
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
 *                     description: Nombre del gimnasio
 *                   place:
 *                     type: string
 *                     description: Ubicación del gimnasio
 *                   price:
 *                     type: number
 *                     description: Precio por el uso del gimnasio
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del gimnasio
 *                   phone:
 *                     type: string
 *                     description: Teléfono del gimnasio
 *       400:
 *         description: Tamaño de página inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/gym', gym_controller_js_1.getAllGymsHandler);
/**
 * @openapi
 * /api/gym/{id}:
 *   get:
 *     summary: Obtiene un gimnasio por ID
 *     description: Retorna los detalles de un gimnasio específico.
 *     tags:
 *       - Gym
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
 *                 name:
 *                   type: string
 *                   description: Nombre del gimnasio
 *                 place:
 *                   type: string
 *                   description: Ubicación del gimnasio
 *                 price:
 *                   type: number
 *                   description: Precio por uso del gimnasio
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del gimnasio
 *                 phone:
 *                   type: string
 *                   description: Teléfono del gimnasio
 *       404:
 *         description: Gimnasio no encontrado
 */
router.get('/gym/:id', gym_controller_js_1.getGymByIdHandler);
/**
 * @openapi
 * /api/gym/{id}:
 *   put:
 *     summary: Actualiza un gimnasio por ID
 *     description: Modifica los detalles de un gimnasio específico.
 *     tags:
 *       - Gym
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
 *               name:
 *                 type: string
 *                 description: Nombre del gimnasio
 *               place:
 *                 type: string
 *                 description: Ubicación del gimnasio
 *               price:
 *                 type: number
 *                 description: Precio por uso del gimnasio
 *               email:
 *                 type: string
 *                 description: Correo electrónico del gimnasio
 *               phone:
 *                 type: string
 *                 description: Teléfono del gimnasio
 *               password:
 *                 type: string
 *                 description: Contraseña del gimnasio
 *     responses:
 *       200:
 *         description: Gimnasio actualizado exitosamente
 *       404:
 *         description: Gimnasio no encontrado
 */
router.put('/gym/:id', gym_controller_js_1.updateGymHandler);
/**
 * @openapi
 * /api/gym/{id}:
 *   delete:
 *     summary: Elimina un gimnasio por ID
 *     description: Elimina un gimnasio específico.
 *     tags:
 *       - Gym
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gimnasio eliminado exitosamente
 *       404:
 *         description: Gimnasio no encontrado
 */
router.delete('/gym/:id', gym_controller_js_1.deleteGymHandler);
/**
 * @openapi
 * /api/gym/{id}/oculto:
 *   put:
 *     summary: Cambia la visibilidad de un gimnasio por ID
 *     description: Oculta o muestra un gimnasio específico.
 *     tags:
 *       - Gym
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
 *                 description: Indica si el gimnasio está oculto o visible
 *     responses:
 *       200:
 *         description: Éxito
 *       404:
 *         description: Gimnasio no encontrado
 */
router.put('/gym/:id/oculto', gym_controller_js_1.hideGymHandler);
/**
 * @openapi
 * /api/gym/login:
 *   post:
 *     summary: Inicia sesión en un gimnasio
 *     description: Inicia sesión en un gimnasio con un correo electrónico y contraseña.
 *     tags:
 *       - Gym
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del gimnasio
 *               password:
 *                 type: string
 *                 description: Contraseña del gimnasio
 *     responses:
 *       200:
 *         description: Inicio de sesión completado
 *       404:
 *         description: Gimnasio no encontrado
 */
router.post('/gym/login', gym_controller_js_1.loginGymHandler);
exports.default = router;
