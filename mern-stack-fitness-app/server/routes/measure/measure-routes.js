const express = require('express');
const passport = require('passport');
const router = express.Router();

const MeasureModel = require('../../models/MeasureSchema');
const TrackingModel = require('../../models/TrackingSchema');

const { checkPermissionsMeasure } = require('../../auth/checkPermissions');

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
			const id = req.params.id;
			await TrackingModel.findById(id).populate("medidasSeguidas").exec((err, measures) => {	// Buscamos en el modelo todas las rutinas registradas
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de rutinas (en JSON)
					res.json(measures.medidasSeguidas);	
				}
			});
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

				resMeasure
					.save()		// Se almacena la medida
					.then(measureData => {
						res.json(measureData)	// Se manda como respuesta la medida modificada
					})
					.catch((err) => {
						next(err);
					});
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
			const permissionsResData = await checkPermissionsMeasure(user, req);
			const resError = permissionsResData.error;
			const resMeasure = permissionsResData.measure;
			const resPermission = permissionsResData.permission;
			
			if(resError) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarla se lanza el mensaje 404 Not Found
			}
			else if(permissionsResData && resPermission.includes("delete")) {
				resMeasure
					.remove()	// Se elimina la medida
					.then(async (measureData) => {
						const tracking = await TrackingModel.findByIdAndUpdate(req.params.trackingid, {$pull: {medidasSeguidas: req.params.id} }, {useFindAndModify: false} );
						if(!tracking) {
							res.status(404).send("Seguimiento no encontrado");
						}
						else {
							res.json(measureData);	// Se manda como respuesta la medida eliminada
						}
					})
					.catch((err) => {
						next(err);
					});
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
			const Measure = new MeasureModel({
				valorMedida: req.body.measurevalue,
				fechaMedida: req.body.measuredate
			});
			
			Measure
				.save()
				.then((Measure) => {
					return TrackingModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								medidasSeguidas: mongoose.Types.ObjectId(Measure._id)
							}
						},
						{useFindAndModify: false}
					)
				})
				.then((Tracking) => {
					if(!Tracking) {
						res.status(404).send("Seguimiento no encontrado");
					}
					else {
						res.json(Tracking)
					}
				})
				.catch((err) => {
					next(err);
				})
		}
	})(req,res,next);
});

module.exports = router