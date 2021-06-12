const express = require('express');
const passport = require('passport');
const router = express.Router();

const { checkPermissionsUser, checkPermissionsPlan } = require('../../auth/checkPermissions');

const RoutineModel = require('../../models/RoutineSchema');
const TrainingModel = require('../../models/TrainingSchema');
const mongoose = require('mongoose');

router.post("/associate/routine/:id", async (req, res, next) => {
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
					const Routine = new RoutineModel({
						tiempoRutina: req.body.routinetime,
						//entrenamientosRutina: req.body.routinetrainings
						nombrePlan: req.body.routinename,
						usuarioPlan: req.params.id
					});
					const savedRoutine = await Routine.save();
					res.json(savedRoutine);
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

router.get("/routine/list/:id", async (req, res, next) => {
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
					const routines = await RoutineModel.find({usuarioPlan: req.params.id});
					res.json(routines);
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

// Consulta del ejercicio con la id correspondiente
router.get("/routine/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resRoutine = permissionsResData.plan;
				if(resError || !resRoutine) {
					res.status(resError.code).send(resError.message);
				}
				else if(resRoutine) {
					res.json(resRoutine);
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
router.post("/routine/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resRoutine = permissionsResData.plan;
				const resPermission = permissionsResData.permission;
				if(resError || !resRoutine) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					resRoutine.nombrePlan = req.body.routinename;
					resRoutine.tiempoRutina = req.body.routinetime;
					const savedRoutine = await resRoutine.save();
					res.json(savedRoutine);
				}
			} catch(err) {
				next(err);
			}
			
		}
	})(req,res,next);
});

// Eliminación de la rutina con la id correspondiente
router.delete("/routine/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resRoutine = permissionsResData.plan;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedRoutine = await resRoutine.remove();
					res.json(removedRoutine);
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