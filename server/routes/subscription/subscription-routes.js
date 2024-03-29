const express = require('express');
const passport = require('passport');
const router = express.Router();

const SubscriptionModel = require('../../models/SubscriptionSchema');

const { checkPermissionsSubscription } = require('../../auth/checkPermissions');

router.post("/create/subscription", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const permissionsResData = await checkPermissionsSubscription(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);
			}
			else if(permissionsResData && resPermission.includes("write")) {
				try {
					const Subscription = new SubscriptionModel({
						nombreSuscripcion: req.body.subscriptionname,
						descripcionSuscripcion: req.body.subscriptiondescription,
						costeSuscripcion: req.body.subscriptioncost,
						costeSuscripcionPCoins: req.body.subscriptionpcoincost,
						duracionSuscripcion: req.body.subscriptionduration,
						permisosSuscripcion: req.body.subscriptionpermissions
					});
					const savedSubscription = await Subscription.save();
					res.json(savedSubscription);
				} catch(err) {
					next(err);
				}
			}
			else {
				res.status(401).send("Usuario no autorizado");
			}
		}
	})(req,res,next);
});

// Modificación de la sala con la id correspondiente
router.post("/subscription/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			try {
				const permissionsResData = await checkPermissionsSubscription(user, req);
				const resError = permissionsResData.error;
				const resSubscription = permissionsResData.subscription;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					resSubscription.nombreSuscripcion = req.body.subscriptionname;
					resSubscription.descripcionSuscripcion = req.body.subscriptiondescription;
					resSubscription.costeSuscripcion = req.body.subscriptioncost;
					resSubscription.costeSuscripcionPCoins = req.body.subscriptionpcoincost;
					resSubscription.duracionSuscripcion = req.body.subscriptionduration;
					resSubscription.permisosSuscripcion = req.body.subscriptionpermissions
					const savedSubscription = await resSubscription.save();
					res.json(savedSubscription);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
			}
			
		}
	})(req,res,next);
});

router.get("/subscription/list/:id?", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			try {
				const subscriptions = await SubscriptionModel.find({});
				res.json(subscriptions);
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

router.get("/subscription/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			try {
				const permissionsRes = await checkPermissionsSubscription(user, req);
				const resError = permissionsRes.error;
				const resSubscription = permissionsRes.subscription;
				const resPermission = permissionsRes.permission;
				if(resError || !resSubscription) {
					res.status(resError.code).send(resError.message);
				}
				else if(resSubscription) {
					res.json({
						subscriptionInfo: resSubscription,
						permission: resPermission
					});
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
			}
			
		}
	})(req,res,next);
});

// Eliminación de la suscripción con la id correspondiente
router.delete("/subscription/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			try {
				const permissionsResData = await checkPermissionsSubscription(user, req);
				const resError = permissionsResData.error;
				const resSubscription = permissionsResData.subscription;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedSubscription = await resSubscription.deleteOne();
					res.json(removedSubscription);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
			}
			
		}
	})(req,res,next);
});

router.post("/contract/subscription/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			try {
				const permissionsResData = await checkPermissionsSubscription(user, req);
				const resError = permissionsResData.error;
				const resSubscription = permissionsResData.subscription;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("renew")) {
					const today_date = new Date();
					const expire_date = new Date(today_date.setDate(today_date.getDate()+resSubscription.duracionSuscripcion));
					user.suscripcionMiembro.planSuscripcion = resSubscription._id;
					user.suscripcionMiembro.fechaVencimiento = expire_date;
					if(user.balanceMonedas >=resSubscription.costeSuscripcionPCoins) {
						user.balanceMonedas -= resSubscription.costeSuscripcionPCoins;
						const savedUser = await user.save();
						res.json(savedUser);
					}
					else {
						res.status(403).send("No hay suficientes P-Coins")
					}
					
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
			}
			
		}
	})(req,res,next);
});

module.exports = router;