const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserModel = require('../../models/UserSchema');
const RequestModel = require('../../models/RequestSchema');

const { checkPermissionsUser } = require('../../auth/checkPermissions');

const mongoose = require('mongoose');

router.post("/friend/request/:id", async (req, res, next) => {
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
			else if(permissionsResData && resPermission.includes("allowfriends")) {
				const Request = new RequestModel({
					usuarioSolicitante: mongoose.Types.ObjectId(user._id),
					tipoPeticion: "Amistad"
				})
				try {
					const savedRequest = await Request.save();
					await resUser.peticionesPendientes.push(mongoose.Types.ObjectId(Request._id))
					const savedUser = await resUser.save();
					res.json(savedRequest);
				} catch(err) {
					next(err);
				} 
			}
			else
			{
				res.status(401).send("Usuario no autorizado");
			}
		}
	})(req,res,next);
});

router.post("/accept/friend/request/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			try {
				if(user.peticionesPendientes.includes(mongoose.Types.ObjectId(req.params.id))) {
					const request = await RequestModel.findByIdAndDelete(req.params.id)
					await UserModel.findByIdAndUpdate(
						request.usuarioSolicitante,
						{
							$push: {
								amigosUsuario: mongoose.Types.ObjectId(user._id)
							}
						},
						{useFindAndModify: false}
					)
					await user.amigosUsuario.push(mongoose.Types.ObjectId(request.usuarioSolicitante));
					await user.peticionesPendientes.pull(mongoose.Types.ObjectId(req.params.id));
					const savedUser = await user.save();
					res.json(savedUser)
				}
				else {
					res.status(404).send("Solicitud no encontrada");
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

router.post("/reject/friend/request/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			try {
				const request = await RequestModel.findByIdAndDelete(req.params.id)
				await user.peticionesPendientes.pull(mongoose.Types.ObjectId(req.params.id))
				const savedUser = await user.save();
				res.json(savedUser);
			} catch(err) {
				next(err);
			}			
		}
	})(req,res,next);
});

router.post("/train/request/:id", async (req, res, next) => {
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
			else if(permissionsResData && resPermission.includes("allowtraining")) {
				const Request = new RequestModel({
					usuarioSolicitante: mongoose.Types.ObjectId(user._id),
					tipoPeticion: "Entrenamiento"
				})
				try {
					const savedRequest = await Request.save();
					await resUser.peticionesPendientes.push(mongoose.Types.ObjectId(savedRequest._id))
					await resUser.save();
					res.json(savedRequest);
				} catch(err) {
					next(err);
				} 
			}
			else
			{
				res.status(401).send("Usuario no autorizado");
			}
		}
	})(req,res,next);
});

router.post("/accept/train/request/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			try {
				if(user.peticionesPendientes.includes(mongoose.Types.ObjectId(req.params.id))) {
					const request = await RequestModel.findByIdAndDelete(req.params.id)
					await UserModel.findByIdAndUpdate(
						request.usuarioSolicitante,
						{
							tieneEntrenador: true
						},
						{useFindAndModify: false}
					)
					await user.alumnosEntrenados.push(mongoose.Types.ObjectId(request.usuarioSolicitante));
					await user.peticionesPendientes.pull(mongoose.Types.ObjectId(req.params.id));
					const savedUser = await user.save();
					res.json(savedUser)
				}
				else {
					res.status(404).send("Solicitud no encontrada");
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

router.post("/reject/train/request/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			try {
				if(user.peticionesPendientes.includes(mongoose.Types.ObjectId(req.params.id))) {
					const request = await RequestModel.findByIdAndDelete(req.params.id)
					await user.peticionesPendientes.pull(mongoose.Types.ObjectId(req.params.id));
					const savedUser = await user.save();
					res.json(savedUser)
				}
				else {
					res.status(404).send("Solicitud no encontrada");
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

router.get("/request/list/:id", async (req, res, next) => {
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
				else if(permissionsResData && resPermission.includes("readrequests")) {
					const user = await UserModel.findById(resUser._id).populate({
						path: "peticionesPendientes",
						populate: {path: "usuarioSolicitante"}
					});
					res.json(user.peticionesPendientes);
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

module.exports = router;