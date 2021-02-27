// Mediante la API Fetch realizaremos peticiones HTTP asíncronas para modificar el contenido

import axios from 'axios';

axios.defaults.withCredentials = true;

// Estas peticiones son procesadas por el Middleware de Express, que se encuentra en /backend/server.js

// CRUD //////////////////////////////////////

// USUARIO

export * from './api/user_api';

// ALIMENTO

export * from './api/food_api';

// EJERCICIO

export * from './api/exercise_api';

// RUTINA

export * from './api/routine_api';

//////////////////////////////////////////////

// CONTEXTO

export * from './api/context_api';