const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserModel = require('../../models/UserSchema');
const TrainerModel = require('../../models/TrainerSchema');
const { checkPermissionsUser } = require('../../auth/checkPermissions');

const mongoose = require('mongoose');

// Consulta de usuarios
router.get("/user/list/:inactive?/:search?", async (req,res,next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			if(req.params.inactive && req.params.search) {
				await UserModel.find(
					// Condición de búsqueda
					req.params.search !== "undefined" ?
						{aliasUsuario: new RegExp(req.params.search, 'i'), cuentaActivada: req.params.inactive === "false"} 
					:
						{cuentaActivada: req.params.inactive === "false"}
					,
					(queryErr, users) => {	// Buscamos en el modelo todos los usuarios registrados
						if(queryErr) {	// Se imprime un mensaje de error en consola
							next(queryErr);
						} else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
							res.json(users);	
						}
					}
				);
			}
			else {
				await UserModel.find(
					{cuentaActivada: true},
					(queryErr, users) => {	// Buscamos en el modelo todos los usuarios registrados
						if(queryErr) {	// Se imprime un mensaje de error en consola
							next(queryErr);
						} else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
							res.json(users);	
						}
					}
				);
			}
			
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
			const permissionsRes = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
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
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resUser = permissionsResData.user;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
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
				resUser.privacidadUsuario = req.body.privacy;
				if(req.body.specialty)
					resUser.especialidadesMonitor = req.body.specialty;
				if(req.body.subscription)
					resUser.suscripcionMiembro = req.body.specialty;
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

router.post("/user/activate/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err || !user) {
			next(info.message);
		}
		else {
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resUser = permissionsResData.user;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("write")) {	// Se reasignan los campos del usuario
				resUser.cuentaActivada = true;
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
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resUser = permissionsResData.user;
			const resPermission = permissionsResData.permission;

			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("delete")) {
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

router.get("/friend/list/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const userid = req.params.id;
			await UserModel.findById(userid).populate("amigosUsuario").exec((err, user) => {
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de amigos (en JSON)
					res.json(user.amigosUsuario);
				}
			});
		}
	})(req,res,next);
});

router.get("/client/list/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const userid = req.params.id;
			await TrainerModel.findById(userid).populate("alumnosEntrenados").exec((err, user) => {
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de clientes (en JSON)
					if(user) {
						res.json(user.alumnosEntrenados);
					}
					else {
						res.status(401).send("Usuario no autorizado");
					}
				}
			});
		}
	})(req,res,next);
});

router.delete("/friend/:id/:id2", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resUser = permissionsResData.user;
			const resPermission = permissionsResData.permission;

			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("managefriends")) {				
				resUser
					.update({$pull: {amigosUsuario: mongoose.Types.ObjectId(req.params.id2)} })
					.then(async (userData) => {
						// Quitamos también la relación mutua
						await UserModel.findByIdAndUpdate(
							req.params.id2,
							{
								$pull: {
									amigosUsuario: mongoose.Types.ObjectId(req.params.id)
								}
							},
							{useFindAndModify: false}
						)
						res.json(userData);
					})
					.catch((err) => {
						next(err);
					});
			}
			else
			{
				res.status(401).send("Usuario no autorizado");
			}
		}
	})(req,res,next);
});

router.delete("/client/:id/:id2", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resUser = permissionsResData.user;
			const resPermission = permissionsResData.permission;

			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("managefriends")) {				
				resUser
					.update({$pull: {alumnosEntrenados: mongoose.Types.ObjectId(req.params.id2)} })
					.then(async (userData) => {
						// Quitamos también la relación mutua
						await UserModel.findByIdAndUpdate(
							req.params.id2,
							{
								tieneEntrenador: false
							},
							{useFindAndModify: false}
						)
						res.json(userData);
					})
					.catch((err) => {
						next(err);
					});
			}
			else
			{
				res.status(401).send("Usuario no autorizado");
			}
		}
	})(req,res,next);
});

module.exports = router;