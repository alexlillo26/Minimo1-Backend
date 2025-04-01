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
exports.loginGymHandler = exports.hideGymHandler = exports.deleteGymHandler = exports.updateGymHandler = exports.getGymByIdHandler = exports.getAllGymsHandler = exports.addGymHandler = void 0;
const gym_service_js_1 = require("./gym_service.js");
const addGymHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ADD GYM!!!!");
    try {
        const gym = yield (0, gym_service_js_1.addGym)(req.body);
        res.status(201).json(gym);
    }
    catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'El correo electrónico no es válido' });
        }
        else if (error.message.includes('ya están en uso')) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Error interno en el servidor', error });
        }
    }
});
exports.addGymHandler = addGymHandler;
const getAllGymsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);
        if (![10, 25, 50].includes(pageSize)) {
            return res.status(400).json({ message: 'El tamaño de la lista debe ser 10, 25 o 50' });
        }
        const { gyms, totalGyms, totalPages, currentPage } = yield (0, gym_service_js_1.getAllGyms)(page, pageSize);
        res.status(200).json({ gyms, totalGyms, totalPages, currentPage });
    }
    catch (error) {
        console.error('Error en getAllGymsHandler:', error);
        res.status(500).json({ message: 'Error interno del servidor: ', error });
    }
});
exports.getAllGymsHandler = getAllGymsHandler;
const getGymByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gym = yield (0, gym_service_js_1.getGymById)(req.params.id);
        res.json(gym);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getGymByIdHandler = getGymByIdHandler;
const updateGymHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gym = yield (0, gym_service_js_1.updateGym)(req.params.id, req.body);
        res.json(gym);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateGymHandler = updateGymHandler;
const deleteGymHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gym = yield (0, gym_service_js_1.deleteGym)(req.params.id);
        res.json(gym);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteGymHandler = deleteGymHandler;
const hideGymHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isHidden } = req.body;
        const gym = yield (0, gym_service_js_1.hideGym)(id, isHidden);
        if (!gym) {
            res.status(404).json({ message: 'Gimnasio no encontrado' });
        }
        res.status(200).json({ message: `Gimnasio ${isHidden ? 'oculto' : 'visible'}`, gym });
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
});
exports.hideGymHandler = hideGymHandler;
const loginGymHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const gym = yield (0, gym_service_js_1.loginGym)(email, password);
        if (!gym) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Inicio de sesión completado', gym });
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
});
exports.loginGymHandler = loginGymHandler;
