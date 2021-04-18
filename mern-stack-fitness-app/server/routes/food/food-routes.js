const express = require('express');
const passport = require('passport');
const router = express.Router();

const FoodModel = require('../../models/FoodSchema');
const { checkPermissionsFood } = require('../../auth/checkPermissions');

// ALIMENTOS

// Creación de alimento
router.post("/create/food", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			// Creación del alimento
			const Food = new FoodModel({
				nombreAlimento: req.body.foodname,
				tamRacion: req.body.foodsize,
				unidadesRacion: req.body.unit,
				nutrientesRacion:{
					calorias: req.body.calories,
					carbohidratos: req.body.carbs,
					proteinas: req.body.proteins,
					grasas: req.body.fats
				},
				creadoPor: user._id
			});
			Food
				.save()		// Se almacena el usuario
				.then((Food) => {
					res.json(Food);		// Se manda como respuesta el alimento
				})
				.catch((err) => {
					next(err);
				});
		}
	})(req,res,next)
});

// Lista de alimentos
router.get("/food/list", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			FoodModel.find((err, foods) => {	// Buscamos en el modelo todas las comidas registradas
				if(err) {
					next(err);	
				} 
				else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
					res.json(foods);	
				}
			});
		}
	})(req,res,next)
});

// Consulta del alimento con la id correspondiente
router.get("/food/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(err) {
			next(err);
		}
		else if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const permissionsRes = await checkPermissionsFood(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsRes.error;
			const resFood = permissionsRes.food;
			const resPermission = permissionsRes.permission;
			if(resError || !resFood) {
				res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
			}
			else if(resFood) {
				res.json({
					foodInfo: resFood,
					permission: resPermission
				});
			}
		}
	})(req,res,next)
});

// Modificación del alimento con la id correspondiente
router.post("/food/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const id = req.params.id;
			await FoodModel.findById(id, async (err, food) => {	// Se busca el alimento cuya id coincida
				if(err || !food) {
					res.status(404).send("Alimento no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				} 
				else {
					const permissionsResData = await checkPermissionsFood(user, req);
					const resError = permissionsResData.error;
					const resFood = permissionsResData.food;
					const resPermission = permissionsResData.permission;
					if(resError) {
						res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
					}
					else if(permissionsResData && resPermission.includes("write")) {
						resFood.emailUsuario = req.body.email		// Se reasignan los campos del alimento
						resFood.nombreAlimento = req.body.foodname
						resFood.tamRacion = req.body.foodsize
						resFood.unidadesRacion = req.body.unit
						resFood.nutrientesRacion = {
							calorias: req.body.calories,
							carbohidratos: req.body.carbs,
							proteinas: req.body.proteins,
							grasas: req.body.fats
						}
						// resFood.creadoPor se queda igual
	
						resFood
							.save()		// Se almacena el alimento
							.then(foodData => {
								res.json(foodData)	// Se manda como respuesta el alimento modificado
							})
							.catch((err) => {
								next(err);
							});
					}
					else {
						res.status(401).send("Usuario no autorizado");
					}
				}
			});
		}
	})(req,res,next)
});

// Eliminación del alimento con la id correspondiente
router.delete("/food/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, async (err, user, info) => {
		if(!user) {
			res.status(401).send("Usuario no autenticado");	// En caso de no encontrarlo se lanza el mensaje 401 Unauthorized
		}
		else {
			const id = req.params.id;
			await FoodModel.findById(id, async (err, food) => {	// Se busca el alimento cuya id coincida
				if(err || !food) {
					res.status(404).send("Alimento no encontrado");
				}
				else {
					const permissionsResData = await checkPermissionsFood(user, req);
					const resError = permissionsResData.error;
					const resFood = permissionsResData.food;
					const resPermission = permissionsResData.permission;
					if(resError) {
						res.status(resError.code).send(resError.message);	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
					}
					else if(permissionsResData && resPermission.includes("delete")) {
						resFood
							.remove()	// Se elimina el alimento
							.then(foodData => {
								res.json(foodData);	// Se manda como respuesta el alimento eliminado
							})
							.catch((err) => {
								next(err);
							});
					}
				}
			});
		}
	})(req,res,next)
});

module.exports = router