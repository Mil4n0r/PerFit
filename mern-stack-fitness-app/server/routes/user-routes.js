const express = require('express');
const passport = require('passport');
const router = express.Router();

const FoodModel = require('../models/FoodSchema');
const ExerciseModel = require('../models/ExerciseSchema');

const { checkPermissionsFood, checkPermissionsExercise } = require('../auth/checkPermissions');

// RUTAS SÓLO ACCESIBLES POR USUARIOS AUTENTICADOS

// AUTENTICACIÓN

// Comprobación de que el usuario activo ha iniciado sesión
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

// Cierre de sesión del usuario activo
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

////////////////////////////////////////////////////////////////

// ALIMENTOS

// Creación de alimento
router.post("/create/food", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			// Creación del alimento
			const Food = new FoodModel({
				nombreAlimento: req.body.foodname,
				tamRacion: req.body.foodsize,
				unidadesRacion: req.body.unit,
				nutrientesRacion:{
					calorias: req.body.calories,
					carbohidratos: req.body.carbs,
					proteinas: req.body.proteins,
					grasas: req.body.fats
				},
				creadoPor: user._id
			});
			Food
				.save()		// Se almacena el usuario
				.then((Food) => {
					res.json(Food);		// Se manda como respuesta el alimento
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next)
});

// Lista de alimentos
router.get("/food/list", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			FoodModel.find((err, foods) => {	// Buscamos en el modelo todas las comidas registradas
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
					res.json(foods);	
				}
			});
		}
	})(req,res,next)
});

// Consulta del alimento con la id correspondiente
router.get("/food/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			console.log("PROBANDO")
			const permissionsRes = await checkPermissionsFood(user, req);	// Se busca el usuario cuya id coincida
			console.log(permissionsRes)
			const resError = permissionsRes.error;
			const resFood = permissionsRes.food;
			const resPermission = permissionsRes.permission;
			if(resError || !resFood) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(resFood) {
				res.json({
					foodInfo: resFood,
					permission: resPermission
				});
			}
		}
	})(req,res,next)
});

// Modificación del alimento con la id correspondiente
router.post("/food/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const id = req.params.id;
			await FoodModel.findById(id, async (err, food) => {	// Se busca el alimento cuya id coincida
				if(err || !food) {
					res.status(404).send("Alimento no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				} 
				else {
					const permissionsResData = await checkPermissionsFood(user, req);
					const resError = permissionsResData.error;
					const resFood = permissionsResData.food;
					const resPermission = permissionsResData.permission;
					if(resError) {
						resError.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
					}
					else if(permissionsResData && resPermission.includes("write")) {
						resFood.emailUsuario = req.body.email		// Se reasignan los campos del alimento
						resFood.nombreAlimento = req.body.foodname
						resFood.tamRacion = req.body.foodsize
						resFood.unidadesRacion = req.body.unit
						resFood.nutrientesRacion = {
							calorias: req.body.calories,
							carbohidratos: req.body.carbs,
							proteinas: req.body.proteins,
							grasas: req.body.fats
						}
						// resFood.creadoPor se queda igual
	
						resFood
							.save()		// Se almacena el alimento
							.then(foodData => {
								res.json(foodData)	// Se manda como respuesta el alimento modificado
							})
							.catch((err) => {
								next(err);
							});
					}
					else {
						res.status(401).send("Usuario no autorizado");
					}
				}
			});
		}
	})(req,res,next)
});

// Eliminación del alimento con la id correspondiente
router.delete("/food/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const id = req.params.id;
			await FoodModel.findById(id, async (err, food) => {	// Se busca el alimento cuya id coincida
				if(err || !food) {
					res.status(404).send("Alimento no encontrado");
				}
				else {
					const permissionsResData = await checkPermissionsFood(user, req);
					const resError = permissionsResData.error;
					const resFood = permissionsResData.food;
					const resPermission = permissionsResData.permission;
					if(resError) {
						resError.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
					}
					else if(permissionsResData && resPermission.includes("delete")) {
						resFood
							.remove()	// Se elimina el alimento
							.then(foodData => {
								res.json(foodData);	// Se manda como respuesta el alimento eliminado
							})
							.catch((err) => {
								next(err);
							});
					}
				}
			});
		}
	})(req,res,next)
});

////////////////////////////////////////////////////////////////

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

// Lista de ejercicios
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
			console.log("PROBANDO")
			const permissionsRes = await checkPermissionsExercise(user, req);	// Se busca el usuario cuya id coincida
			console.log(permissionsRes)
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
				resError.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
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
				resError.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
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