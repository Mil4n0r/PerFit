// Mediante Axios realizaremos peticiones HTTP asíncronas para modificar el contenido

import axios from 'axios';

axios.defaults.withCredentials = true;

// Estas peticiones son procesadas por el Middleware de Express, que se encuentra en /backend/server.js

// CRUD //////////////////////////////////////

// USUARIO

export * from './api/user_api';

// ALIMENTO

export * from './api/food_api';

// COMIDA

export * from './api/meal_api';

// DIETA

export * from './api/diet_api';

// EJERCICIO

export * from './api/exercise_api';

// ENTRENAMIENTO

export * from './api/training_api';

// RUTINA

export * from './api/routine_api';

// ACTIVIDAD

export * from './api/activity_api';

// CLASE

export * from './api/class_api';

// SEGUIMIENTO

export * from './api/tracking_api';

// MEDIDA

export * from './api/measure_api';

// SALA

export * from './api/room_api'

// CLASE

export * from './api/class_api';

// SUSCRIPCIÓN

export * from './api/subscription_api';

// SOLICITUD

export * from './api/request_api';

//////////////////////////////////////////////

// CONTEXTO

export * from './api/context_api';
