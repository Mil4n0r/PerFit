const express = require('express');
const passport = require('passport');
const router = express.Router();

const ExerciseModel = require('../../models/ExerciseSchema');

const { checkPermissionsExercise } = require('../../auth/checkPermissions');

const mongoose = require('mongoose');

// EJERCICIOS

// Creación de ejercicio
router.post("/create/exercise", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			// Creación del ejercicio
			const Exercise = new ExerciseModel({
				nombreEjercicio: req.body.exercisename,
				tipoEjercicio: req.body.exercisetype,
				creadoPor: user._id
			});
			Exercise
				.save()		// Se almacena el ejercicio
				.then((Exercise) => {
					res.json(Exercise);		// Se manda como respuesta el ejercicio
				})
				.catch((err) => {
					next(err);
				});
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
			if(req.params.search) {
				await ExerciseModel.find(
					req.params.search !== "undefined" ?
						{nombreEjercicio: new RegExp(req.params.search, 'i')} 
					:
						{}
					,
					(err, exercises) => {	// Buscamos en el modelo todos los ejercicios registrados
					if(err) {
						next(err);	
					} 
					else {	// Se manda como respuesta el contenido de la lista de ejercicios (en JSON)
						res.json(exercises);	
					}
				});
			}
			else {
				await ExerciseModel.find((err, exercises) => {	// Buscamos en el modelo todos los ejercicios registrados
					if(err) {
						next(err);	
					} 
					else {	// Se manda como respuesta el contenido de la lista de ejercicios (en JSON)
						res.json(exercises);	
					}
				});
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
			const permissionsRes = await checkPermissionsExercise(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsRes.error;
			const resExercise = permissionsRes.exercise;
			const resPermission = permissionsRes.permission;
			if(resError || !resExercise) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(resExercise) {
				res.json({
					exerciseInfo: resExercise,
					permission: resPermission
				});
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
			const permissionsResData = await checkPermissionsExercise(user, req);
			const resError = permissionsResData.error;
			const resExercise = permissionsResData.exercise;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("write")) {
				resExercise.nombreEjercicio = req.body.exercisename
				resExercise.tipoEjercicio = req.body.exercisetype
				// resExercise.creadoPor se queda igual

				resExercise
					.save()		// Se almacena el alimento
					.then(exerciseData => {
						res.json(exerciseData)	// Se manda como respuesta el alimento modificado
					})
					.catch((err) => {
						next(err);
					});
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
			const permissionsResData = await checkPermissionsExercise(user, req);
			const resError = permissionsResData.error;
			const resExercise = permissionsResData.exercise;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("delete")) {
				resExercise
					.remove()	// Se elimina el alimento
					.then(exerciseData => {
						res.json(exerciseData);	// Se manda como respuesta el alimento eliminado
					})
					.catch((err) => {
						next(err);
					});
			}
		}
	})(req,res,next);
});

module.exports = router