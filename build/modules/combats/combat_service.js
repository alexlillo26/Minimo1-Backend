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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideCombat = exports.getBoxersByCombatId = exports.deleteCombat = exports.updateCombat = exports.getCombatById = exports.getAllCombats = exports.createCombat = exports.saveMethod = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const combat_models_js_1 = __importDefault(require("../combats/combat_models.js"));
const saveMethod = () => {
    return 'Hola';
};
exports.saveMethod = saveMethod;
const createCombat = (combatData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Asegúrate de que gym es un ObjectId válido.
        if (typeof combatData.gym === 'string') {
            combatData.gym = new mongoose_1.default.Types.ObjectId(combatData.gym);
        }
        // Asegúrate de que boxers es un array ObjectId válido.
        if (Array.isArray(combatData.boxers)) {
            combatData.boxers = combatData.boxers.map(id => typeof id === 'string' ? new mongoose_1.default.Types.ObjectId(id) : id);
        }
        console.log('Datos de combate procesados:', combatData);
        const combat = new combat_models_js_1.default(combatData);
        return yield combat.save();
    }
    catch (error) {
        console.error('Createcombat error:', error);
        throw error;
    }
});
exports.createCombat = createCombat;
const getAllCombats = (page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Contar el número de registros omitidos
        const skip = (page - 1) * pageSize;
        // Consulta de registros totales
        const totalCombats = yield combat_models_js_1.default.countDocuments();
        // cCalcular el número total de páginas
        const totalPages = Math.ceil(totalCombats / pageSize);
        // cObtener la página actual de registros
        const combats = yield combat_models_js_1.default.find().skip(skip).limit(pageSize);
        // Devolución de información y registros de paginación
        return {
            combats,
            totalCombats,
            totalPages,
            currentPage: page,
            pageSize
        };
    }
    catch (error) {
        console.error('Error in getAllCombats:', error);
        throw error;
    }
});
exports.getAllCombats = getAllCombats;
const getCombatById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield combat_models_js_1.default.findById(id).populate('boxers');
});
exports.getCombatById = getCombatById;
const updateCombat = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield combat_models_js_1.default.updateOne({ _id: id }, { $set: updateData });
});
exports.updateCombat = updateCombat;
const deleteCombat = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield combat_models_js_1.default.deleteOne({ _id: id });
});
exports.deleteCombat = deleteCombat;
const getBoxersByCombatId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const combat = yield combat_models_js_1.default.findById(id).populate('boxers');
    return combat ? combat.boxers : [];
});
exports.getBoxersByCombatId = getBoxersByCombatId;
const hideCombat = (id, isHidden) => __awaiter(void 0, void 0, void 0, function* () {
    return yield combat_models_js_1.default.updateOne({ _id: id }, { $set: { isHidden } });
});
exports.hideCombat = hideCombat;
