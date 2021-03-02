const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserModel = require('../models/UserSchema');
const ExerciseModel = require('../models/ExerciseSchema');
const RoutineModel = require('../models/RoutineSchema');
const TrainingModel = require('../models/TrainingSchema');
const checkPermissions = require('../auth/checkPermissions');
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

router.get("/checkloggedin", (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err || !user) {
			res.send(false)
		}
		else {
			res.send(user);
		}
	})(req,res,next);
});

// Acceso al cierre de sesión del usuario activo
router.get("/logout", (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message);
			next(error);
		}
		else {
			const message = "Se ha cerrado sesión de manera satisfactoria"
			req.logout()
			res.clearCookie("token");
			res.status(200).send(message);
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
			const permissionsRes = await checkPermissions(user, req, res);	// Se busca el usuario cuya id coincida
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
			const permissionsResData = await checkPermissions(user, req, res);	// Se busca el usuario cuya id coincida
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
			const permissionsResData = await checkPermissions(user, req, res);	// Se busca el usuario cuya id coincida
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
				tipoEjercicio: req.body.exercisetype
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

router.get("/exercise/list", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			ExerciseModel.find((err, exercises) => {	// Buscamos en el modelo todos los ejercicios registrados
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de ejercicios (en JSON)
					res.json(exercises);	
				}
			});
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
			const id = req.params.id;
			await ExerciseModel.findById(id, (err, exercise) => {	// Se busca el ejercicio cuya id coincida
				if(err) {
					next(err);
				}
				else if(!exercise) {
					res.status(404).send("Ejercicio no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else {
					res.json(exercise);		// Se manda como respuesta el ejercicio encontrado
				}
			});
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
			const id = req.params.id;
			await ExerciseModel.findById(id, (err, exercise) => {	// Se busca el ejercicio cuya id coincida
				if(err || !exercise) {
					res.status(404).send("Ejercicio no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				} 
				else {
					exercise.nombreEjercicio = req.body.exercisename		// Se reasignan los campos del ejercicio
					exercise.tipoEjercicio = req.body.exercisetype

					exercise
						.save()		// Se almacena el ejercicio
						.then(exercise => {
							res.json(exercise)	// Se manda como respuesta el ejercicio modificado
						})
						.catch((err) => {
							next(err);
						});
				}
			});
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
			const id = req.params.id;
			await ExerciseModel.findById(id, (err, exercise) => {	// Se busca el ejercicio cuya id coincida
				if(err || !exercise) {
					res.status(404).send("Ejercicio no encontrado");
				}
				else {
					exercise
						.remove()	// Se elimina el ejercicio
						.then(exercise => {
							res.json(exercise);	// Se manda como respuesta el ejercicio eliminado
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

// Creación de rutina
router.post("/create/routine/", async (req, res, next) => {
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
				nombreRutina: req.body.routinename,
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
				nombreRutina: req.body.routinename,
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
				diaEntrenamiento: req.body.trainingday,
				trabajoEntrenamiento: {
					ejercicioEntrenamiento: req.body.trainingexercise,
					numSeries: req.body.numberofseries,
					numRepeticiones: req.body.numberofreps,
					pesosUtilizados: req.body.weightsused,
				}
			});
			
			Training.save(async () => {
				if(err) {
					next(err);
				}
				else {
					try {
						const routine = await RoutineModel.findByIdAndUpdate(req.params.id, {$push: {entrenamientosRutina: Training._id} }, {useFindAndModify: false} );
						if(!routine) {
							res.status(404).send("Rutina no encontrada");
						}
						else {
							res.json(routine);
						}
					} catch(err) {
						next(err);
					}
				}
			});
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

module.exports = router