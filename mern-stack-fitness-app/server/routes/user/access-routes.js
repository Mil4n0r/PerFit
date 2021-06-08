const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

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
						//const body = { _id: user._id, email: user.emailUsuario, rol: user.rolUsuario };
						const body = { _id: user._id, email: user.emailUsuario, rol: user.role };
						const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
						const today_date = new Date();
						const expire_date = new Date(today_date.setMonth(today_date.getMonth()+1));
						res.cookie("token", token, {
							expires: expire_date,
							httpOnly: true
						});
						return res.status(200).send(body);
					}
					
				}
			);
		}
	})(req, res, next);
});

module.exports = router;