const UserModel = require('../models/UserSchema');
const FoodModel = require('../models/FoodSchema');
const ExerciseModel = require('../models/ExerciseSchema');

const checkPermissionsUser = async (activeUser, req) => {
	const id = req.params.id;
	const checkedUser = await UserModel.findById(id);
	if(!checkedUser) {
		return {
			error: {
				code: 404, message: "Usuario no encontrado"
			},
			user: false,
			permission: []
		};
	}
	else {
		if(checkedUser._id.equals(activeUser._id)) { // Modificar esto para que la _id sea siempre objectId
			return {
				error: null,
				user: checkedUser,
				permission: ["read", "write"]
			};
		}
		else if(activeUser.rolUsuario === "admin") {
			return {
				error: null,
				user: checkedUser,
				permission: ["read", "write", "delete"]
			};
		}
		else if(activeUser.rolUsuario === "entrenador personal"  // Añadir en el futuro la condición de que, además de ser entrenador, entrene al usuario en cuestión
				||  checkedUser.privacidadUsuario === "publico"
				|| (checkedUser.privacidadUsuario === "solo amigos")) {// && areFriends(activeUser, userFound)))
			return {
				error: null,
				user: checkedUser,
				permission: ["read"]
			};
		}
		else {
			return {
				error: {
					code: 401,
					message: "Usuario no autorizado"
				},
				user: false,
				permission: []
			}
		}
	}
};

const checkPermissionsFood = async (activeUser, req) => {
	const id = req.params.id;
	const checkedFood = await FoodModel.findById(id);
	if(!checkedFood) {
		return {
			error: {
				code: 404, message: "Alimento no encontrado"
			},
			food: false,
			permission: []
		};
	}
	else {
		if(checkedFood.creadoPor.equals(activeUser._id) || activeUser.rolUsuario === "admin") { // Modificar esto para que la _id sea siempre objectId
			return {
				error: null,
				food: checkedFood,
				permission: ["read", "write", "delete"]
			};
		}
		else {
			return {
				error: null,
				food: checkedFood,
				permission: ["read"]
			};
		}
	}
};

const checkPermissionsExercise = async (activeUser, req) => {
	const id = req.params.id;
	const checkedExercise = await ExerciseModel.findById(id);
	if(!checkedExercise) {
		return {
			error: {
				code: 404, message: "Ejercicio no encontrado"
			},
			exercise: false,
			permission: []
		};
	}
	else {
		if(checkedExercise.creadoPor.equals(activeUser._id) || activeUser.rolUsuario === "admin") { // Modificar esto para que la _id sea siempre objectId
			return {
				error: null,
				exercise: checkedExercise,
				permission: ["read", "write", "delete"]
			};
		}
		else {
			return {
				error: null,
				exercise: checkedExercise,
				permission: ["read"]
			};
		}
	}
};

//module.exports.checkPermissionsUser = checkPermissionsUser


module.exports = {
	checkPermissionsUser,
	checkPermissionsFood,
	checkPermissionsExercise
}
