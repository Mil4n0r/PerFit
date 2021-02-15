const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const UserModel = require('../models/UserSchema');

// Registro de usuarios
router.post("/register", passport.authenticate("register", {session: false}),	// IMPORTANTE PLANTEARSE LO DE LA SESION {session: false}
	async (req, res) => {
		res.json({
			message: "Registrado satisfactoriamente",
			user: req.user
		}) // Se mandan como respuesta los datos del usuario y un mensaje de confirmación
	}
	// GESTIONAR REDIRECCIÓN
);

// Inicio de sesión
router.post("/login", async (req, res, next) => {
	// Empleamos la estrategia local definida en '../auth' para autenticar al usuario que trata de iniciar sesión
	passport.authenticate("login", async (err, user, info) => {
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
					const body = { _id: user._id, email: user.emailUsuario };
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
	// GESTIONAR REDIRECCIÓN
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Creación de usuario (MODIFICAR PARA CREAR OTROS DATOS)
router.post("/create", async (req, res) => {
	
	// Filtros de errores
	/*
	if(req.body.email === ???) {

	}
	

	if(req.body.password.length < 8) {
		return res.status(400).json({
			errorMessage: "Por favor introduzca una contraseña de al menos 8 caracteres.",
		})
	}
	
	if(req.body.password === req.body.passwordConfirm) {
		return res.status(400).json({
			errorMessage: "Por favor introduzca el mismo password en ambos campos.",
		})
	}
	*/

	// Creación del usuario
	
	const User = new UserModel({
		emailUsuario: req.body.email,
		passwordUsuario: req.body.password,
	});
	User
		.save()		// Se almacena el usuario
		.then((User) => {
			console.log(JSON.stringify(User))
			res.json(User);		// Se manda como respuesta el usuario
		})
		.catch((err) => {
			console.log(err.message);
			res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
		});
});

// Consulta del usuario con la id correspondiente (MODIFICAR PARA CONSULTAR OTROS DATOS)
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	UserModel.findById(id, (err, user) => {	// Se busca el usuario cuya id coincida
		if(!user) {
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		}
		else {
			res.json(user);		// Se manda como respuesta el usuario encontrado
		}
	});
});

// Modificación del usuario con la id correspondiente (MODIFICAR PARA MODIFICAR OTROS DATOS)
router.post("/:id", async (req, res) => {
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
router.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;
	UserModel.findById(id, (err, user) => {	// Se busca el usuario cuya id coincida
		if(!user) {
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		} else {			
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

module.exports = router;