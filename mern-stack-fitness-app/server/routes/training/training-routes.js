const express = require('express');
const passport = require('passport');
const router = express.Router();

const RoutineModel = require('../../models/RoutineSchema');
const WorkoutModel = require('../../models/WorkoutSchema');
const TrainingModel = require('../../models/TrainingSchema');

const startOfDay = require('date-fns/startOfDay');
const endOfDay = require('date-fns/endOfDay');
const startOfMonth = require('date-fns/startOfMonth');
const endOfMonth = require('date-fns/endOfMonth');

const { checkPermissionsPlan } = require('../../auth/checkPermissions');

const mongoose = require('mongoose');

router.post("/associate/routine/training/:id", async (req, res, next) => {
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
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					const Training = new TrainingModel({
						nombreEntrenamiento: req.body.trainingname,
						diaEntrenamiento: req.body.trainingday
					});
					const savedTraining = await Training.save();
					const savedRoutine = await RoutineModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								entrenamientosRutina: mongoose.Types.ObjectId(Training._id)
							}
						},
						{useFindAndModify: false},
						{ runValidators: true }
					);
					res.json(savedTraining);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err)
			}
		}
	})(req,res,next);
});

router.get("/training/list/:id/:date?", async (req, res, next) => {
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
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("read")) {	
					if(req.params.date) {
						const routine = await RoutineModel.findById(req.params.id)
							.populate({
								path: "entrenamientosRutina",
								populate: {
									path: "trabajoEntrenamiento",
									populate: {
										path: "ejercicioEntrenamiento"
									}
								},
								match: {
									diaEntrenamiento: {
										$gte: startOfDay(new Date(req.params.date)),
										$lte: endOfDay(new Date(req.params.date)),
									}
								}
							})
						res.json(routine.entrenamientosRutina);
					}
					else {
						const routine = await RoutineModel.findById(req.params.id)
							.populate({
								path: "entrenamientosRutina",
								populate: {
									path: "trabajoEntrenamiento",
									populate: {
										path: "ejercicioEntrenamiento"
									}
								}
							});
						res.json(routine.entrenamientosRutina);
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

router.get("/training/list/month/:id/:date", async (req, res, next) => {
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
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("read")) {
					const routine = await RoutineModel.findById(req.params.id)
						.populate({
							path: "entrenamientosRutina",
							populate: {
								path: "trabajoEntrenamiento",
								populate: {
									path: "ejercicioEntrenamiento"
								}
							},
							match: {
								diaEntrenamiento: {
									$gte: startOfMonth(new Date(req.params.date)),
									$lte: endOfMonth(new Date(req.params.date))
								}
							}
						})
					res.json(routine.entrenamientosRutina);
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

// Eliminación del entrenamiento con la id correspondiente
router.delete("/training/:id/:trainingid", async (req, res, next) => {
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
					var deletedTraining;
					try {
						deletedTraining = await TrainingModel.findByIdAndDelete(req.params.trainingid, {useFindAndModify: false})
					} catch(err) {
						res.status(404).send("Entrenamiento no encontrado");
					}
					if(deletedTraining) {
						await resRoutine.entrenamientosRutina.pull(mongoose.Types.ObjectId(req.params.trainingid));
						const savedRoutine = await resRoutine.save();
						res.json(savedRoutine)
					}
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err_routine) {
				next(err_routine);
			}
		}
	})(req,res,next);
});

router.get("/training/:id/:trainingid", async (req, res, next) => {
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
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("read")) {
					const training = await TrainingModel.findById(req.params.trainingid).populate("trabajoEntrenamiento")
					res.json(training);
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

router.post("/associate/training/workout/:id/:trainingid", async (req, res, next) => {
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
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					const Workout = new WorkoutModel({
						ejercicioEntrenamiento: req.body.trainingexercise,
						numSeries: req.body.numberofseries,
						numRepeticiones: req.body.numberofreps,
						pesosUtilizados: req.body.weightsused
					});			
					const savedWorkout = await Workout.save();
					const savedTraining = await TrainingModel.findByIdAndUpdate(
						req.params.trainingid,
						{
							$push: {
								trabajoEntrenamiento: mongoose.Types.ObjectId(savedWorkout._id)
							}
						},
						{useFindAndModify: false},
						{ runValidators: true }
					);
					res.json(savedTraining);
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

router.delete("/workout/:trainingid/:id/:workoutid", async (req, res, next) => {
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
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					var deletedWorkout;
					try {
						deletedWorkout = await WorkoutModel.findByIdAndDelete(req.params.workoutid, {useFindAndModify: false})
					} catch(err) {
						res.status(404).send("Serie no encontrada")
					}
					if(deletedWorkout) {
						const savedTraining = await TrainingModel.findByIdAndUpdate(
							req.params.trainingid,
							{$pull: {trabajoEntrenamiento: req.params.workoutid } },
							{useFindAndModify: false},
							{ runValidators: true }
						);
						res.json(savedTraining);
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

router.get("/workout/:id/:workoutid", async (req, res, next) => {
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
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("read")) {
					const workout = await WorkoutModel.findById(req.params.workoutid).populate("ejercicioEntrenamiento");
					res.json(workout);
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

router.post("/workout/:id/:workoutid", async (req, res, next) => {
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
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					var workout = await WorkoutModel.findById(req.params.workoutid);
					workout.ejercicioEntrenamiento = req.body.trainingexercise;
					workout.numSeries = req.body.numberofseries;
					workout.numRepeticiones = req.body.numberofreps;
					workout.pesosUtilizados = req.body.weightsused;
					const savedWorkout = await workout.save();
					res.json(savedWorkout);
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

router.post("/training/:id/:trainingid", async (req, res, next) => {
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
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					var training = await TrainingModel.findById(req.params.trainingid);
					training.nombreEntrenamiento = req.body.trainingname;
					training.diaEntrenamiento = req.body.trainingday;
					const savedTraining = await training.save();
					res.json(savedTraining)
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