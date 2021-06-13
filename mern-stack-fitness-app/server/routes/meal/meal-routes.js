const express = require('express');
const passport = require('passport');
const router = express.Router();

const DietModel = require('../../models/DietSchema');
const RationModel = require('../../models/RationSchema');
const MealModel = require('../../models/MealSchema');

const startOfDay = require('date-fns/startOfDay');
const endOfDay = require('date-fns/endOfDay');
const startOfMonth = require('date-fns/startOfMonth');
const endOfMonth = require('date-fns/endOfMonth');

const mongoose = require('mongoose');

const { checkPermissionsPlan } = require('../../auth/checkPermissions');

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
			try {
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					const Meal = new MealModel({
						nombreComida: req.body.mealname,
						diaComida: req.body.mealday
					});
					const savedMeal = await Meal.save();
					const savedDiet = await DietModel.findByIdAndUpdate(
						req.params.id,
						{
							$push: {
								comidasDieta: mongoose.Types.ObjectId(Meal._id)
							}
						},
						{useFindAndModify: false},
						{ runValidators: true }
					);
					res.json(savedMeal);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err)
			}
		}
	})(req,res,next);
});

router.get("/meal/list/:id/:date?", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("read")) {	
					if(req.params.date) {
						const diet = await DietModel.findById(req.params.id)
							.populate({
								path: "comidasDieta",
								populate: {
									path: "racionesComida",
									populate: {
										path: "alimentoComida"
									}
								},
								match: {
									diaComida: {
										$gte: startOfDay(new Date(req.params.date)),
										$lte: endOfDay(new Date(req.params.date)),
									}
								}
							});
						res.json(diet.comidasDieta);
					}
					else {
						const diet = await DietModel.findById(req.params.id)
							.populate({
								path: "comidasDieta",
								populate: {
									path: "racionesComida",
									populate: {
										path: "alimentoComida"
									}
								}
							});
						res.json(diet.comidasDieta);
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

router.get("/meal/list/month/:id/:date", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("read")) {
					const diets = await DietModel.findById(req.params.id)
						.populate({
							path: "comidasDieta",
							populate: {
								path: "racionesComida",
								populate: {
									path: "alimentoComida"
								}
							},
							match: {
								diaComida: {
									$gte: startOfMonth(new Date(req.params.date)),
									$lte: endOfMonth(new Date(req.params.date))
								}
							}
						});
					res.json(diets.comidasDieta);
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

// Eliminación de la comida con la id correspondiente
router.delete("/meal/:id/:mealid", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resDiet = permissionsResData.plan;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					var deletedMeal;
					try {
						deletedMeal = await MealModel.findByIdAndDelete(req.params.mealid, {useFindAndModify: false})	
					} catch(err) {
						res.status(404).send("Comida no encontrada");
					}
					if(deletedMeal) {
						await resDiet.comidasDieta.pull(mongoose.Types.ObjectId(req.params.mealid));
						const savedDiet = await resDiet.save();
						res.json(savedDiet)
					}
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err_diet) {
				next(err_diet);
			}
		}
	})(req,res,next);
});

router.get("/meal/:id/:mealid", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("read")) {
					const meal = await MealModel.findById(req.params.mealid).populate("racionesComida");
					res.json(meal);
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

router.post("/associate/meal/ration/:id/:mealid", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					const Ration = new RationModel({
						alimentoComida: req.body.mealfood,
						numRaciones: req.body.numberofrations
					});				
					const savedRation = await Ration.save();
					const savedMeal = await MealModel.findByIdAndUpdate(
						req.params.mealid,
						{
							$push: {
								racionesComida: mongoose.Types.ObjectId(savedRation._id)
							}
						},
						{useFindAndModify: false},
						{ runValidators: true }
					);
					res.json(savedMeal);
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

router.delete("/ration/:id/:mealid/:rationid", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					var deletedRation;
					try {
						deletedRation = await RationModel.findByIdAndDelete(req.params.rationid, {useFindAndModify: false});
					} catch(err) {
						res.status(404).send("Ración no encontrada")
					}
					if(deletedRation) {
						const savedMeal = await MealModel.findByIdAndUpdate(
							req.params.mealid,
							{$pull: {racionesComida: req.params.rationid } },
							{useFindAndModify: false},
							{ runValidators: true }
						)
						res.json(savedMeal);
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

// Consulta del ejercicio con la id correspondiente
router.get("/ration/:id/:rationid", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("read")) {
					const ration = await RationModel.findById(req.params.rationid).populate("alimentoComida")
					res.json(ration);
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

router.post("/ration/:id/:rationid", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					var ration = await RationModel.findById(req.params.rationid);
					ration.alimentoComida = req.body.mealfood;
					ration.numRaciones = req.body.numberofrations;
					const savedRation = await ration.save();
					res.json(savedRation);
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

router.post("/meal/:id/:mealid", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsPlan(user, req);
				const resError = permissionsResData.error;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					var meal = await MealModel.findById(req.params.mealid);
					meal.nombreComida = req.body.mealname;
					meal.diaComida = req.body.mealday;
					const savedMeal = await meal.save();
					res.json(savedMeal)
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