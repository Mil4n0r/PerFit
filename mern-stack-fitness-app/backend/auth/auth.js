const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserSchema.js');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

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
		jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
	},
	async (token, done) => {
		try {
			return done(null, token.user);
		} catch (error) {
			done(error);
		}
	}
	)
);