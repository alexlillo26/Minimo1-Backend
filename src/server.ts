import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './modules/users/user_routes'; // Nota el .js al final
import gymRoutes from './modules/gyms/gym_routes'; // Nota el .js al final
import combatRoutes from './modules/combats/combat_routes'; // Nota el .js al final
import tournamentRoutes from './modules/tournaments/tournament_routes'; // Nota el .js al final
import { corsHandler } from './middleware/corsHandler';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';

dotenv.config(); // Cargamos las variables de entorno desde el archivo .env

const app = express();

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

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
    origin: 'http://localhost:4200', // Cambia esto al origen de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(loggingHandler);
app.use(corsHandler);

// Rutas
app.use('/api', userRoutes);
app.use('/api', gymRoutes);
app.use('/api', combatRoutes);
app.use('/api', tournamentRoutes); // Registramos las rutas de tournament

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/proyecto')
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.error('DB Connection Error:', error));

// Iniciar el servidor
app.listen(LOCAL_PORT, () => {
    console.log('Server listening on port: ' + LOCAL_PORT);
    console.log(`Swagger disponible en http://localhost:${LOCAL_PORT}/api-docs`);
});