const express = require('express');
const passport = require('passport');
const router = express.Router();

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

module.exports = router