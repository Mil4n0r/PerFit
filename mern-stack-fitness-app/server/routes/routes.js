const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const UserModel = require('../models/UserSchema');
const FoodModel = require('../models/FoodSchema');

router.get("/food/list", async (req, res, next) => {
	FoodModel.find((err, foods) => {	// Buscamos en el modelo todas las comidas registradas
		if(err) {
			next(err);	
		} 
		else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
			res.json(foods);	
		}
	});
});

// Registro de usuarios
router.post("/register", async (req, res,next) => {
	passport.authenticate("register", {session: false, badRequestMessage: "Faltan datos por rellenar"}, async (err, user, info) => {
		if(err) {
			next(err);
		} 
		else if(!user) {
			const error = new Error(info.message);
			next(error);
		}
		else {
			res.json({
				message: info.message,
				user: user
			})
		}
	})(req,res,next)
});

// Inicio de sesión
router.post("/login", (req, res, next) => {
	// Empleamos la estrategia local definida en '../auth' para autenticar al usuario que trata de iniciar sesión
	passport.authenticate("login", {session: false, badRequestMessage: "Faltan datos por rellenar"}, (err, user, info) => {
		// Se comprueba que no haya errores
		if (err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message);
			next(error);
		}
		else {
			// Se llama a la función login de passport y se introduce el token obtenido en una cookie
			req.login(
				user,
				{session: false},	// IMPORTANTE PLANTEARSE LO DE LA SESION 
				(error) => {
					if (error) {
						next(error);
					}
					else
					{
						const body = { _id: user._id, email: user.emailUsuario, rol: user.rolUsuario };
						const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
						res.cookie("token", token, {
							httpOnly: true
						});
						return res.status(200).send(body);
					}
					
				}
			);
		}
	})(req, res, next);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Creación de alimento
router.post("/create/food", async (req, res, next) => {
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
		}
	});
	Food
		.save()		// Se almacena el usuario
		.then((Food) => {
			res.json(Food);		// Se manda como respuesta el alimento
		})
		.catch((err) => {
			next(err);
		});
});

// Consulta del alimento con la id correspondiente
router.get("/food/:id", async (req, res, next) => {
	const id = req.params.id;
	await FoodModel.findById(id, (err, food) => {	// Se busca el alimento cuya id coincida
		if(err) {
			next(err);
		}
		else if(!food) {
			res.status(404).send("Alimento no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		}
		else {
			res.json(food);		// Se manda como respuesta el alimento encontrado
		}
	});
});

// Modificación del alimento con la id correspondiente
router.post("/food/:id", async (req, res, next) => {
	const id = req.params.id;
	await FoodModel.findById(id, (err, food) => {	// Se busca el alimento cuya id coincida
		if(err || !food) {
			res.status(404).send("Alimento no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		} 
		else {
			food.emailUsuario = req.body.email		// Se reasignan los campos del alimento
			food.nombreAlimento = req.body.foodname
			food.tamRacion = req.body.foodsize
			food.unidadesRacion = req.body.unit
			food.nutrientesRacion = {
				calorias: req.body.calories,
				carbohidratos: req.body.carbs,
				proteinas: req.body.proteins,
				grasas: req.body.fats
			}

			food
				.save()		// Se almacena el alimento
				.then(food => {
					res.json(food)	// Se manda como respuesta el alimento modificado
				})
				.catch((err) => {
					next(err);
				});
		}
	});
});

// Eliminación del alimento con la id correspondiente
router.delete("/food/:id", async (req, res, next) => {
	const id = req.params.id;
	await FoodModel.findById(id, (err, food) => {	// Se busca el alimento cuya id coincida
		if(err || !food) {
			res.status(404).send("Alimento no encontrado");
		}
		else {
			food
				.remove()	// Se elimina el alimento
				.then(food => {
					res.json(food);	// Se manda como respuesta el alimento eliminado
				})
				.catch((err) => {
					next(err);
				});
		}
	});
});

module.exports = router;