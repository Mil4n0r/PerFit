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
	new LocalStrategy( {
		usernameField: 'email',
		passwordField: 'password'
	},
	async (email, password, done) => {
		try {
			const user = await UserModel.findOne({ emailUsuario: email });

			if (!user) {
				return done(null, false, { message: 'Usuario no encontrado.' });
			}

			const validate = await user.comparePassword(password);

			if (!validate) {
				return done(null, false, { message: 'Password incorrecto.' });
			}

			return done(null, user, { message: 'Ha iniciado sesión satisfactoriamente.' });
		} catch (error) {
			return done(error);
		}
	})
);

// Estrategia JWT para autenticar usuarios
passport.use("jwt",
	new JWTstrategy( {
		secretOrKey: process.env.JWT_SECRET,
		jwtFromRequest: req => req.cookies.token
	},
	async (token, done) => {
		try {
			if(token)
				return done(null, token.user);
			else
				return done(null, false, { message: "No tiene token"});
		} catch (error) {
			done(error);
		}
	}
	)
);