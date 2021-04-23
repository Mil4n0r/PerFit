const express = require('express');
const passport = require('passport');
const router = express.Router();

const RoutineModel = require('../../models/RoutineSchema');
const TrainingModel = require('../../models/TrainingSchema');
const mongoose = require('mongoose');

// Creación de rutina
router.post("/create/routine", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			// Creación de la rutina
			const Routine = new RoutineModel({
				tiempoRutina: req.body.routinetime,
				//entrenamientosRutina: req.body.routinetrainings
				nombrePlan: req.body.routinename
			});
			Routine
				.save()		// Se almacena la rutina
				.then((Routine) => {
					res.json(Routine);		// Se manda como respuesta la rutina
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});

router.get("/routine/list", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			await RoutineModel.find((err, routines) => {	// Buscamos en el modelo todas las rutinas registradas
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de rutinas (en JSON)
					res.json(routines);	
				}
			});
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
			const userid = req.params.id;
			await RoutineModel.find({usuarioPlan: userid},(err, routines) => {	// Buscamos en el modelo todas las rutinas registradas
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de rutinas (en JSON)
					res.json(routines);	
				}
			});
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
			const id = req.params.id;
			await RoutineModel.findById(id, (err, routine) => {	// Se busca la rutina cuya id coincida
				if(err) {
					next(err);
				}
				else if(!routine) {
					res.status(404).send("Rutina no encontrado");	// En caso de no encontrarla se lanza el mensaje 404 Not Found
				}
				else {
					res.json(routine);		// Se manda como respuesta la rutina encontrada
				}
			});
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
			const id = req.params.id;
			await RoutineModel.findById(id, (err, routine) => {	// Se busca la rutina cuya id coincida
				if(err || !routine) {
					res.status(404).send("Rutina no encontrada");	// En caso de no encontrarla se lanza el mensaje 404 Not Found
				} 
				else {
					routine.nombrePlan = req.body.routinename;
					routine.tiempoRutina = req.body.routinetime;
					routine
						.save()		// Se almacena la rutina
						.then(routine => {
							res.json(routine)	// Se manda como respuesta la rutina modificada
						})
						.catch((err) => {
							next(err);
						});
				}
			});
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
			const id = req.params.id;
			await RoutineModel.findById(id, (err, routine) => {	// Se busca la rutina cuya id coincida
				if(err || !routine) {
					res.status(404).send("Rutina no encontrada");
				}
				else {
					routine
						.remove()	// Se elimina la rutina
						.then(routine => {
							res.json(routine);	// Se manda como respuesta la rutina eliminada
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

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
			// Creación de la rutina
			const Routine = new RoutineModel({
				tiempoRutina: req.body.routinetime,
				//entrenamientosRutina: req.body.routinetrainings
				nombrePlan: req.body.routinename,
				usuarioPlan: req.params.id
			});
			Routine
				.save()		// Se almacena la rutina
				.then((Routine) => {
					res.json(Routine);		// Se manda como respuesta la rutina
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});

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
			const Training = new TrainingModel({
				nombreEntrenamiento: req.body.trainingname,
				diaEntrenamiento: req.body.trainingday
			});
			
			Training
				.save()
				.then((Training) => {
					return RoutineModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								entrenamientosRutina: mongoose.Types.ObjectId(Training._id)
							}
						},
						{useFindAndModify: false}
					)
				})
				.then((Routine) => {
					if(!Routine) {
						res.status(404).send("Rutina no encontrada");
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

module.exports = router;