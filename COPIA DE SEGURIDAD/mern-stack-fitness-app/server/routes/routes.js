const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const UserModel = require('../models/UserSchema');
const FoodModel = require('../models/FoodSchema');

router.get("/food/list", async (req, res) => {
	FoodModel.find((err, foods) => {	// Buscamos en el modelo todas las comidas registradas
		if(err) {	// Se imprime un mensaje de error en consola
			console.log(err);	
		} else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
			res.json(foods);	
		}
	});
});

// Registro de usuarios
router.post("/register", passport.authenticate("register", {session: false}),
	async (req, res) => {
		res.json({
			message: "Registrado satisfactoriamente",
			user: req.user
		}) // Se mandan como respuesta los datos del usuario y un mensaje de confirmación
	}
);

// Inicio de sesión
router.post("/login", async (req, res, next) => {
	// Empleamos la estrategia local definida en '../auth' para autenticar al usuario que trata de iniciar sesión
	passport.authenticate("login", {session: false}, async (err, user, info) => {
		try {
			// Se comprueba que no haya errores
			if (err || !user) {
				const error = new Error("Ha ocurrido un error al iniciar sesión.");
				return next(error);
			}
			// Se llama a la función login de passport y se introduce el token obtenido en una cookie
			req.login(
				user,
				{session: false},	// IMPORTANTE PLANTEARSE LO DE LA SESION 
				async (error) => {
					if (error) 
						return next(error);
					/*
					res.json({
						message: "Logeado satisfactoriamente",
						user: body
					})
					*/
					const body = { _id: user._id, email: user.emailUsuario, rol: user.rolUsuario };
					const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
					res.cookie("token", token, {
						httpOnly: true
					});
					res.status(200).send({body});
				}
			);
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Creación de alimento
router.post("/create/food", async (req, res) => {
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
			console.log(JSON.stringify(Food))
			res.json(Food);		// Se manda como respuesta el alimento
		})
		.catch((err) => {
			//console.log(err.message);
			res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
		});
});

// Consulta del alimento con la id correspondiente
router.get("/food/:id", async (req, res) => {
	const id = req.params.id;
	FoodModel.findById(id, (err, food) => {	// Se busca el alimento cuya id coincida
		if(!food) {
			res.status(404).send("Alimento no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		}
		else {
			res.json(food);		// Se manda como respuesta el alimento encontrado
		}
	});
});

// Modificación del alimento con la id correspondiente
router.post("/food/:id", async (req, res) => {
	const id = req.params.id;
	FoodModel.findById(id, (err, food) => {	// Se busca el alimento cuya id coincida
		if(!food) {
			res.status(404).send("Alimento no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		} else {
			console.log("Tratando de editar alimento ", req.body)
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
					res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
				});
		}
	});
});

// Eliminación del alimento con la id correspondiente
router.delete("/delete/food/:id", async (req, res) => {
	const id = req.params.id;
	FoodModel.findById(id, (err, food) => {	// Se busca el alimento cuya id coincida
		if(!food) {
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		}
		else {		
			food
				.remove()	// Se elimina el alimento
				.then(food => {
					res.json(food);	// Se manda como respuesta el alimento eliminado
				})
				.catch((err) => {
					res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
				});
		}
	});
});

// Consulta del usuario con la id correspondiente
router.get("/user/:id", async (req, res) => {
	const id = req.params.id;
	UserModel.findById(id, (err, user) => {	// Se busca el usuario cuya id coincida
		if(!user) {
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		}
		else {
			res.json(user);		// Se manda como respuesta el alimento encontrado
		}
	});
});

// Modificación del usuario con la id correspondiente
router.post("/user/:id", async (req, res) => {
	const id = req.params.id;
	UserModel.findById(id, (err, user) => {	// Se busca el usuario cuya id coincida
		if(!user) {
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		} else {
			console.log("Tratando de editar usuario ", req.body)
			user.emailUsuario = req.body.email		// Se reasignan los campos del usuario
			user.passwordUsuario = req.body.password

			user
				.save()		// Se almacena el usuario
				.then(user => {
					res.json(user)	// Se manda como respuesta el usuario modificado
				})
				.catch((err) => {
					res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
				});
		}
	});
});

// Eliminación del usuario con la id correspondiente (MODIFICAR PARA ELIMINAR OTROS DATOS)
router.delete("/delete/user/:id", async (req, res) => {
	const id = req.params.id;
	UserModel.findById(id, (err, user) => {	// Se busca el usuario cuya id coincida
		if(!user) {
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		}
		else {		
			//console.log("!!!!!!!!!!!!!!!", req.cookies);
			user
				.remove()	// Se elimina el usuario
				.then(user => {
					res.json(user);	// Se manda como respuesta el usuario eliminado
				})
				.catch((err) => {
					res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
				});
		}
	});
});

router.get("/checkloggedin", async (req, res, next) => {
	passport.authenticate("jwt", {session: false, failureFlash: true}, (err, user, info) => {
		if(user)
			res.send(user.rol);
		else
			res.send(false);
			
	})(req,res,next);
});
/*
router.get("/checkcurrentuser", async (req, res, next) => {
	passport.authenticate("jwt", {session: false, failureFlash: true}, (err, user, info) => {
		if(user)
			res.json(user._id);
		else
			res.send(false);
			
	})(req,res,next);
});
*/
module.exports = router;