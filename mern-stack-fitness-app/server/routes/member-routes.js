const express = require('express');
const passport = require('passport');
const router = express.Router();

// RUTAS SÓLO ACCESIBLES POR MIEMBROS AUTENTICADOS

// Acceso al perfil del usuario activo
router.get("/profile", passport.authenticate("jwt", {session: false}), async (req, res) => {
	console.log("COOKIE PROFILE: ", req.cookies.token)
	res.json({
		message: "Has llegado a la ruta segura",
		user: req.user,
		token: req.query.secret_token
	});
});

// Acceso al cierre de sesión del usuario activo
router.get("/logout", passport.authenticate("jwt", {session: false}), async (req, res) => {
	req.logout()
	res.clearCookie("token");
	res.json({
		message: "Se ha cerrado sesión de manera satisfactoria"
	});
});

module.exports = router