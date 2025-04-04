"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = require("../users/user_controller.js");
const router = express_1.default.Router();
/**
 * @openapi
 * /api/main:
 *   get:
 *     summary: Página de bienvenida
 *     description: Retorna un mensaje de bienvenida.
 *     tags:
 *       - Main
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bienvenido a la API
 */
router.get('/main', user_controller_js_1.saveMethodHandler);
/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Añade los detalles de un nuevo usuario.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario (mínimo 8 caracteres)
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/users/register', user_controller_js_1.createUserHandler);
/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtiene una lista de usuarios con paginación
 *     description: Retorna una lista de usuarios paginada.
 *     tags:
 *       - Users
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
 *                   birthDate:
 *                     type: string
 *                     format: date
 *                   email:
 *                     type: string
 *                   isAdmin:
 *                     type: boolean
 *                   isHidden:
 *                     type: boolean
 *       400:
 *         description: Tamaño de página inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/users', user_controller_js_1.getAllUsersHandler);
/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Retorna los detalles de un usuario específico.
 *     tags:
 *       - Users
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
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                 email:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *                 isHidden:
 *                   type: boolean
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/users/:id', user_controller_js_1.getUserByIdHandler);
/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     description: Modifica los detalles de un usuario específico.
 *     tags:
 *       - Users
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
 *               birthDate:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *               isHidden:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/users/:id', user_controller_js_1.updateUserHandler);
/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     description: Elimina un usuario específico de la base de datos.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/users/:id', user_controller_js_1.deleteUserHandler);
/**
 * @openapi
 * /api/users/{id}/oculto:
 *   put:
 *     summary: Cambia la visibilidad de un usuario por ID
 *     description: Establece el campo isHidden de un usuario específico a true o false.
 *     tags:
 *       - Users
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
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/users/:id/oculto', user_controller_js_1.hideUserHandler);
/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión
 *     description: Inicia sesión con un usuario existente.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión completado
 *       400:
 *         description: Usuario no encontrado o contraseña incorrecta
 */
router.post('/users/login', user_controller_js_1.loginUserHandler);
exports.default = router;
