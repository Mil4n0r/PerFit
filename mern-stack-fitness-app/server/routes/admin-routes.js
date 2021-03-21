const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserModel = require('../models/UserSchema');
const RoutineModel = require('../models/RoutineSchema');
const WorkoutModel = require('../models/WorkoutSchema');
const TrainingModel = require('../models/TrainingSchema');
const DietModel = require('../models/DietSchema');
const RationModel = require('../models/RationSchema');
const MealModel = require('../models/MealSchema');

const { checkPermissionsUser } = require('../auth/checkPermissions');

const mongoose = require('mongoose');

// RUTAS SÓLO ACCESIBLES POR ADMINISTRADORES

// Consulta de usuarios
router.get("/list", async (req,res,next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const token = req.cookies.token;
			await UserModel.find((queryErr, users) => {	// Buscamos en el modelo todos los usuarios registrados
				if(queryErr) {	// Se imprime un mensaje de error en consola
					next(queryErr);
				} else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
					res.json(users);	
				}
			});
		}
	})(req,res,next);
});

router.get("/user/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err || !user) {
			if(info.name === "JsonWebTokenError") {
				info.message = "Token no válido";
			}
			next(info.message);
		}
		else {
			const permissionsRes = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsRes.error;
			const resUser = permissionsRes.user;
			const resPermission = permissionsRes.permission;
			if(resError || !resUser) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(resUser) {
				res.json({
					userInfo: resUser,
					permission: resPermission
				});
			}
		}			
		
	})(req,res,next);

});

router.post("/user/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err || !user) {
			next(info.message);
		}
		else {
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resUser = permissionsResData.user;
			const resPermission = permissionsResData.permission;
			if(resError) {
				resError.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("write")) {	// Se reasignan los campos del usuario
				resUser.aliasUsuario = req.body.alias;
				resUser.emailUsuario = req.body.email;		
				resUser.datosPersonales.nombreUsuario = req.body.name;
				resUser.datosPersonales.apellidosUsuario = req.body.surname;
				resUser.datosPersonales.dniUsuario = req.body.dni;
				resUser.datosPersonales.direccionUsuario = req.body.address;
				resUser.datosPersonales.telefonoUsuario = req.body.telephone;
				resUser.datosPersonales.fechaNacUsuario = req.body.birthdate;
				resUser.rolUsuario = req.body.role;
				resUser.privacidadUsuario = req.body.privacy;
				resUser
					.save()		// Se almacena el usuario
					.then(userData => {
						res.json(userData)	// Se manda como respuesta el usuario modificado
					})
					.catch((err) => {
						next(err);
					});
			}
			else {
				res.status(401).send("Usuario no autorizado");
			}
		}
	})(req,res,next);
});

// Eliminación del usuario con la id correspondiente (MODIFICAR PARA ELIMINAR OTROS DATOS)
router.delete("/user/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resUser = permissionsResData.user;
			const resPermission = permissionsResData.permission;

			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("delete")) {
				resUser.emailUsuario = req.body.email		// Se reasignan los campos del usuario
				resUser
					.remove()	// Se elimina el usuario
					.then(userData => {
						res.json(userData);	// Se manda como respuesta el usuario eliminado
					})
					.catch((err) => {
						next(err);	// En caso de fallo se manda el mensaje 500 Internal Server Error
					});
			}
			else
			{
				res.status(401).send("Usuario no autorizado");
			}
		}
	})(req,res,next);
});

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

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// Creación de rutina
router.post("/create/diet", async (req, res, next) => {
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
			const Diet = new DietModel({
				nombrePlan: req.body.dietname,
				objetivoDiario: {
					calorias: req.body.calories,
					carbohidratos: req.body.carbs,
					proteinas: req.body.proteins,
					grasas: req.body.fats
				}
			});
			Diet
				.save()		// Se almacena la dieta
				.then((Diet) => {
					res.json(Diet);		// Se manda como respuesta la dieta
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});

router.get("/diet/list", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			await DietModel.find((err, diets) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(diets);	
				}
			});
		}
	})(req,res,next);
});

router.get("/diet/list/:id", async (req, res, next) => {
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
			await DietModel.find({usuarioPlan: userid},(err, diets) => {
				if(err) {
					next(err);	
				} 
				else {	
					res.json(diets);	
				}
			});
		}
	})(req,res,next);
});

// Consulta del ejercicio con la id correspondiente
router.get("/diet/:id", async (req, res, next) => {
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
			await DietModel.findById(id, (err, diet) => {
				if(err) {
					next(err);
				}
				else if(!diet) {
					res.status(404).send("Dieta no encontrado");
				}
				else {
					res.json(diet);		// Se manda como respuesta la rutina encontrada
				}
			});
		}
	})(req,res,next);
});

