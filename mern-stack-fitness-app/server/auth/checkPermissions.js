const { response } = require('express');
const UserModel = require('../models/UserSchema');

module.exports = checkPermissions = async (activeUser, req, res) => {
	const id = req.params.id;
	const userFound = await UserModel.findById(id);
	if(!userFound) {
		console.log("A")
		return {
			error: {
				code: 404,
				text: "Usuario no encontrado"
			},
			user: null
		};
	}
	else if(userFound._id.equals(activeUser._id)) { // "===" no funcionaría dado que uno es un objectID y otro un string
		console.log("B")
		return {
			error: null,
			user: {
				userInfo: userFound,
				permission: ["read","write"]
			}
		};
	}
	else if(activeUser.rol === "admin") {
		console.log("C")
		return {
			error: null,
			user: {
				userInfo: userFound,
				permission: ["read","write","delete"]
			}
		};
	}
	else if(activeUser.rol === "entrenador personal"  // Añadir en el futuro la condición de que, además de ser entrenador, entrene al usuario en cuestión
			||  userFound.privacidadUsuario === "publico"
			|| (userFound.privacidadUsuario === "solo amigos")) {// && areFriends(activeUser, userFound)))
		return {
			error: null,
			user: {
				userInfo: userFound,
				permission: ["read"]
			}
		};
	}
	else {
		return {
			error: {
				code: 401,
				text: "Usuario no autorizado"
			},
			user: null
		};
	}
}