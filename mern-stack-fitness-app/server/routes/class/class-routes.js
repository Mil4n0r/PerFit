const express = require('express');
const passport = require('passport');
const router = express.Router();

const ClassModel = require('../../models/ClassSchema');

const { checkPermissionsClass } = require('../../auth/checkPermissions');

const mongoose = require('mongoose');

router.post("/create/class", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const Class = new ClassModel({
				diaClase: req.body.classday,
				monitorClase: req.body.classmonitor,
				//asistentesClase se asigna posteriormente
				actividadClase: req.body.classactivity,
				salaClase: req.body.classroom
			});
			Class
				.save()
				.then((Class) => {
					res.json(Class);
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});

// Lista de clases
router.get("/class/list", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			
			ClassModel
			.find({})
			.populate("monitorClase")
			.populate("asistentesClase")
			.populate("actividadClase")
			.populate("salaClase")
			.exec((err,classes) => {
				
				if(err) {
					next(err);	
				} 
				else {
					res.json(classes);	
				}
			})
			
			/*
			ClassModel.find((err, classes) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(classes);	
				}
			});
			*/
		}
	})(req,res,next);
});

router.get("/class/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const permissionsRes = await checkPermissionsClass(user, req);
			const resError = permissionsRes.error;
			const resClass = permissionsRes.class;
			const resPermission = permissionsRes.permission;
			if(resError || !resClass) {
				res.status(resError.code).send(resError.message);
			}
			else if(resClass) {
				res.json({
					classInfo: resClass,
					permission: resPermission
				});
			}
		}
	})(req,res,next);
});

// Modificación de la clase con la id correspondiente
router.post("/class/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const permissionsResData = await checkPermissionsClass(user, req);
			const resError = permissionsResData.error;
			const resClass = permissionsResData.class;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("write")) {				
				resClass.diaClase = req.body.classday;
				resClass.monitorClase = req.body.classmonitor;
				//resClass.asistentesClase se edita aparte (lista)
				resClass.actividadClase = req.body.classactivity;
				resClass.salaClase = req.body.classroom;
				
				resClass
					.save()		// Se almacena la clase
					.then(classData => {
						res.json(classData)	// Se manda como respuesta la clase modificada
					})
					.catch((err) => {
						next(err);
					});
			}
		}
	})(req,res,next);
});

// Eliminación del ejercicio con la id correspondiente
router.delete("/class/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const permissionsResData = await checkPermissionsClass(user, req);
			const resError = permissionsResData.error;
			const resClass = permissionsResData.class;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("delete")) {
				resClass
					.remove()	// Se elimina la clase
					.then(classData => {
						res.json(classData);	// Se manda como respuesta la clase eliminada
					})
					.catch((err) => {
						next(err);
					});
			}
		}
	})(req,res,next);
});

router.post("/join/class/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const permissionsResData = await checkPermissionsClass(user, req);
			const resError = permissionsResData.error;
			const resClass = permissionsResData.class;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("join")) {
				resClass
					.update({$push: {asistentesClase: mongoose.Types.ObjectId(user._id)} })
					.then(classData => {
						res.json(classData);	// Se manda como respuesta la clase eliminada
					})
					.catch((err) => {
						next(err);
					});
			}
		}
	})(req,res,next);
});

router.post("/leave/class/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const permissionsResData = await checkPermissionsClass(user, req);
			const resError = permissionsResData.error;
			const resClass = permissionsResData.class;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("leave")) {
				resClass
					.update({$pull: {asistentesClase: mongoose.Types.ObjectId(user._id)} })
					.then(classData => {
						res.json(classData);	// Se manda como respuesta la clase eliminada
					})
					.catch((err) => {
						next(err);
					});
			}
		}
	})(req,res,next);
});

module.exports = router;