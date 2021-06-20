const express = require('express');
const router = express.Router();

// RUTAS SÓLO ACCESIBLES POR USUARIOS AUTENTICADOS

router.use('', require('./user/authentication-routes'));
router.use('', require('./food/food-routes'));
router.use('', require('./exercise/exercise-routes'));
router.use('', require('./measure/measure-routes'));

module.exports = router