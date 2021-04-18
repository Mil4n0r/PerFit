const express = require('express');
const passport = require('passport');
const router = express.Router();

const TrackingModel = require('../../models/TrackingSchema');

router.post("/associate/tracking/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			// Creación de la rutina
			const Tracking = new TrackingModel({
				nombrePlan: req.body.trackingname,
				usuarioPlan: req.params.id,
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

router.get("/tracking/list", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			await TrackingModel.find((err, trackings) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(trackings);	
				}
			});
		}
	})(req,res,next);
});

router.get("/tracking/list/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const userid = req.params.id;
			await TrackingModel.find({usuarioPlan: userid},(err, trackings) => {
				if(err) {
					next(err);	
				} 
				else {	
					res.json(trackings);	
				}
			});
		}
	})(req,res,next);
});

// Consulta del ejercicio con la id correspondiente
router.get("/tracking/:id", async (req, res, next) => {
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
			await TrackingModel.findById(id, (err, tracking) => {
				if(err) {
					next(err);
				}
				else if(!tracking) {
					res.status(404).send("Seguimiento no encontrado");
				}
				else {
					res.json(tracking);		// Se manda como respuesta el seguimiento encontrado
				}
			});
		}
	})(req,res,next);
});

// Modificación del ejercicio con la id correspondiente
router.post("/tracking/:id", async (req, res, next) => {
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
			await TrackingModel.findById(id, (err, tracking) => {
				if(err || !tracking) {
					res.status(404).send("Seguimiento no encontrado");
				} 
				else {
					tracking.nombrePlan = req.body.trackingname,
					tracking.valorObjetivo = req.body.targetvalue,
					tracking.medidasSeguidas = req.body.trackedmeasures
					tracking
						.save()
						.then(tracking => {
							res.json(tracking)
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

// Eliminación de la rutina con la id correspondiente
router.delete("/tracking/:id", async (req, res, next) => {
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
			await TrackingModel.findById(id, (err, tracking) => {	// Se busca el seguimiento cuya id coincida
				if(err || !tracking) {
					res.status(404).send("Seguimiento no encontrada");
				}
				else {
					tracking
						.remove()	// Se elimina el seguimiento
						.then(tracking => {
							res.json(tracking);	// Se manda como respuesta el seguimiento eliminado
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

module.exports = router;