const express = require('express');
const passport = require('passport');
const router = express.Router();

const ActivityModel = require('../../models/ActivitySchema');

const { checkPermissionsActivity } = require('../../auth/checkPermissions');

router.post("/create/activity", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const permissionsResData = await checkPermissionsActivity(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resPermission = permissionsResData.permission;
			if(permissionsResData && resPermission.includes("write")) {
				try {
					const Activity = new ActivityModel({
						nombreActividad: req.body.activityname,
						equipamientoActividad: req.body.activityequipment,
						descripcionActividad: req.body.activitydescription
					});
					const savedActivity = await Activity.save();
					res.json(savedActivity);
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

// Lista de actividades
router.get("/activity/list", async (req, res, next) => {
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
				const activities = await ActivityModel.find({});
				res.json(activities);
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

router.get("/activity/:id", async (req, res, next) => {
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
				const permissionsRes = await checkPermissionsActivity(user, req);
				const resError = permissionsRes.error;
				const resActivity = permissionsRes.activity;
				const resPermission = permissionsRes.permission;
				if(resError || !resActivity) {
					res.status(resError.code).send(resError.message);
				}
				else {
					res.json({
						activityInfo: resActivity,
						permission: resPermission
					});
				}
			} catch(err) {
				next(err)
			}
		}
	})(req,res,next);
});

// Modificación del ejercicio con la id correspondiente
router.post("/activity/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsActivity(user, req);
				const resError = permissionsResData.error;
				const resActivity = permissionsResData.activity;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					resActivity.nombreActividad = req.body.activityname;
					resActivity.equipamientoActividad = req.body.activityequipment;
					resActivity.descripcionActividad = req.body.activitydescription;
					
					const savedActivity = await resActivity.save();
					res.json(savedActivity);	
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

// Eliminación del ejercicio con la id correspondiente
router.delete("/activity/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsActivity(user, req);
				const resError = permissionsResData.error;
				const resActivity = permissionsResData.activity;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedActivity = await resActivity.remove();	// Se elimina la actividad
					res.json(removedActivity);	// Se manda como respuesta la actividad eliminada
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