const express = require('express');
const router = express.Router();

// RUTAS NO PROTEGIDAS

router.use('', require('./user/access-routes'));

module.exports = router;