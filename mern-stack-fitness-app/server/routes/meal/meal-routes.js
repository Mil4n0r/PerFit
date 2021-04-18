const express = require('express');
const passport = require('passport');
const router = express.Router();

const DietModel = require('../../models/DietSchema');
const RationModel = require('../../models/RationSchema');
const MealModel = require('../../models/MealSchema');

const mongoose = require('mongoose');

router.post("/associate/diet/meal/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const Meal = new MealModel({
				nombreComida: req.body.mealname,
				diaComida: req.body.mealday
			});
			
			Meal
				.save()
				.then((Meal) => {
					return DietModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								comidasDieta: mongoose.Types.ObjectId(Meal._id)
							}
						},
						{useFindAndModify: false}
					)
				})
				.then((Diet) => {
					if(!Diet) {
						res.status(404).send("Dieta no encontrada");
					}
					else {
						res.json(Meal)
					}
				})
				.catch((err) => {
					next(err);
				})
		}
	})(req,res,next);
});

router.get("/meal/list/:id", async (req, res, next) => {
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
			await DietModel.findById(id).populate("comidasDieta").exec((err, meals) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(meals.comidasDieta);	
				}
			});
			
		}
	})(req,res,next);
});

// Eliminación de la comida con la id correspondiente
router.delete("/meal/:dietid/:id", async (req, res, next) => {
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
			try {
				const meal = await MealModel.findByIdAndDelete(id, {useFindAndModify: false})	// Se busca el ejercicio cuya id coincida
				if(!meal) {
					res.status(404).send("Comida no encontrada");
				}
				else {
					const diet = await DietModel.findByIdAndUpdate(req.params.dietid, {$pull: {comidasDieta: id} }, {useFindAndModify: false} );
					if(!diet) {
						res.status(404).send("Dieta no encontrada");
					}
					else {
						res.json(diet);
					}
				} 
			} catch(err_diet) {
				next(err_diet);
			}
		}
	})(req,res,next);
});

router.get("/meal/:id", async (req, res, next) => {
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
			await MealModel.findById(id).populate("racionesComida").exec((err, meal) => {
				if(err) {
					next(err);
				}
				else if(!meal) {
					res.status(404).send("Comida no encontrada");
				}
				else {
					res.json(meal);
				}
			});
		}
	})(req,res,next);
});

router.get("/ration/list/:id", async (req, res, next) => {
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
			await MealModel.findById(id)
				.populate({
					path: "racionesComida",
					populate: {path: "alimentoComida"}
				})
				.exec((err, meal) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(meal.racionesComida);	
				}
			});
			
		}
	})(req,res,next);
});

router.post("/associate/meal/ration/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const Ration = new RationModel({
				alimentoComida: req.body.mealfood,
				numRaciones: req.body.numberofrations
			});
			
			Ration
				.save()
				.then((Ration) => {
					return MealModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								racionesComida: mongoose.Types.ObjectId(Ration._id)
							}
						},
						{useFindAndModify: false}
					)
				})
				.then((Meal) => {
					if(!Meal) {
						res.status(404).send("Comida no encontrada");
					}
					else {
						res.json(Meal)
					}
				})
				.catch((err) => {
					next(err);
				})
		}
	})(req,res,next);
});

router.delete("/ration/:mealid/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			const mealid = req.params.mealid;
			const id = req.params.id;
			try {
				const ration = await RationModel.findByIdAndDelete(id, {useFindAndModify: false})
				if(!ration) {
					res.status(404).send("Ración no encontrada");
				}
				else {
					const meal = await MealModel.findByIdAndUpdate(
						mealid,
						{$pull: {racionesComida: id } },
						{useFindAndModify: false}
					);
					if(!meal) {
						res.status(404).send("Comida no encontrada");
					}
					else {
						res.json(meal);
					}
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

// Consulta del ejercicio con la id correspondiente
router.get("/ration/:id", async (req, res, next) => {
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
			await RationModel.findById(id).populate("alimentoComida").exec((err, ration) => {	// Se busca el ejercicio cuya id coincida
				if(err) {
					next(err);
				}
				else if(!ration) {
					res.status(404).send("Ración no encontrada");
				}
				else {
					res.json(ration);
				}
			});
		}
	})(req,res,next);
});

router.post("/ration/:id", async (req, res, next) => {
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
			await RationModel.findById(id, (err, ration) => {
				if(err || !ration) {
					res.status(404).send("Ración no encontrada");
				} 
				else {
					ration.alimentoComida = req.body.mealfood;
					ration.numRaciones = req.body.numberofrations;

					ration
						.save()
						.then(ration => {
							res.json(ration)
						})
						.catch((err) => {
							next(err);
						});
				}
			});
		}
	})(req,res,next);
});

router.post("/meal/:id", async (req, res, next) => {
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
			await MealModel.findById(id, (err, meal) => {
				if(err || !meal) {
					res.status(404).send("Comida no encontrada");
				} 
				else {
					meal.nombreComida = req.body.mealname;
					meal.diaComida = req.body.mealday;
					training
						.save()
						.then(meal => {
							res.json(meal)
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