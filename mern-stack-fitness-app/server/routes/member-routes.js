const express = require('express');
const passport = require('passport');
const router = express.Router();

// RUTAS SÓLO ACCESIBLES POR MIEMBROS AUTENTICADOS

// Acceso al cierre de sesión del usuario activo
router.get("/logout", passport.authenticate("jwt", {session: false}), async (req, res) => {
	req.logout()
	res.clearCookie("token");
	res.json({
		message: "Se ha cerrado sesión de manera satisfactoria"
	});
});

module.exports = router