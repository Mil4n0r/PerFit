const express = require('express');
const passport = require('passport');
const router = express.Router();

const MeasureModel = require('../../models/MeasureSchema');
const TrackingModel = require('../../models/TrackingSchema');

const { checkPermissionsMeasure, checkPermissionsPlan } = require('../../auth/checkPermissions');

const mongoose = require('mongoose');

// MEDIDAS

// Lista de medidas
router.get("/measure/list/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, "Seguimiento", req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("read")) {
					const tracking = await TrackingModel.findById(req.params.id).populate("medidasSeguidas")
					res.json(tracking.medidasSeguidas);	
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

// Consulta de la medida con la id correspondiente
router.get("/measure/:id", async (req, res, next) => {
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
				const permissionsRes = await checkPermissionsMeasure(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsRes.error;
				const resMeasure = permissionsRes.measure;
				const resPermission = permissionsRes.permission;
				if(resError || !resMeasure) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else if(resMeasure) {
					res.json({
						measureInfo: resMeasure,
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

// Modificación de la medida con la id correspondiente
router.post("/measure/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsMeasure(user, req);
				const resError = permissionsResData.error;
				const resMeasure = permissionsResData.measure;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("write")) {
					resMeasure.valorMedida = req.body.measurevalue
					resMeasure.fechaMedida = req.body.measuredate
					resMeasure.fotoMedida = req.body.measurephoto

					const savedMeasure = await resMeasure.save();
					res.json(savedMeasure)
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

// Eliminación de la medida con la id correspondiente
router.delete("/measure/:trackingid/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsMeasure(user, req);
				const resError = permissionsResData.error;
				const resMeasure = permissionsResData.measure;
				const resPermission = permissionsResData.permission;
				
				if(resError) {
					res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedMeasure = await resMeasure.deleteOne();
					var tracking;
					try {
						tracking = await TrackingModel.findByIdAndUpdate(req.params.trackingid, 
							{$pull: {medidasSeguidas: req.params.id} },
							{useFindAndModify: false, runValidators: true}
						);
					} catch(err) {
						res.status(404).send("Seguimiento no encontrado");
					}
					if(tracking) {
						res.json(removedMeasure);	// Se manda como respuesta la medida eliminada
					}
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

router.post("/associate/tracking/measure/:id", async (req, res, next) => {
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
				const Measure = new MeasureModel({
					valorMedida: req.body.measurevalue,
					fechaMedida: req.body.measuredate
				});
				const savedMeasure = await Measure.save();
				var savedTracking;
				try {
					savedTracking = await TrackingModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								medidasSeguidas: mongoose.Types.ObjectId(savedMeasure._id)
							}
						},
						{useFindAndModify: false, runValidators: true }
					);
				} catch(err) {
					res.status(404).send("Seguimiento no encontrado");
				}
				if(savedTracking) {
					res.json(savedTracking);
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

module.exports = router