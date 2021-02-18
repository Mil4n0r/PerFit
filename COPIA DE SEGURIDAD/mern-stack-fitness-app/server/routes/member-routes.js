const express = require('express');
const passport = require('passport');
const router = express.Router();

// RUTAS SÓLO ACCESIBLES POR MIEMBROS AUTENTICADOS
/*
// Consulta del usuario con la id correspondiente
router.get("/profile/:id", async (req, res, next) => {
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
*/
module.exports = router