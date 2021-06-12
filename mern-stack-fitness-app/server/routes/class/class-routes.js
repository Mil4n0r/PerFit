const express = require('express');
const passport = require('passport');
const router = express.Router();

const ClassModel = require('../../models/ClassSchema');

const { checkPermissionsClass } = require('../../auth/checkPermissions');

const mongoose = require('mongoose');

router.post("/create/class", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			if(user.role !== "Administrador") {
				res.status(401).send("No tiene permisos suficientes");
			}
			else {
				const permissionsResData = await checkPermissionsClass(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					try {
						const Class = new ClassModel({
							diaClase: req.body.classday,
							monitorClase: req.body.classmonitor,
							//asistentesClase se asigna posteriormente
							actividadClase: req.body.classactivity,
							salaClase: req.body.classroom
						});
						const savedClass = await Class.save()
						res.json(savedClass);
					} catch(err) {
						next(err);
					}
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			}
		}
	})(req,res,next);
});

// Lista de clases
router.get("/class/list", async (req, res, next) => {
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
				const classes = await ClassModel.find({})
					.populate("monitorClase", "aliasUsuario")
					.populate("asistentesClase", "aliasUsuario")
					.populate("actividadClase")
					.populate("salaClase");
				res.json(classes);
			} catch(err) {
				next(err);
			}
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
			try {
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
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
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
			try {
				const permissionsResData = await checkPermissionsClass(user, req);
				const resError = permissionsResData.error;
				const resClass = permissionsResData.class;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {				
					resClass.diaClase = req.body.classday;
					resClass.monitorClase = req.body.classmonitor;
					//resClass.asistentesClase se edita aparte (lista)
					resClass.actividadClase = req.body.classactivity;
					resClass.salaClase = req.body.classroom;
					
					const savedClass = await resClass.save();
					res.json(savedClass);
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
			try {
				const permissionsResData = await checkPermissionsClass(user, req);
				const resError = permissionsResData.error;
				const resClass = permissionsResData.class;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedClass = await resClass.remove();	// Se elimina la clase
					res.json(removedClass);
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
			try {
				const permissionsResData = await checkPermissionsClass(user, req);
				const resError = permissionsResData.error;
				const resClass = permissionsResData.class;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("join")) {
					await resClass.asistentesClase.push(mongoose.Types.ObjectId(user._id))
					const savedClass = await resClass.save();
					res.json(savedClass)
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
			try {
				const permissionsResData = await checkPermissionsClass(user, req);
				const resError = permissionsResData.error;
				const resClass = permissionsResData.class;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("leave")) {
					await resClass.asistentesClase.pull(mongoose.Types.ObjectId(user._id))
					const savedClass = await resClass.save();
					res.json(savedClass);
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