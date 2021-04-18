const express = require('express');
const passport = require('passport');
const router = express.Router();

const RoomModel = require('../../models/RoomSchema');

const { checkPermissionsRoom } = require('../../auth/checkPermissions');

router.post("/create/room", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const Room = new RoomModel({
				nombreSala: req.body.roomname,
				equipamientoSala: req.body.roomequipment,
				aforoSala: req.body.roomcapacity
			});
			Room
				.save()
				.then((Room) => {
					res.json(Room);
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});

// Lista de actividades
router.get("/room/list", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			RoomModel.find((err, activities) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(activities);	
				}
			});
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
		}
	})(req,res,next);
});

// Modificación del ejercicio con la id correspondiente
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
			const permissionsResData = await checkPermissionsRoom(user, req);
			const resError = permissionsResData.error;
			const resRoom = permissionsResData.room;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("write")) {
				resRoom.nombreSala = req.body.roomname;
				resRoom.equipamientoSala = req.body.roomequipment;
				resRoom.aforoSala = req.body.roomcapacity;
				// resRoom.creadoPor se queda igual

				resRoom
					.save()		// Se almacena la sala
					.then(roomData => {
						res.json(roomData)	// Se manda como respuesta la sala modificada
					})
					.catch((err) => {
						next(err);
					});
			}
		}
	})(req,res,next);
});

// Eliminación del ejercicio con la id correspondiente
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
			const permissionsResData = await checkPermissionsRoom(user, req);
			const resError = permissionsResData.error;
			const resRoom = permissionsResData.room;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("delete")) {
				resRoom
					.remove()	// Se elimina la sala
					.then(roomData => {
						res.json(roomData);	// Se manda como respuesta la sala eliminada
					})
					.catch((err) => {
						next(err);
					});
			}
		}
	})(req,res,next);
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// Creación de seguimiento
/*
router.post("/create/tracking", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			// Creación del seguimiento
			const Tracking = new TrackingModel({
				nombrePlan: req.body.trackingname,
				valorObjetivo: req.body.targetvalue,
				medidasSeguidas: req.body.trackedmeasures
			});
			Tracking
				.save()		// Se almacena el seguimiento
				.then((Tracking) => {
					res.json(Tracking);		// Se manda como respuesta el seguimiento
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});
*/

module.exports = router;