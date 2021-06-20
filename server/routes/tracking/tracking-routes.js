const express = require('express');
const passport = require('passport');
const router = express.Router();

const TrackingModel = require('../../models/TrackingSchema');

const { checkPermissionsUser, checkPermissionsPlan } = require('../../auth/checkPermissions');

router.post("/associate/tracking/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);
			}
			else if(permissionsResData && resPermission.includes("checkplans")) {
				try {
					const Tracking = new TrackingModel({
						nombrePlan: req.body.trackingname,
						usuarioPlan: req.params.id,
						valorObjetivo: req.body.targetvalue,
						unidadObjetivo: req.body.trackingunit,
						medidasSeguidas: req.body.trackedmeasures
					});
					const savedTracking = await Tracking.save();
					res.json(savedTracking);
				} catch(err) {
					next(err);
				}
			}
		}
	})(req,res,next);
});

router.get("/tracking/list/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);
			}
			else if(permissionsResData && resPermission.includes("checkplans")) {
				try {
					const trackings = await TrackingModel.find({usuarioPlan: req.params.id});
					res.json(trackings)
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

// Consulta del seguimiento con la id correspondiente
router.get("/tracking/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, "Seguimiento", req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resTracking = permissionsResData.plan;
				if(resError || !resTracking) {
					res.status(resError.code).send(resError.message);
				}
				else if(resTracking) {
					res.json(resTracking);
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

// Modificación del ejercicio con la id correspondiente
router.post("/tracking/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, "Seguimiento", req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resTracking = permissionsResData.plan;
				const resPermission = permissionsResData.permission;
				if(resError || !resTracking) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					resTracking.nombrePlan = req.body.trackingname;
					resTracking.valorObjetivo = req.body.targetvalue;
					resTracking.unidadObjetivo = req.body.trackingunit;
					const savedTracking = await resTracking.save();
					res.json(savedTracking);
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

// Eliminación de la rutina con la id correspondiente
router.delete("/tracking/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, "Seguimiento", req);
				const resError = permissionsResData.error;
				const resTracking = permissionsResData.plan;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedTracking = await resTracking.deleteOne();
					res.json(removedTracking);
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