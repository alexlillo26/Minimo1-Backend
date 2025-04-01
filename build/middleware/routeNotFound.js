"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = void 0;
function routeNotFound(req, res, next) {
    const error = new Error('Route Not Found');
    console.log(error);
    res.status(404).json({ error: error.message }); // ojo aqui que si no posem error.message no s'envia l'error!!!
}
exports.routeNotFound = routeNotFound;
