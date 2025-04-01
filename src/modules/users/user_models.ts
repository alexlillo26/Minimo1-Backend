import mongoose from "mongoose";

export interface IUser {
    name: string;
    birthDate: Date;
    email: string;
    password: string;
    isAdmin: boolean;
    isHidden: boolean;
}

const userSchema = new mongoose.Schema({
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
        unique: true, // Asegura que el correo electrónico sea único
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

const User = mongoose.model('User', userSchema);
export default User;