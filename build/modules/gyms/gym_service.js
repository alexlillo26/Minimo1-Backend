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
exports.loginGym = exports.hideGym = exports.deleteGym = exports.updateGym = exports.getGymById = exports.getAllGyms = exports.addGym = void 0;
const gym_models_js_1 = __importDefault(require("./gym_models.js"));
const addGym = (gymData) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el nombre, correo o lugar ya existen
    const existingGym = yield gym_models_js_1.default.findOne({
        $or: [{ name: gymData.name }, { email: gymData.email }, { place: gymData.place }]
    });
    if (existingGym) {
        throw new Error('El nombre, correo electrónico o lugar del gimnasio ya están en uso');
    }
    // Eliminar el campo _id si está vacío
    if (gymData._id === "") {
        delete gymData._id;
    }
    const gym = new gym_models_js_1.default(gymData);
    return yield gym.save();
});
exports.addGym = addGym;
const getAllGyms = (page = 1, pageSize = 10) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * pageSize;
    const gyms = yield gym_models_js_1.default.find()
        .sort({ isHidden: 1 })
        .skip(skip)
        .limit(pageSize);
    const totalGyms = yield gym_models_js_1.default.countDocuments();
    const totalPages = Math.ceil(totalGyms / pageSize);
    return {
        gyms,
        totalGyms,
        totalPages,
        currentPage: page
    };
});
exports.getAllGyms = getAllGyms;
const getGymById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gym_models_js_1.default.findById(id);
});
exports.getGymById = getGymById;
const updateGym = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gym_models_js_1.default.updateOne({ _id: id }, { $set: updateData });
});
exports.updateGym = updateGym;
const deleteGym = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gym_models_js_1.default.deleteOne({ _id: id });
});
exports.deleteGym = deleteGym;
const hideGym = (id, isHidden) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gym_models_js_1.default.updateOne({ _id: id }, { $set: { isHidden } });
});
exports.hideGym = hideGym;
const loginGym = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gym_models_js_1.default.findOne({ email, password });
});
exports.loginGym = loginGym;
