const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserSchema.js');
const TrainerModel = require('../models/TrainerSchema.js');
const MemberModel = require('../models/MemberSchema.js');
const AdminModel = require('../models/AdminSchema.js');
const MonitorModel = require('../models/MonitorSchema.js');

const JWTstrategy = require('passport-jwt').Strategy;

// Estrategia local para registro de usuarios
passport.use("register",
	new LocalStrategy
	( 
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			try {
				const userExists = await UserModel.findOne({ emailUsuario: email });
				if(!userExists) {
					var user;
					if(req.body.role === "Miembro") {
						user = await MemberModel.create({
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
							privacidadUsuario: req.body.privacy,
							aliasUsuario: req.body.alias,
							balanceMonedas: 0,
							suscripcionMiembro: req.body.subscription,
							cuentaActivada: false,
							tieneEntrenador: false,
						});
					}
					else if(req.body.role === "Entrenador") {
						user = await TrainerModel.create({
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
							privacidadUsuario: req.body.privacy,
							aliasUsuario: req.body.alias,
							cuentaActivada: false
						});
					}
					else if(req.body.role === "Monitor") {
						user = await MonitorModel.create({
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
							privacidadUsuario: req.body.privacy,
							aliasUsuario: req.body.alias,
							especialidadesMonitor: req.body.specialty,
							cuentaActivada: false
						});
					}
					else if(req.body.role === "Administrador") {
						user = await AdminModel.create({
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
							privacidadUsuario: req.body.privacy,
							aliasUsuario: req.body.alias,
							cuentaActivada: false
						});
					}
					return done(null, user, { message: "Se ha registrado satisfactoriamente" });
				}
				else {
					return done(null, false, { message: "Ya existe un usuario registrado con ese email." });
				}
			} catch (error) {
				done(error);
			}
		}
	)
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
					const validate = await user.comparePassword(password);
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