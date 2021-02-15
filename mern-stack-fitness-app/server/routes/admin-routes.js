const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserModel = require('../models/UserSchema');

// RUTAS SÓLO ACCESIBLES POR ADMINISTRADORES

// Consulta de usuarios
router.get("/list", passport.authenticate("jwt", {session: false}), async (req, res) => {
	const token = req.cookies.token;
	if(!token)
		console.log("NO HAY TOKEN");
	else
		console.log("HAY TOKEN: ", token);

	UserModel.find((err, users) => {	// Buscamos en el modelo todos los usuarios registrados
		if(err) {	// Se imprime un mensaje de error en consola
			console.log(err);	
		} else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
			res.json(users);	
		}
	});
});


// Acceso al perfil del usuario activo
router.get("/profile", passport.authenticate("jwt", {session: false}), async (req, res) => {
	res.json({
		message: "Has llegado a la ruta segura",
		user: req.user,
		token: req.query.secret_token
	});
});

// Acceso al cierre de sesión del usuario activo
router.get("/logout", passport.authenticate("jwt", {session: false}), async (req, res) => {
	req.logout()
	res.json({
		message: "Se ha cerrado sesión de manera satisfactoria"
	});
	/*res.cookie("token","", {
		httpOnly: true,
		expires: new Date(0)	// Se indica la primera fecha para que la cookie expire
	}).send();*/
});

module.exports = router