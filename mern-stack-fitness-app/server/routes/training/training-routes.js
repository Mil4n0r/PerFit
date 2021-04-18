const express = require('express');
const passport = require('passport');
const router = express.Router();

const RoutineModel = require('../../models/RoutineSchema');
const WorkoutModel = require('../../models/WorkoutSchema');
const TrainingModel = require('../../models/TrainingSchema');

const mongoose = require('mongoose');

router.get("/training/list/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const id = req.params.id;
			await RoutineModel.findById(id).populate("entrenamientosRutina").exec((err, trainings) => {	// Buscamos en el modelo todas las rutinas registradas
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de rutinas (en JSON)
					res.json(trainings.entrenamientosRutina);	
				}
			});
			
		}
	})(req,res,next);
});

// Eliminación del entrenamiento con la id correspondiente
router.delete("/training/:routineid/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const id = req.params.id;
			try {
				const training = await TrainingModel.findByIdAndDelete(id, {useFindAndModify: false})	// Se busca el ejercicio cuya id coincida
				if(!training) {
					res.status(404).send("Entrenamiento no encontrado");
				}
				else {
					const routine = await RoutineModel.findByIdAndUpdate(req.params.routineid, {$pull: {entrenamientosRutina: id} }, {useFindAndModify: false} );
					if(!routine) {
						res.status(404).send("Rutina no encontrada");
					}
					else {
						res.json(routine);
					}
				} 
			} catch(err_routine) {
				next(err_routine);
			}
		}
	})(req,res,next);
});

router.get("/training/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const id = req.params.id;
			await TrainingModel.findById(id).populate("trabajoEntrenamiento").exec((err, training) => {	// Se busca el entrenamiento cuya id coincida
				if(err) {
					next(err);
				}
				else if(!training) {
					res.status(404).send("Entrenamiento no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else {
					res.json(training);		// Se manda como respuesta el entrenamiento encontrado
				}
			});
		}
	})(req,res,next);
});

router.get("/workout/list/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const id = req.params.id;
			await TrainingModel.findById(id)
				.populate({
					path: "trabajoEntrenamiento",
					populate: {path: "ejercicioEntrenamiento"}
				})
				.exec((err, training) => {	// Buscamos en el modelo todos los ejercicios del entrenamiento
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de ejercicios (en JSON)
					res.json(training.trabajoEntrenamiento);	
				}
			});
			
		}
	})(req,res,next);
});

router.post("/associate/training/workout/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const Workout = new WorkoutModel({
				ejercicioEntrenamiento: req.body.trainingexercise,
				numSeries: req.body.numberofseries,
				numRepeticiones: req.body.numberofreps,
				pesosUtilizados: req.body.weightsused
			});
			
			Workout
				.save()
				.then((Workout) => {
					return TrainingModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								trabajoEntrenamiento: mongoose.Types.ObjectId(Workout._id)
							}
						},
						{useFindAndModify: false}
					)
				})
				.then((Training) => {
					if(!Training) {
						res.status(404).send("Entrenamiento no encontrado");
					}
					else {
						res.json(Training)
					}
				})
				.catch((err) => {
					next(err);
				})
		}
	})(req,res,next);
});

router.delete("/workout/:trainingid/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const trainingid = req.params.trainingid;
			const id = req.params.id;
			try {
				const workout = await WorkoutModel.findByIdAndDelete(id, {useFindAndModify: false})	// Se busca el ejercicio cuya id coincida
				if(!workout) {
					res.status(404).send("Trabajo no encontrado");
				}
				else {
					const training = await TrainingModel.findByIdAndUpdate(
						trainingid,
						{$pull: {trabajoEntrenamiento: id } },
						{useFindAndModify: false}
					);
					if(!training) {
						res.status(404).send("Entrenamiento no encontrado");
					}
					else {
						res.json(training);
					}
				}
			} catch(err) {
				next(err);
			}
		}
		/*else {
			const trainingid = req.params.trainingid;
			const id = req.params.id;
			try {
				const training = await TrainingModel.findByIdAndUpdate(
					trainingid,
					{$pull: {trabajoEntrenamiento: {_id: id} } },//{ $elemMatch: {ejercicioEntrenamiento: id} } } },
					{useFindAndModify: false}
				);
				if(!training) {
					res.status(404).send("Entrenamiento no encontrado");
				}
				else {
					res.json(training);
				} 
			} catch(err) {
				next(err);
			}
			
		}
		*/
	})(req,res,next);
});

// Consulta del ejercicio con la id correspondiente
router.get("/workout/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const id = req.params.id;
			await WorkoutModel.findById(id).populate("ejercicioEntrenamiento").exec((err, workout) => {	// Se busca el ejercicio cuya id coincida
				if(err) {
					next(err);
				}
				else if(!workout) {
					res.status(404).send("Trabajo no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else {
					res.json(workout);		// Se manda como respuesta el ejercicio encontrado
				}
			});
		}
	})(req,res,next);
});

router.post("/workout/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const id = req.params.id;
			await WorkoutModel.findById(id, (err, workout) => {
				if(err || !workout) {
					res.status(404).send("Trabajo no encontrado");
				} 
				else {
					workout.ejercicioEntrenamiento = req.body.trainingexercise;
					workout.numSeries = req.body.numberofseries;
					workout.numRepeticiones = req.body.numberofreps;
					workout.pesosUtilizados = req.body.weightsused;

					workout
						.save()
						.then(workout => {
							res.json(workout)
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

router.post("/training/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const id = req.params.id;
			await TrainingModel.findById(id, (err, training) => {
				if(err || !training) {
					res.status(404).send("Entrenamiento no encontrado");
				} 
				else {
					training.nombreEntrenamiento = req.body.trainingname;
					training.diaEntrenamiento = req.body.trainingday;
					training
						.save()
						.then(training => {
							res.json(training)
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

module.exports = router;