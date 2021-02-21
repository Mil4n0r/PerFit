const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserSchema.js');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

/*
// Estrategia local para registro de usuarios
passport.use("register",
	new LocalStrategy( {
		usernameField: 'email',
		passwordField: 'password'
	},
	async (email, password, done) => {
		try {
			const user = await UserModel.create({ emailUsuario: email, passwordUsuario: password });
			return done(null, user);
		} catch (error) {
			done(error);
		}
	})
);
*/
// Estrategia local para registro de usuarios
passport.use("register",
	new LocalStrategy( {
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	async (req, email, password, done) => {
		try {
			const user = await UserModel.create({
				emailUsuario: email,
				passwordUsuario: password,
				datosPersonales: {
					nombreUsuario: req.body.name,
					apellidosUsuario: req.body.surname,
					dniUsuario: req.body.dni,
					direccionUsuario: req.body.address,
					telefonoUsuario: req.body.telephone,
					fechaNacUsuario: req.body.birthdate
				},
				rolUsuario: req.body.role,
				privacidadUsuario: req.body.privacy,
				aliasUsuario: req.body.alias
			});
			return done(null, user);
		} catch (error) {
			done(error);
		}
	})
);


// Estrategia local para login de usuarios
passport.use("login",
	new LocalStrategy
	(
		{
			usernameField: "email",
			passwordField: "password"
		},
		(email, password, done) => {
			UserModel.findOne({ emailUsuario: email }, async (err, user) => {
				if(err) {
					done(err);
				}
				else if (!user) {
					return done(null, false, { message: "Usuario incorrecto." });
				}
				else {
					const validate = user.comparePassword(password);

					if (!validate) {
						return done(null, false, { message: "Password incorrecto." });
					}
					else {
						return done(null, user, { message: "Ha iniciado sesión satisfactoriamente." });
					}
				}
			});
		} 	
	)
);

// Estrategia JWT para autenticar usuarios
passport.use("jwt",
	new JWTstrategy( 
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: req => req.cookies.token,
		},
		(token, done) => {
			const id = token.user._id;
			UserModel.findById(id, (err, user) => {
				if(err) {
					return done(err)
				}
				else if(!user) {
					return done(null, false, { message: "Usuario no encontrado"});
				}
				else {
					return done(null, user, { message: "Ha sido validado satisfactoriamente"});
				}
			})			
		}
	)
);