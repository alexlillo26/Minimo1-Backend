"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserHandler = exports.hideUserHandler = exports.deleteUserHandler = exports.updateUserHandler = exports.getUserByIdHandler = exports.getAllUsersHandler = exports.createUserHandler = exports.saveMethodHandler = void 0;
// src/controllers/user_controller.ts
const user_service_js_1 = require("../users/user_service.js");
const saveMethodHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = (0, user_service_js_1.saveMethod)();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.saveMethodHandler = saveMethodHandler;
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, user_service_js_1.createUser)(req.body);
        res.status(201).json(data);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'El correo electrónico no es válido o la contraseña es demasiado corta' });
        }
        else if (error.message.includes('ya están en uso')) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Error interno en el servidor', error });
        }
    }
});
exports.createUserHandler = createUserHandler;
const getAllUsersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);
        if (![10, 25, 50].includes(pageSize)) {
            return res.status(400).json({ message: 'El tamaño de la lista debe ser 10, 25 o 50' });
        }
        const { users, totalUsers, totalPages, currentPage } = yield (0, user_service_js_1.getAllUsers)(page, pageSize);
        res.status(200).json({
            users,
            totalUsers,
            totalPages,
            currentPage,
        });
    }
    catch (error) {
        console.error('Error en getAllUsersHandler:', error);
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
});
exports.getAllUsersHandler = getAllUsersHandler;
const getUserByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, user_service_js_1.getUserById)(req.params.id);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserByIdHandler = getUserByIdHandler;
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, user_service_js_1.updateUser)(req.params.id, req.body);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, user_service_js_1.deleteUser)(req.params.id);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUserHandler = deleteUserHandler;
const hideUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isHidden } = req.body;
        const user = yield (0, user_service_js_1.hideUser)(id, isHidden);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({
            message: `Usuario ${isHidden ? 'ocultado' : 'visible'} correctamente`,
            user
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
});
exports.hideUserHandler = hideUserHandler;
const loginUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, user_service_js_1.loginUser)(email, password);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Inicio de sesión completado', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
});
exports.loginUserHandler = loginUserHandler;
