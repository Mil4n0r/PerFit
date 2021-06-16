const express = require('express');
const passport = require('passport');
const router = express.Router();

const RoomModel = require('../../models/RoomSchema');

const { checkPermissionsRoom } = require('../../auth/checkPermissions');

router.post("/create/room", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsRoom(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					const Room = new RoomModel({
						nombreSala: req.body.roomname,
						equipamientoSala: req.body.roomequipment,
						aforoSala: req.body.roomcapacity
					});
					const savedRoom = await Room.save();
					res.json(savedRoom);
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

// Lista de salas
router.get("/room/list", async (req, res, next) => {
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
				const rooms = await RoomModel.find({});
				res.json(rooms);	
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

router.get("/room/:id", async (req, res, next) => {
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
				const permissionsRes = await checkPermissionsRoom(user, req);
				const resError = permissionsRes.error;
				const resRoom = permissionsRes.room;
				const resPermission = permissionsRes.permission;
				if(resError || !resRoom) {
					res.status(resError.code).send(resError.message);
				}
				else if(resRoom) {
					res.json({
						roomInfo: resRoom,
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

// Modificación de la sala con la id correspondiente
router.post("/room/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsRoom(user, req);
				const resError = permissionsResData.error;
				const resRoom = permissionsResData.room;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("write")) {
					resRoom.nombreSala = req.body.roomname;
					resRoom.equipamientoSala = req.body.roomequipment;
					resRoom.aforoSala = req.body.roomcapacity;
					const savedRoom = await resRoom.save()
					res.json(savedRoom);
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

// Eliminación de la sala con la id correspondiente
router.delete("/room/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsRoom(user, req);
				const resError = permissionsResData.error;
				const resRoom = permissionsResData.room;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedRoom = await resRoom.deleteOne();
					res.json(removedRoom);
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