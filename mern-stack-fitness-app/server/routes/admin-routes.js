const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserModel = require('../models/UserSchema');
const checkPermissions = require('../auth/checkPermissions');
// RUTAS SÓLO ACCESIBLES POR ADMINISTRADORES

// Consulta de usuarios
router.get("/list", async (req,res,next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const token = req.cookies.token;
			await UserModel.find((queryErr, users) => {	// Buscamos en el modelo todos los usuarios registrados
				if(queryErr) {	// Se imprime un mensaje de error en consola
					next(queryErr);
				} else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
					res.json(users);	
				}
			});
		}
	})(req,res,next);
});

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

// Acceso al cierre de sesión del usuario activo
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

router.get("/user/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err || !user) {
			if(info.name === "JsonWebTokenError") {
				info.message = "Token no válido";
			}
			next(info.message);
		}
		else {
			const permissionsRes = await checkPermissions(user, req, res);	// Se busca el usuario cuya id coincida
			const resError = permissionsRes.error;
			const resUser = permissionsRes.user;
			const resPermission = permissionsRes.permission;
			if(resError || !resUser) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(resUser) {
				res.json({
					userInfo: resUser,
					permission: resPermission
				});
			}
		}			
		
	})(req,res,next);

});

router.post("/user/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err || !user) {
			next(info.message);
		}
		else {
			const permissionsResData = await checkPermissions(user, req, res);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resUser = permissionsResData.user;
			const resPermission = permissionsResData.permission;
			if(resError) {
				resError.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("write")) {	// Se reasignan los campos del usuario
				resUser.aliasUsuario = req.body.alias;
				resUser.emailUsuario = req.body.email;		
				resUser.datosPersonales.nombreUsuario = req.body.name;
				resUser.datosPersonales.apellidosUsuario = req.body.surname;
				resUser.datosPersonales.dniUsuario = req.body.dni;
				resUser.datosPersonales.direccionUsuario = req.body.address;
				resUser.datosPersonales.telefonoUsuario = req.body.telephone;
				resUser.datosPersonales.fechaNacUsuario = req.body.birthdate;
				resUser.rolUsuario = req.body.role;
				resUser.privacidadUsuario = req.body.privacy;
				resUser
					.save()		// Se almacena el usuario
					.then(userData => {
						res.json(userData)	// Se manda como respuesta el usuario modificado
					})
					.catch((err) => {
						next(err);
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
			const permissionsResData = await checkPermissions(user, req, res);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resUser = permissionsResData.user;
			const resPermission = permissionsResData.permission;

			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("delete")) {
				resUser.emailUsuario = req.body.email		// Se reasignan los campos del usuario
				resUser
					.remove()	// Se elimina el usuario
					.then(userData => {
						res.json(userData);	// Se manda como respuesta el usuario eliminado
					})
					.catch((err) => {
						next(err);	// En caso de fallo se manda el mensaje 500 Internal Server Error
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