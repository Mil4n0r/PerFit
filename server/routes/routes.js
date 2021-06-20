const express = require('express');
const router = express.Router();

// RUTAS NO PROTEGIDAS

router.use('', require('./user/access-routes'));
router.use('', require('./subscription/unprotected-subscription-routes'));

module.exports = router;