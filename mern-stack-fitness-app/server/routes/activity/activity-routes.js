const express = require('express');
const passport = require('passport');
const router = express.Router();

const ActivityModel = require('../../models/ActivitySchema');

const { checkPermissionsActivity } = require('../../auth/checkPermissions');

router.post("/create/activity", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const Activity = new ActivityModel({
				nombreActividad: req.body.activityname,
				equipamientoActividad: req.body.activityequipment,
				descripcionActividad: req.body.activitydescription
			});
			Activity
				.save()
				.then((Activity) => {
					res.json(Activity);
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});

// Lista de actividades
router.get("/activity/list", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			ActivityModel.find((err, activities) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(activities);	
				}
			});
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
			const permissionsRes = await checkPermissionsActivity(user, req);
			const resError = permissionsRes.error;
			const resActivity = permissionsRes.activity;
			const resPermission = permissionsRes.permission;
			if(resError || !resActivity) {
				res.status(resError.code).send(resError.message);
			}
			else if(resActivity) {
				res.json({
					activityInfo: resActivity,
					permission: resPermission
				});
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
			const permissionsResData = await checkPermissionsActivity(user, req);
			const resError = permissionsResData.error;
			const resActivity = permissionsResData.activity;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("write")) {
				resActivity.nombreActividad = req.body.activityname;
				resActivity.equipamientoActividad = req.body.activityequipment;
				resActivity.descripcionActividad = req.body.activitydescription;
				// resActivity.creadoPor se queda igual

				resActivity
					.save()		// Se almacena el alimento
					.then(activityData => {
						res.json(activityData)	// Se manda como respuesta el alimento modificado
					})
					.catch((err) => {
						next(err);
					});
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
			const permissionsResData = await checkPermissionsActivity(user, req);
			const resError = permissionsResData.error;
			const resActivity = permissionsResData.activity;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("delete")) {
				resActivity
					.remove()	// Se elimina el alimento
					.then(activityData => {
						res.json(activityData);	// Se manda como respuesta el alimento eliminado
					})
					.catch((err) => {
						next(err);
					});
			}
		}
	})(req,res,next);
});

module.exports = router;