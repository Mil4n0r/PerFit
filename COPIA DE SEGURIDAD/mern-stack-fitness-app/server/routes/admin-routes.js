const express = require('express');
const passport = require('passport');
const router = express.Router();

const UserModel = require('../models/UserSchema');

// RUTAS SÓLO ACCESIBLES POR ADMINISTRADORES

// Consulta de usuarios
router.get("/list", passport.authenticate("jwt", {session: false}), async (req, res) => {
	const token = req.cookies.token;

	UserModel.find((err, users) => {	// Buscamos en el modelo todos los usuarios registrados
		if(err) {	// Se imprime un mensaje de error en consola
			console.log(err);	
		} else {	// Se manda como respuesta el contenido de la lista de usuarios (en JSON)
			res.json(users);	
		}
	});
});


// Acceso al perfil del usuario activo
router.get("/profile", passport.authenticate("jwt", {session: false}), async (req, res) => {
	res.json({
		message: "Has llegado a la ruta segura",
		user: req.user,
		token: req.query.secret_token
	});
});

router.get("/checkloggedin", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(user)
			res.send(user.rol);
		else
			res.send(false);
			
	})(req,res,next);
});
/*
router.get("/checkcurrentuser", async (req, res, next) => {
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(user)
			res.json(user._id);
		else
			res.send(false);
			
	})(req,res,next);
});
*/
// Acceso al cierre de sesión del usuario activo
router.get("/logout", passport.authenticate("jwt", {session: false}), async (req, res) => {
	req.logout()
	res.clearCookie("token");
	res.json({
		message: "Se ha cerrado sesión de manera satisfactoria"
	});
});

// Consulta del usuario con la id correspondiente
router.get("/user/:id", async (req, res, next) => {
	passport.authenticate("jwt", {session: false, failureFlash: true}, (err, user, info) => {
		if(!user)
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		else
		{
			const id = req.params.id;
			UserModel.findById(id, (err, userFound) => {	// Se busca el usuario cuya id coincida
				if(!userFound) {
					res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
				}
				else if(userFound._id.equals(user._id)) { // === no funcionaría dado que uno es un objectID y otro un string
					
					//res.json(userFound)
					res.json({
						userInfo: userFound,
						permission: 'readwrite'
					})
				}
				else if(user.rolUsuario === "admin"
					 ||	user.rolUsuario === "entrenador personal"  // Añadir en el futuro la condición de que, además de ser entrenador, entrene al usuario en cuestión
					 || userFound.privacidadUsuario === "publico"
					 || (userFound.privacidadUsuario === "solo amigos"))// && areFriends(user, userFound)))
				{ 
					res.json({
						userInfo: userFound,
						permission: 'read'
					})
				}
				else {
					res.status(401).send("Usuario no autorizado"); // En caso de que no se cumpla alguna de las condiciones anteriores se lanza el mensaje 401 Unauthorized
				}
			});
		}			
		
	})(req,res,next);

});
/*
// Modificación del usuario con la id correspondiente
router.post("/user/:id", async (req, res) => {
	const id = req.params.id;
	UserModel.findById(id, (err, user) => {	// Se busca el usuario cuya id coincida
		if(!user) {
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		} else {
			console.log("Tratando de editar usuario ", req.body)
			user.emailUsuario = req.body.email		// Se reasignan los campos del usuario
			user.passwordUsuario = req.body.password

			user
				.save()		// Se almacena el usuario
				.then(user => {
					res.json(user)	// Se manda como respuesta el usuario modificado
				})
				.catch((err) => {
					res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
				});
		}
	});
});

// Eliminación del usuario con la id correspondiente (MODIFICAR PARA ELIMINAR OTROS DATOS)
router.delete("/delete/user/:id", async (req, res) => {
	const id = req.params.id;
	UserModel.findById(id, (err, user) => {	// Se busca el usuario cuya id coincida
		if(!user) {
			res.status(404).send("Usuario no encontrado");	// En caso de no encontrarlo se lanza el mensaje 404 Not Found
		}
		else {		
			//console.log("!!!!!!!!!!!!!!!", req.cookies);
			user
				.remove()	// Se elimina el usuario
				.then(user => {
					res.json(user);	// Se manda como respuesta el usuario eliminado
				})
				.catch((err) => {
					res.status(500).send(err.message);	// En caso de fallo se manda el mensaje 500 Internal Server Error
				});
		}
	});
});
*/
module.exports = router