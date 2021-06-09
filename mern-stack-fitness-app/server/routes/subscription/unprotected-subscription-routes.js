const express = require('express');
//const passport = require('passport');
const router = express.Router();

const SubscriptionModel = require('../../models/SubscriptionSchema');

// Lista de actividades
router.get("/subscription/list", async (req, res, next) => {
	await SubscriptionModel.find((err, activities) => {
		if(err) {
			next(err);	
		} 
		else {
			res.json(activities);	
		}
	});
});

router.get("/subscription/:id", async (req, res, next) => {
	await SubscriptionModel.findById(req.params.id,(err, activity) => {
		if(err) {
			next(err);	
		} 
		else {
			res.json(activity.nombreSuscripcion);	
		}
	});
});

module.exports = router;