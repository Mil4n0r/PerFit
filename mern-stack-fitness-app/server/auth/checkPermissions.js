const UserModel = require('../models/UserSchema');

module.exports = checkPermissions = async (activeUser, req, res) => {
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
		if(checkedUser._id.equals(activeUser._id)) {
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