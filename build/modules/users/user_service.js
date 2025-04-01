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
exports.getUserCount = exports.loginUser = exports.hideUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = exports.saveMethod = void 0;
// src/services/user_service.ts
const user_models_js_1 = __importDefault(require("../users/user_models.js"));
const saveMethod = () => {
    return 'Hola';
};
exports.saveMethod = saveMethod;
// Crear usuario con validaciones
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el nombre de usuario o correo ya existen
    const existingUser = yield user_models_js_1.default.findOne({
        $or: [{ name: userData.name }, { email: userData.email }]
    });
    if (existingUser) {
        throw new Error('El nombre de usuario o el correo electrónico ya están en uso');
    }
    // Verificar que la contraseña tenga al menos 8 caracteres
    if (userData.password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
    }
    const user = new user_models_js_1.default(userData);
    return yield user.save();
});
exports.createUser = createUser;
// Obtener usuarios (solo los visibles)
const getAllUsers = (page = 1, pageSize = 10) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * pageSize;
    const users = yield user_models_js_1.default.find()
        .sort({ isHidden: 1 }) // primero los visibles
        .skip(skip)
        .limit(pageSize);
    const totalUsers = yield user_models_js_1.default.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);
    return {
        users,
        totalUsers,
        totalPages,
        currentPage: page
    };
});
exports.getAllUsers = getAllUsers;
// Obtener un usuario por ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_models_js_1.default.findById(id);
    if (user) {
        return Object.assign(Object.assign({}, user.toObject()), { age: calculateAge(user.birthDate) });
    }
    return null;
});
exports.getUserById = getUserById;
// Actualizar usuario
const updateUser = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_models_js_1.default.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updateUser = updateUser;
// Eliminar usuario
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_models_js_1.default.findByIdAndDelete(id);
});
exports.deleteUser = deleteUser;
// Ocultar o mostrar usuario
const hideUser = (id, isHidden) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_models_js_1.default.findByIdAndUpdate(id, { isHidden }, { new: true });
});
exports.hideUser = hideUser;
// Iniciar sesión
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_models_js_1.default.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    // Verificar si el usuario está oculto
    if (user.isHidden) {
        throw new Error('Este usuario está oculto y no puede iniciar sesión');
    }
    // Comparar la contraseña ingresada con la almacenada
    if (user.password !== password) {
        throw new Error('Contraseña incorrecta');
    }
    return user;
});
exports.loginUser = loginUser;
// Calcular edad a partir de la fecha de nacimiento
const calculateAge = (birthDate) => {
    if (!birthDate) {
        return null;
    }
    const diff = Date.now() - new Date(birthDate).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};
// Contar usuarios (solo los visibles)
const getUserCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_models_js_1.default.countDocuments({ isHidden: false });
});
exports.getUserCount = getUserCount;
