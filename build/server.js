"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./modules/users/user_routes")); // Nota el .js al final
const gym_routes_1 = __importDefault(require("./modules/gyms/gym_routes")); // Nota el .js al final
const combat_routes_1 = __importDefault(require("./modules/combats/combat_routes")); // Nota el .js al final
const tournament_routes_1 = __importDefault(require("./modules/tournaments/tournament_routes")); // Nota el .js al final
const corsHandler_1 = require("./middleware/corsHandler");
const loggingHandler_1 = require("./middleware/loggingHandler");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config(); // Cargamos las variables de entorno desde el archivo .env
const app = (0, express_1.default)();
const LOCAL_PORT = process.env.SERVER_PORT || 9000;
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuarios y Torneos',
            version: '1.0.0',
            description: 'Documentación de la API de Usuarios, Gimnasios, Combates y Torneos'
        },
        tags: [
            { name: 'Users', description: 'Rutas relacionadas con la gestión de usuarios' },
            { name: 'Gym', description: 'Rutas relacionadas con los gimnasios' },
            { name: 'Combat', description: 'Rutas relacionadas con los combates' },
            { name: 'Tournaments', description: 'Rutas relacionadas con los torneos' }
        ],
        servers: [
            { url: `http://localhost:${LOCAL_PORT}` }
        ]
    },
    apis: [
        './src/modules/users/*.ts',
        './src/modules/gyms/*.ts',
        './src/modules/combats/*.ts',
        './src/modules/tournaments/*.ts' // Asegúrate de incluir esta línea
    ]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware
app.use(express_1.default.json());
app.use(loggingHandler_1.loggingHandler);
app.use(corsHandler_1.corsHandler);
// Rutas
app.use('/api', user_routes_1.default);
app.use('/api', gym_routes_1.default);
app.use('/api', combat_routes_1.default);
app.use('/api', tournament_routes_1.default); // Registramos las rutas de tournament
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});
// Conexión a MongoDB
mongoose_1.default
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/proyecto')
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.error('DB Connection Error:', error));
// Iniciar el servidor
app.listen(LOCAL_PORT, () => {
    console.log('Server listening on port: ' + LOCAL_PORT);
    console.log(`Swagger disponible en http://localhost:${LOCAL_PORT}/api-docs`);
});
