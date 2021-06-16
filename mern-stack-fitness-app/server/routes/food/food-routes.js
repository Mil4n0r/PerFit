const express = require('express');
const passport = require('passport');
const router = express.Router();

const FoodModel = require('../../models/FoodSchema');
const { checkPermissionsFood } = require('../../auth/checkPermissions');

// ALIMENTOS

// Creación de alimento
router.post("/create/food", async (req, res, next) => {
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
				const Food = new FoodModel({
					nombreAlimento: req.body.foodname,
					tamRacion: req.body.foodsize,
					nutrientesRacion:{
						calorias: req.body.calories,
						carbohidratos: req.body.carbs,
						proteinas: req.body.proteins,
						grasas: req.body.fats
					},
					creadoPor: user._id
				});
				const savedFood = await Food.save();
				res.json(savedFood);
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next)
});

router.get("/food/list/:search?", async (req,res,next) => {
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
				if(req.params.search) {
					const foods = await FoodModel.find(
						req.params.search !== "undefined" ?
							{nombreAlimento: new RegExp(req.params.search, 'i')} 
						:
							{}
					)
					res.json(foods);
				}
				else {
					const foods = await FoodModel.find({});
					res.json(foods);
				}
			} catch(err) {
				next(err);
			}
			
		}
	})(req,res,next);
});

router.get("/foods/created/:creator?", async (req,res,next) => {
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
				if(req.params.creator) {
					const foods = await FoodModel.find(
						req.params.creator !== "undefined" ?
							{creadoPor: req.params.creator} 
						:
							{}
					)
					res.json(foods);
				}
				else {
					const foods = await FoodModel.find({});
					res.json(foods);
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next);
});

// Consulta del alimento con la id correspondiente
router.get("/food/:id", async (req, res, next) => {
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
				const permissionsRes = await checkPermissionsFood(user, req);	// Se busca el usuario cuya id coincida
				const resError = permissionsRes.error;
				const resFood = permissionsRes.food;
				const resPermission = permissionsRes.permission;
				if(resError || !resFood) {
					res.status(resError.code).send(resError.message);
				}
				else if(resFood) {
					res.json({
						foodInfo: resFood,
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
	})(req,res,next)
});

// Modificación del alimento con la id correspondiente
router.post("/food/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsFood(user, req);
				const resError = permissionsResData.error;
				const resFood = permissionsResData.food;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					resFood.emailUsuario = req.body.email		// Se reasignan los campos del alimento
					resFood.nombreAlimento = req.body.foodname
					resFood.tamRacion = req.body.foodsize
					resFood.nutrientesRacion = {
						calorias: req.body.calories,
						carbohidratos: req.body.carbs,
						proteinas: req.body.proteins,
						grasas: req.body.fats
					}
					const savedFood = await resFood.save();
					res.json(savedFood);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next)
});

// Eliminación del alimento con la id correspondiente
router.delete("/food/:id", async (req, res, next) => {
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
				const permissionsResData = await checkPermissionsFood(user, req);
				const resError = permissionsResData.error;
				const resFood = permissionsResData.food;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedFood = await resFood.deleteOne();
					res.json(removedFood);
				}
				else {
					res.status(401).send("Usuario no autorizado");
				}
			} catch(err) {
				next(err);
			}
		}
	})(req,res,next)
});

module.exports = router