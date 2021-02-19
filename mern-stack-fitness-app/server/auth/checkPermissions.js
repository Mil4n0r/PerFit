const { response } = require('express');
const UserModel = require('../models/UserSchema');

module.exports = checkPermissions = async (activeUser, req, res) => {
	const id = req.params.id;
	const userFound = await UserModel.findById(id);
	if(!userFound) {
		return {
			error: {
				code: 404,
				text: "Usuario no encontrado"
			},
			user: null
		};
	}
	else if(userFound._id.equals(activeUser._id)) { // === no funcionaría dado que uno es un objectID y otro un string
		return {
			error: null,
			user: {
				userInfo: userFound,
				permission: ["read","write"]
			}
		};
	}
	else if(activeUser.rolUsuario === "admin") {
		return {
			error: null,
			user: {
				userInfo: userFound,
				permission: ["read","write","delete"]
			}
		};
	}
	else if(activeUser.rolUsuario === "entrenador personal"  // Añadir en el futuro la condición de que, además de ser entrenador, entrene al usuario en cuestión
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
/*
module.exports = checkPermissions = async (activeUser, req, res) => {
	const id = req.params.id;
	await UserModel.findById(id, (err, userFound) => {
		if(!userFound) {
			
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		}
		else if(userFound._id.equals(activeUser._id)) { // === no funcionaría dado que uno es un objectID y otro un string
			
			res.json({
				userInfo: userFound,
				permission: 'readwrite'
			});
		}
		else if(activeUser.rolUsuario === "admin"
				||	activeUser.rolUsuario === "entrenador personal"  // Añadir en el futuro la condición de que, además de ser entrenador, entrene al usuario en cuestión
				||  userFound.privacidadUsuario === "publico"
				|| (userFound.privacidadUsuario === "solo amigos")) {// && areFriends(activeUser, userFound)))
			
			res.json({
				userInfo: userFound,
				permission: 'read'
			});
		}
		else {
			res.status(401).send("Usuario no autorizado"); // En caso de que no se cumpla alguna de las condiciones anteriores se lanza el mensaje 401 Unauthorized
		}		
	});
}
*/