const express = require('express');
const passport = require('passport');
const router = express.Router();

const { checkPermissionsUser, checkPermissionsPlan } = require('../../auth/checkPermissions');

const DietModel = require('../../models/DietSchema');

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
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);
			}
			else if(permissionsResData && resPermission.includes("checkplans")) {
				try {
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
					const savedDiet = await Diet.save();
					res.json(savedDiet);
				} catch(err) {
					next(err);
				}
			}
			else {
				res.status(401).send("Usuario no autorizado");
			}	
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
			const permissionsResData = await checkPermissionsUser(user, req);	// Se busca el usuario cuya id coincida
			const resError = permissionsResData.error;
			const resPermission = permissionsResData.permission;
			if(resError) {
				res.status(resError.code).send(resError.message);
			}
			else if(permissionsResData && resPermission.includes("checkplans")) {
				try {
					const diets = await DietModel.find({usuarioPlan: req.params.id});
					res.json(diets)
				} catch(err) {
					next(err);
				}
			}
			else {
				res.status(401).send("Usuario no autorizado");
			}
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
			try {
				const permissionsResData = await checkPermissionsPlan(user, "Dieta", req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resDiet = permissionsResData.plan;
				if(resError || !resDiet) {
					res.status(resError.code).send(resError.message);
				}
				else if(resDiet) {
					res.json(resDiet);
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
			try {
				const permissionsResData = await checkPermissionsPlan(user, "Dieta", req);	// Se busca el usuario cuya id coincida
				const resError = permissionsResData.error;
				const resDiet = permissionsResData.plan;
				const resPermission = permissionsResData.permission;
				if(resError || !resDiet) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("write")) {
					resDiet.nombrePlan = req.body.dietname;
					resDiet.objetivoDiario = {
						calorias: req.body.calories,
						carbohidratos: req.body.carbs,
						proteinas: req.body.proteins,
						grasas: req.body.fats
					}
					const savedDiet = await resDiet.save();
					res.json(savedDiet);
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
			try {
				const permissionsResData = await checkPermissionsPlan(user, "Dieta", req);
				const resError = permissionsResData.error;
				const resDiet = permissionsResData.plan;
				const resPermission = permissionsResData.permission;
				if(resError) {
					res.status(resError.code).send(resError.message);
				}
				else if(permissionsResData && resPermission.includes("delete")) {
					const removedDiet = await resDiet.deleteOne();
					res.json(removedDiet);
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

module.exports = router