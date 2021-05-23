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
					await Request.save();
					await resUser.update({$push: 
						{
							peticionesPendientes: mongoose.Types.ObjectId(Request._id)
						}
					})
				} catch(err) {
					next(err);
				} 
				res.json(Request);
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
				user
					.update({$push: {amigosUsuario: mongoose.Types.ObjectId(request.usuarioSolicitante)} })
					.update({$pull: {peticionesPendientes: mongoose.Types.ObjectId(req.params.id) } })
					.then(userData => {
						res.json(userData);	// Se manda como respuesta el usuario editado
					})
					.catch((err) => {
						next(err);
					});
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
				user
					.update({$pull: {peticionesPendientes: mongoose.Types.ObjectId(req.params.id) } })
					.then(userData => {
						res.json(userData);	// Se manda como respuesta el usuario editado
					})
					.catch((err) => {
						next(err);
					});
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
			await UserModel.findById(user._id).populate({
				path: "peticionesPendientes",
				populate: {path: "usuarioSolicitante"}
			}).exec((err, user) => {
				res.json(user.peticionesPendientes);
			})
		}
	})(req,res,next);
});

module.exports = router;