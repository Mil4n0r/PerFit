const express = require('express');
//const passport = require('passport');
const router = express.Router();

const SubscriptionModel = require('../../models/SubscriptionSchema');

// Lista de actividades
router.get("/subscription/list", async (req, res, next) => {
	try {
		const activities = await SubscriptionModel.find({});
		res.json(activities);
	} catch(err) {
		next(err);
	}
});

router.get("/subscription/:id", async (req, res, next) => {
	try {
		const activity = await SubscriptionModel.findById(req.params.id);
		res.json(activity.nombreSuscripcion);
	} catch(err) {
		next(err);
	}
});

module.exports = router;