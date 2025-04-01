"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gymSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Asegura que el nombre del gimnasio sea único
    },
    place: {
        type: String,
        required: true,
        unique: true // Asegura que la ubicación del gimnasio sea única
    },
    price: {
        type: Number,
        required: true
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Valida la estructura del correo electrónico
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const Gym = mongoose_1.default.model('Gym', gymSchema);
exports.default = Gym;
