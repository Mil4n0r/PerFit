const express = require('express');
const router = express.Router();

// RUTAS QUE REQUIEREN AUTENTICACIÓN ESPECIAL

router.use('', require('./user/user-routes'));
router.use('', require('./routine/routine-routes'));
router.use('', require('./training/training-routes'));
router.use('', require('./diet/diet-routes'));
router.use('', require('./meal/meal-routes'));
router.use('', require('./activity/activity-routes'));
router.use('', require('./room/room-routes'));
router.use('', require('./tracking/tracking-routes'));
router.use('', require('./class/class-routes'));
router.use('', require('./subscription/subscription-routes'));
router.use('', require('./request/request-routes'));
router.use('', require('./message/message-routes'));

module.exports = router