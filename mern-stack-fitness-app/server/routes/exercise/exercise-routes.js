const express = require('express');
const passport = require('passport');
const router = express.Router();

const ExerciseModel = require('../../models/ExerciseSchema');

const { checkPermissionsExercise } = require('../../auth/checkPermissions');

// EJERCICIOS

// Creación de ejercicio
router.post("/create/exercise", async (req, res, next) => {
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
				const Exercise = new ExerciseModel({
					nombreEjercicio: req.body.exercisename,
					tipoEjercicio: req.body.exercisetype,
					creadoPor: user._id
				});
				const savedExercise = await Exercise.save()
				res.json(savedExercise);
			} catch(err) {
				next(err);
			}
			
		}
	})(req,res,next);
});

router.get("/exercises/created/:creator?", async (req,res,next) => {
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
				if(req.params.creator) {
					const exercises = await ExerciseModel.find(
						req.params.creator !== "undefined" ?
							{creadoPor: req.params.creator} 
						:
							{}
					);
					res.json(exercises);
				}
				else {
					const exercises = await ExerciseModel.find({});
					res.json(exercises);
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

router.get("/exercise/list/:search?", async (req,res,next) => {
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
				if(req.params.search) {
					const exercises = await ExerciseModel.find(
						req.params.search !== "undefined" ?
							{nombreEjercicio: new RegExp(req.params.search, 'i')} 
						:
							{}
					);
					res.json(exercises);
				}
				else {
					const exercises = await ExerciseModel.find({});
					res.json(exercises);
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

// Consulta del ejercicio con la id correspondiente
router.get("/exercise/:id", async (req, res, next) => {
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
				const permissionsRes = await checkPermissionsExercise(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsRes.error;
				const resExercise = permissionsRes.exercise;
				const resPermission = permissionsRes.permission;
				if(resError || !resExercise) {
					res.status(resError.code).send(resError.message);
				}
				else if(resExercise) {
					res.json({
						exerciseInfo: resExercise,
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

// Modificación del ejercicio con la id correspondiente
router.post("/exercise/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsExercise(user, req);
				const resError = permissionsResData.error;
				const resExercise = permissionsResData.exercise;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					resExercise.nombreEjercicio = req.body.exercisename
					resExercise.tipoEjercicio = req.body.exercisetype

					const savedExercise = await resExercise.save();
					res.json(savedExercise);
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
router.delete("/exercise/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsExercise(user, req);
				const resError = permissionsResData.error;
				const resExercise = permissionsResData.exercise;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedExercise = await resExercise.remove();
					res.json(removedExercise);
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

module.exports = router