// Modificación del ejercicio con la id correspondiente
router.post("/diet/:id", async (req, res, next) => {
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
			await DietModel.findById(id, (err, diet) => {
				if(err || !diet) {
					res.status(404).send("Dieta no encontrada");
				} 
				else {
					diet.nombrePlan = req.body.dietname,
					diet.objetivoDiario = {
						calorias: req.body.calories,
						carbohidratos: req.body.carbs,
						proteinas: req.body.proteins,
						grasas: req.body.fats
					}
					diet
						.save()
						.then(diet => {
							res.json(diet)
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
router.delete("/diet/:id", async (req, res, next) => {
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
			await DietModel.findById(id, (err, diet) => {	// Se busca la rutina cuya id coincida
				if(err || !diet) {
					res.status(404).send("Dieta no encontrada");
				}
				else {
					diet
						.remove()	// Se elimina la rutina
						.then(diet => {
							res.json(diet);	// Se manda como respuesta la rutina eliminada
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

router.post("/associate/diet/:id", async (req, res, next) => {
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
			const Diet = new DietModel({
				objetivoDiario: {
					calorias: req.body.calories,
					carbohidratos: req.body.carbs,
					proteinas: req.body.proteins,
					grasas: req.body.fats
				},
				nombrePlan: req.body.dietname,
				usuarioPlan: req.params.id
			});
			Diet
				.save()
				.then((Diet) => {
					res.json(Diet);
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});

router.post("/associate/diet/meal/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const Meal = new MealModel({
				nombreComida: req.body.mealname,
				diaComida: req.body.mealday
			});
			
			Meal
				.save()
				.then((Meal) => {
					return DietModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								comidasDieta: mongoose.Types.ObjectId(Meal._id)
							}
						},
						{useFindAndModify: false}
					)
				})
				.then((Diet) => {
					if(!Diet) {
						res.status(404).send("Dieta no encontrada");
					}
					else {
						res.json(Meal)
					}
				})
				.catch((err) => {
					next(err);
				})
		}
	})(req,res,next);
});

router.get("/meal/list/:id", async (req, res, next) => {
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
			await DietModel.findById(id).populate("comidasDieta").exec((err, meals) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(meals.comidasDieta);	
				}
			});
			
		}
	})(req,res,next);
});

// Eliminación del entrenamiento con la id correspondiente
router.delete("/meal/:dietid/:id", async (req, res, next) => {
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
				const meal = await MealModel.findByIdAndDelete(id, {useFindAndModify: false})	// Se busca el ejercicio cuya id coincida
				if(!meal) {
					res.status(404).send("Comida no encontrada");
				}
				else {
					const diet = await DietModel.findByIdAndUpdate(req.params.dietid, {$pull: {comidasDieta: id} }, {useFindAndModify: false} );
					if(!diet) {
						res.status(404).send("Dieta no encontrada");
					}
					else {
						res.json(diet);
					}
				} 
			} catch(err_diet) {
				next(err_diet);
			}
		}
	})(req,res,next);
});
router.get("/diet/:id", async (req, res, next) => {
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
			await DietModel.findById(id, (err, diet) => {
				if(err) {
					next(err);
				}
				else if(!diet) {
					res.status(404).send("Dieta no encontrado");
				}
				else {
					res.json(diet);
				}
			});
		}
	})(req,res,next);
});

router.get("/meal/:id", async (req, res, next) => {
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
			await MealModel.findById(id).populate("racionesComida").exec((err, meal) => {
				if(err) {
					next(err);
				}
				else if(!meal) {
					res.status(404).send("Comida no encontrada");
				}
				else {
					res.json(meal);
				}
			});
		}
	})(req,res,next);
});

router.get("/ration/list/:id", async (req, res, next) => {
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
			await MealModel.findById(id)
				.populate({
					path: "racionesComida",
					populate: {path: "alimentoComida"}
				})
				.exec((err, meal) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(meal.racionesComida);	
				}
			});
			
		}
	})(req,res,next);
});

router.post("/associate/meal/ration/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const Ration = new RationModel({
				alimentoComida: req.body.mealfood,
				numRaciones: req.body.numberofrations
			});
			
			Ration
				.save()
				.then((Ration) => {
					return MealModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								racionesComida: mongoose.Types.ObjectId(Ration._id)
							}
						},
						{useFindAndModify: false}
					)
				})
				.then((Meal) => {
					if(!Meal) {
						res.status(404).send("Comida no encontrada");
					}
					else {
						res.json(Meal)
					}
				})
				.catch((err) => {
					next(err);
				})
		}
	})(req,res,next);
});

router.delete("/ration/:mealid/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const mealid = req.params.mealid;
			const id = req.params.id;
			try {
				const ration = await RationModel.findByIdAndDelete(id, {useFindAndModify: false})
				if(!ration) {
					res.status(404).send("Ración no encontrada");
				}
				else {
					const meal = await MealModel.findByIdAndUpdate(
						mealid,
						{$pull: {racionesComida: id } },
						{useFindAndModify: false}
					);
					if(!meal) {
						res.status(404).send("Comida no encontrada");
					}
					else {
						res.json(meal);
					}
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

// Consulta del ejercicio con la id correspondiente
router.get("/ration/:id", async (req, res, next) => {
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
			await RationModel.findById(id).populate("alimentoComida").exec((err, ration) => {	// Se busca el ejercicio cuya id coincida
				if(err) {
					next(err);
				}
				else if(!ration) {
					res.status(404).send("Ración no encontrada");
				}
				else {
					res.json(ration);
				}
			});
		}
	})(req,res,next);
});

router.post("/ration/:id", async (req, res, next) => {
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
			await RationModel.findById(id, (err, ration) => {
				if(err || !ration) {
					res.status(404).send("Ración no encontrada");
				} 
				else {
					ration.alimentoComida = req.body.mealfood;
					ration.numRaciones = req.body.numberofrations;

					ration
						.save()
						.then(ration => {
							res.json(ration)
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

router.post("/meal/:id", async (req, res, next) => {
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
			await MealModel.findById(id, (err, meal) => {
				if(err || !meal) {
					res.status(404).send("Comida no encontrada");
				} 
				else {
					meal.nombreComida = req.body.mealname;
					meal.diaComida = req.body.mealday;
					training
						.save()
						.then(meal => {
							res.json(meal)
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

module.exports = router