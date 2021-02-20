const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserModel = require('../models/UserSchema');
const checkPermissions = require('../auth/checkPermissions');
// RUTAS SÓLO ACCESIBLES POR ADMINISTRADORES

// Consulta de usuarios
router.get("/list", passport.authenticate("jwt", {session: false}), async (req, res) => {
	const token = req.cookies.token;

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

router.get("/checkloggedin", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(user)
			res.send(user);
		else
			res.send(false);
			
	})(req,res,next);
});

// Acceso al cierre de sesión del usuario activo
router.get("/logout", passport.authenticate("jwt", {session: false}), async (req, res) => {
	req.logout()
	res.clearCookie("token");
	res.json({
		message: "Se ha cerrado sesión de manera satisfactoria"
	});
});

router.get("/user/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false, failureFlash: true}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const permissionsRes = await checkPermissions(user, req, res);	// Se busca el usuario cuya id coincida
			const error = permissionsRes.error;
			const resUser = permissionsRes.user;
			if(error) {
				res.status(error.code).send(error.text);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(resUser) {
				res.json({
					userInfo: resUser.userInfo,
					permission: resUser.permission
				});
			}
		}			
		
	})(req,res,next);

});

router.post("/user/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false, failureFlash: true}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const permissionsRes = await checkPermissions(user, req, res);	// Se busca el usuario cuya id coincida
			const error = permissionsRes.error;
			const resUser = permissionsRes.user;
			if(error) {
				res.status(error.code).send(error.text);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(resUser && resUser.permission.includes("write")) {
				const userData = resUser.userInfo
				userData.emailUsuario = req.body.email		// Se reasignan los campos del usuario
				
				userData
					.save()		// Se almacena el usuario
					.then(userData => {
						res.json(userData)	// Se manda como respuesta el usuario modificado
					})
					.catch((err) => {
						res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
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
	passport.authenticate("jwt", {session: false, failureFlash: true}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const permissionsRes = await checkPermissions(user, req, res);	// Se busca el usuario cuya id coincida
			const error = permissionsRes.error;
			const resUser = permissionsRes.user;
			if(error) {
				res.status(error.code).send(error.text);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(resUser && resUser.permission.includes("delete")) {
				const userData = resUser.userInfo
				userData.emailUsuario = req.body.email		// Se reasignan los campos del usuario
				console.log("PERMISOS: ", resUser.permission)
				userData
					.remove()	// Se elimina el usuario
					.then(userData => {
						res.json(userData);	// Se manda como respuesta el usuario eliminado
					})
					.catch((err) => {
						res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
					});
			}
			else
			{
				res.status(401).send("Usuario no autorizado");
			}
		}
	})(req,res,next);
});

module.exports = router