const express = require('express');
const passport = require('passport');
const router = express.Router();

const MessageModel = require('../../models/MessageSchema');

const { checkPermissionsUser, checkPermissionsMessage } = require('../../auth/checkPermissions');

const mongoose = require('mongoose');

router.post("/message/send/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resPermission = permissionsResData.permission;
			
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("allowmessages")) {
				const Message = new MessageModel({
					emisorMensaje: mongoose.Types.ObjectId(req.body.messagesender),
					receptorMensaje: mongoose.Types.ObjectId(req.body.messagereceiver),
					asuntoMensaje: req.body.messagesubject,
					contenidoMensaje: req.body.messagecontent
				})
				try {
					const savedMessage = await Message.save();
					res.json(savedMessage);
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


router.get("/message/list/:option/:id", async (req, res, next) => {
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
				else if(permissionsResData && resPermission.includes("readmessages")) {
					var messages;
					if(req.params.option === "sent")
						messages = await MessageModel.find({emisorMensaje: {$in: resUser._id}}).populate("emisorMensaje").populate("receptorMensaje");
					else if(req.params.option === "received")
						messages = await MessageModel.find({receptorMensaje: {$in: resUser._id}}).populate("emisorMensaje").populate("receptorMensaje");
					res.json(messages);
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

router.get("/message/:id", async (req, res, next) => {
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
				const permissionsRes = await checkPermissionsMessage(user, req);
				const resError = permissionsRes.error;
				const resMessage = permissionsRes.message;
				const resPermission = permissionsRes.permission;
				if(resError || !resMessage) {
					res.status(resError.code).send(resError.message);
				}
				else if(resMessage) {
					res.json({
						messageInfo: resMessage,
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

module.exports = router;