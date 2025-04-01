"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Asegura que el nombre de usuario sea único
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Valida la estructura del correo electrónico
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Asegura que la contraseña tenga al menos 8 caracteres
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isHidden: {
        type: Boolean,
        default: false
    }
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
