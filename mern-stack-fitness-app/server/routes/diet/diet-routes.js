const express = require('express');
const passport = require('passport');
const router = express.Router();

const DietModel = require('../../models/DietSchema');

// Creación de dieta
router.post("/create/diet", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			// Creación de la dieta
			const Diet = new DietModel({
				nombrePlan: req.body.dietname,
				objetivoDiario: {
					calorias: req.body.calories,
					carbohidratos: req.body.carbs,
					proteinas: req.body.proteins,
					grasas: req.body.fats
				}
			});
			Diet
				.save()		// Se almacena la dieta
				.then((Diet) => {
					res.json(Diet);		// Se manda como respuesta la dieta
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});

router.get("/diet/list/:id", async (req, res, next) => {
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
			await DietModel.find({usuarioPlan: userid},(err, diets) => {
				if(err) {
					next(err);	
				} 
				else {	
					res.json(diets);	
				}
			});
		}
	})(req,res,next);
});

// Consulta de la dieta con la id correspondiente
router.get("/diet/:id", async (req, res, next) => {
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
			await DietModel.findById(id, (err, diet) => {
				if(err) {
					next(err);
				}
				else if(!diet) {
					res.status(404).send("Dieta no encontrado");
				}
				else {
					res.json(diet);		// Se manda como respuesta la dieta encontrada
				}
			});
		}
	})(req,res,next);
});

// Modificación de la dieta con la id correspondiente
router.post("/diet/:id", async (req, res, next) => {
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
			await DietModel.findById(id, (err, diet) => {
				if(err || !diet) {
					res.status(404).send("Dieta no encontrada");
				} 
				else {
					diet.nombrePlan = req.body.dietname,
					diet.objetivoDiario = {
						calorias: req.body.calories,
						carbohidratos: req.body.carbs,
						proteinas: req.body.proteins,
						grasas: req.body.fats
					}
					diet
						.save()
						.then(diet => {
							res.json(diet)
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

// Eliminación de la dieta con la id correspondiente
router.delete("/diet/:id", async (req, res, next) => {
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
			await DietModel.findById(id, (err, diet) => {	// Se busca la dieta cuya id coincida
				if(err || !diet) {
					res.status(404).send("Dieta no encontrada");
				}
				else {
					diet
						.remove()	// Se elimina la dieta
						.then(diet => {
							res.json(diet);	// Se manda como respuesta la dieta eliminada
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

router.post("/associate/diet/:id", async (req, res, next) => {
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
			const Diet = new DietModel({
				objetivoDiario: {
					calorias: req.body.calories,
					carbohidratos: req.body.carbs,
					proteinas: req.body.proteins,
					grasas: req.body.fats
				},
				nombrePlan: req.body.dietname,
				usuarioPlan: req.params.id
			});
			Diet
				.save()
				.then((Diet) => {
					res.json(Diet);
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next);
});

module.exports = router