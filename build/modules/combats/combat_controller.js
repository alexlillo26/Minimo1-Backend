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
exports.hideCombatHandler = exports.getBoxersByCombatIdHandler = exports.deleteCombatHandler = exports.updateCombatHandler = exports.getCombatByIdHandler = exports.getAllCombatsHandler = exports.createCombatHandler = exports.saveMethodHandler = void 0;
// src/controllers/_controller.ts
const combat_service_js_1 = require("../combats/combat_service.js");
const saveMethodHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const combat = (0, combat_service_js_1.saveMethod)();
        res.json(combat);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.saveMethodHandler = saveMethodHandler;
const createCombatHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const combat = yield (0, combat_service_js_1.createCombat)(req.body);
        res.json(combat);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createCombatHandler = createCombatHandler;
const getAllCombatsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        if (![10, 25, 50].includes(pageSize)) {
            return res.status(400).json({ message: 'El tamaño de la lista debe ser 10, 25 o 50' });
        }
        const combats = yield (0, combat_service_js_1.getAllCombats)(page, pageSize);
        res.status(200).json(combats);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllCombatsHandler = getAllCombatsHandler;
const getCombatByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const combat = yield (0, combat_service_js_1.getCombatById)(req.params.id);
        res.json(combat);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getCombatByIdHandler = getCombatByIdHandler;
const updateCombatHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const combat = yield (0, combat_service_js_1.updateCombat)(req.params.id, req.body);
        res.json(combat);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateCombatHandler = updateCombatHandler;
const deleteCombatHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const combat = yield (0, combat_service_js_1.deleteCombat)(req.params.id);
        res.json(combat);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteCombatHandler = deleteCombatHandler;
const getBoxersByCombatIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boxers = yield (0, combat_service_js_1.getBoxersByCombatId)(req.params.id);
        res.json(boxers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBoxersByCombatIdHandler = getBoxersByCombatIdHandler;
const hideCombatHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isHidden } = req.body;
        const combat = yield (0, combat_service_js_1.hideCombat)(id, isHidden);
        if (!combat) {
            res.status(404).json({ message: 'Combate no encontrado' });
        }
        res.status(200).json({ message: `Combate ${isHidden ? 'oculto' : 'visible'}`, combat });
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
});
exports.hideCombatHandler = hideCombatHandler;
