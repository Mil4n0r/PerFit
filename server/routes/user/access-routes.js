const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mailer = require('nodemailer');
const UserModel = require('../../models/UserSchema');

// Registro de usuarios
router.post("/register", async (req, res, next) => {
	passport.authenticate("register", {session: false, badRequestMessage: "Faltan datos por rellenar"}, async (err, user, info) => {
		if(err) {
			next(err);
		} 
		else if(!user) {
			const error = new Error(info.message);
			next(error);
		}
		else {
			const transporter = mailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.MAIL,
					pass: process.env.MAIL_PASSWORD, 
				},
			});
			try {
				const mailinfo = await transporter.sendMail({
					from: process.env.MAIL,
					to: `${user.emailUsuario}`,
					subject: "Solicitud de registro en PerFit",
					html: '<h1>Hemos recibido su solicitud de registro</h1>' +
					`<p>Hola ${user.aliasUsuario}, su solicitud de registro en PerFit se ha realizado de manera satisfactoria.</p>` +
					'<p>Recuerde que no tendrá acceso hasta que esta solicitud sea validada por un administrador, cuando esto ocurra se le enviará otro correo electrónico.</p>'
				});
			} catch(err) {
				next(err);
			}
			res.json({
				message: info.message,
				user: user
			})
		}
	})(req,res,next)
});

// Inicio de sesión
router.post("/login/:remember", (req, res, next) => {
	// Empleamos la estrategia local definida en '../auth' para autenticar al usuario que trata de iniciar sesión
	passport.authenticate("login", {session: false, badRequestMessage: "Faltan datos por rellenar"}, (err, user, info) => {
		// Se comprueba que no haya errores
		if (err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message);
			next(error);
		}
		else {
			// Se llama a la función login de passport y se introduce el token obtenido en una cookie
			req.login(
				user,
				{session: false},
				(error) => {
					if (error) {
						next(error);
					}
					else if(!user.cuentaActivada) {
						res.status(403).send("El usuario existe pero no ha sido validado");
					}
					else
					{
						const body = { _id: user._id, email: user.emailUsuario, rol: user.role };
						const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
						const today_date = new Date();
						const expire_date = req.params.remember === "true" ? new Date(today_date.setMonth(today_date.getMonth()+1)) : false;
						res.cookie("token", token, {
							expires: expire_date,
							httpOnly: true,
							sameSite: 'none',
							secure: true
						});
						return res.status(200).send(body);
					}
					
				}
			);
		}
	})(req, res, next);
});

// Reinicio de contraseña
router.post("/forgot/password", async (req, res, next) => {
	try {
		const user = await UserModel.findOne({emailUsuario: req.body.email});
		if(!user) {
			res.status(404).send("El email introducido no corresponde a ningún usuario registrado.")
		}
		else {
			const body = { _id: user._id, email: user.emailUsuario, password: user.passwordUsuario };
			const token = jwt.sign({ body }, process.env.RESET_PASSWORD_SECRET, {expiresIn: '15m'});
			// ENVÍO DE EMAIL
			const transporter = mailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.MAIL,
					pass: process.env.MAIL_PASSWORD, 
				},
			});
			try {
				const mailinfo = await transporter.sendMail({
					from: process.env.MAIL,
					to: `${user.emailUsuario}`,
					subject: "Restablecer tu contraseña en PerFit",
					html: '<h1>Restauración de contraseña</h1>' +
					`<p>Acceda al siguiente link para establecer una nueva: <a href="https://perfit.netlify.app/reset/password/${token}">Link</a>` +
					'<p>Si no ha sido usted quien ha solicitado esta acción, le recomendamos ponerse en contacto con nosotros.</p>'
				});
				return res.status(200).send(mailinfo);
			} catch(err) {
				next(err);
			}
		}
	} catch(err) {
		next(err);
	}
		
});

router.post("/reset/password/:token", async (req, res, next) => {
	passport.authenticate("reset", {session: false, badRequestMessage: "Faltan datos por rellenar"}, async (err, user, info) => {
		try {
			if(err) {
				next(err);
			}
			else if(!user) {
				if(info.name === "TokenExpiredError")
					info.message = "El link para cambiar su contraseña ha caducado. Solicite uno nuevo."
				const error = new Error(info.message);
				next(error);
			}
			else {
				user.passwordUsuario = req.body.newpassword;
				const savedUser = await user.save();
				return res.json(savedUser);
			}
		} catch(err) {
			next(err);
		}
	})(req, res, next);
});

module.exports = router;