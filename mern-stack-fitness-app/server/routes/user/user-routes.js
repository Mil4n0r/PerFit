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
			try {
				if(req.params.inactive && req.params.search) {
					const users = await UserModel.find(
						req.params.search !== "undefined" ?
							{aliasUsuario: new RegExp(req.params.search, 'i'), cuentaActivada: req.params.inactive === "false"} 
						:
							{cuentaActivada: req.params.inactive === "false"}
					, "aliasUsuario emailUsuario privacidadUsuario cuentaActivada")
					res.json(users);
				}
				else {
					const users = await UserModel.find(
						{cuentaActivada: true}
					);
					res.json(users);
				}
			} catch(err) {
				next(err);
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
			try {
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
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
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
			try {
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
					const savedUser = await resUser.save();
					res.json(savedUser);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
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
			try {
				const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resUser = permissionsResData.user;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("write")) {	// Se reasignan los campos del usuario
					resUser.cuentaActivada = true;
					const savedUser = await resUser.save();
					res.json(savedUser);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err)
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
			try {
				const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resUser = permissionsResData.user;
				const resPermission = permissionsResData.permission;

				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const deletedUser = await resUser.remove();
					res.json(deletedUser);
				}
				else
				{
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
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
			try {
				const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resUser = permissionsResData.user;
				const resPermission = permissionsResData.permission;

				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("read")) {
					const user = await UserModel.findById(req.params.id).populate("amigosUsuario");
					res.json(user.amigosUsuario);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
			}
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
			try {
				const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resUser = permissionsResData.user;
				const resPermission = permissionsResData.permission;

				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("read")) {
					const user = await UserModel.findById(req.params.id).populate("alumnosEntrenados");
					res.json(user.alumnosEntrenados);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}				
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

router.delete("/friend/:id/:id2", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			try {
				const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resUser = permissionsResData.user;
				const resPermission = permissionsResData.permission;

				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("managefriends")) {
					await resUser.amigosUsuario.pull(mongoose.Types.ObjectId(req.params.id2))
					const savedUser = await resUser.save();
					await UserModel.findByIdAndUpdate(
						req.params.id2,
						{
							$pull: {
								amigosUsuario: mongoose.Types.ObjectId(req.params.id)
							}
						},
						{useFindAndModify: false},
						{ runValidators: true }
					)
					res.json(savedUser);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
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
			try {
				const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resUser = permissionsResData.user;
				const resPermission = permissionsResData.permission;

				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("managefriends")) {
					await resUser.alumnosEntrenados.pull(mongoose.Types.ObjectId(req.params.id2))
					const savedUser = await resUser.save();
					await UserModel.findByIdAndUpdate(
						req.params.id2,
						{
							tieneEntrenador: false
						},
						{useFindAndModify: false},
						{ runValidators: true }
					)
					res.json(savedUser);
				}
				else
				{
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

module.exports = router;