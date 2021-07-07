const mongoose = require('mongoose');
const mongooseTypePhone = require('mongoose-type-phone');
const idvalidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const options = {
	discriminatorKey: "role", // El nombre de nuestra clave de discriminación
	timestamps: true
};

const TrackingModel = require('./TrackingSchema');
const RoutineModel = require('./RoutineSchema');
const DietModel = require('./DietSchema');
const RequestModel = require('./RequestSchema');
const ClassModel = require('./ClassSchema');

const UserSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	emailUsuario: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		uniqueCaseInsensitive: true,
		validate: {
			validator: function(v) {
				return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
			},
			message: "El email no tiene un formato válido",
		}
	},
	passwordUsuario: { 
		type: String, 
		required: true 
	},
	datosPersonales: {
		nombreUsuario: {
			type: String,
			required: true, 
			trim: true,
			validate: {
				validator: function(v) {
					return /^[a-zA-Z\'\- À-ú]+$/.test(v);
				},
				message: "El nombre debe contener sólo caracteres alfabéticos",
			}
		},
		apellidosUsuario: { 
			type: String, 
			required: true, 
			trim: true,
			validate: {
				validator: function(v) {
					return /^[a-zA-Z\'\- À-ú]+$/.test(v);
				},
				message: "El apellido debe contener sólo caracteres alfabéticos",
			}
		},
		dniUsuario: { 
			type: String, 
			required: true, 
			trim: true,
			validate: [{
				validator: function(v) {
					return /^[a-zA-Z\'\- À-ú]+$/.test(v);
				},
				message: "El apellido debe contener sólo caracteres alfabéticos",
				validator: function(val) {
					const number = val.substr(0,val.length-1) % 23;
					const letter = val.substr(val.length-1,1);
					const checkletter = 'TRWAGMYFPDXBNJZSQVHLCKET'.substring(number,number+1);
					return (checkletter === letter.toUpperCase())
				},
				message: "El nombre de usuario debe ocupar entre 3 y 16 caracteres"
			}]
		},
		direccionUsuario: { 
			type: String, 
			trim: true,
			validate: [{
				validator: function(v) {
					return /^[a-zA-Z\'\/\-\.\, À-ú\º0-9]+$/.test(v);
				},
				message: "La dirección no tiene un formato válido",
				validator: function(v) {
					return /^.{4,80}$/.test(v);
				},
				message: "La dirección debe tener entre 4 y 80 caracteres"
			}]
		},
		telefonoUsuario: { 
			type: mongoose.SchemaTypes.Phone, 
			required: true,
			allowedNumberTypes: [mongooseTypePhone.PhoneNumberType.MOBILE, mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE],
			phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL,
			defaultRegion: 'ES',
		},
		fechaNacUsuario: { 
			type: Date, 
			required: true 
		}		
	},
	privacidadUsuario: { 
		type: String,
		default: 'Público',
		enum: ['Público', 'Sólo amigos', 'Privado'],
		required: true
	},
	
	aliasUsuario: { 
		type: String, 
		required: true, 
		trim: true,
		unique: true, 
		validate: [{
			validator: function(v) {
				return /^([a-zA-Z0-9\-\_\.]+)$/.test(v);
			},
			message: "El nombre de usuario debe constar únicamente de caracteres alfanuméricos, guiones (-), guiones bajos (_) y puntos (.)",
			validator: function(v) {
				return /^.{3,16}$/.test(v);
			},
			message: "El nombre de usuario debe ocupar entre 3 y 16 caracteres"
		}],  
	},

	amigosUsuario: [ { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Usuario"
	} ],
	peticionesPendientes: [ { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Solicitud"
	} ],

	cuentaActivada: { 
		type: Boolean, 
		required: true 
	},

	tieneEntrenador: { 
		type: Boolean, 
		required: true 
	}

	/*
	// Componentes de seguridad
	loginAttempts: { type: Number, required: true, default: 0 },
	lockUntil: { type: Number }
	*/
	// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-2
}, options);

// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

UserSchema.pre('save', async function(next) {
	const user = this;
	
	// Sólo se aplica la función hash si la contraseña está siendo cambiada (o introducida por primera vez)
	if (!user.isModified('passwordUsuario')) 
		return next();

	// Genera una sal (cadena aleatoria que modificará el resultado de la función hash para que no sea predecible)
	
	const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

	// Se aplica la función hash sobre nuestro password usando la sal anterior
	const hash = await bcrypt.hash(user.passwordUsuario, salt);

	user.passwordUsuario = hash;
	next();
});

UserSchema.pre('deleteOne',{document:true, query: true}, async function() {
	await RoutineModel.deleteMany({usuarioPlan: {$in: this._id} });
	await DietModel.deleteMany({usuarioPlan: {$in: this._id} });
	await TrackingModel.deleteMany({usuarioPlan: {$in: this._id} });
	const friends = await User.find({_id: {$in: this.amigosUsuario} });
	friends.forEach(async (friend) => {
		await friend.amigosUsuario.pull(this._id);
		await friend.save();
	});
	if(this.tieneEntrenador) {
		const trainer = await User.find({alumnosEntrenados: {$in: this._id} });
		await trainer.alumnosEntrenados.pull(this._id);
		await trainer.save();
	}
	const requests = await RequestModel.find({usuarioSolicitante: {$in: this._id} });
	requests.forEach(async (request) => {
		const usersWithRequest = await User.find({peticionesPendientes: {$in: [request._id]}});
		usersWithRequest.forEach(async (userWithRequest) => {
			await userWithRequest.peticionesPendientes.pull(request._id)
			await userWithRequest.save();
		});
		await request.deleteOne();
	});
	const classes = await ClassModel.find({asistentesClase: {$in: [this._id]}})
	classes.forEach(async (dclass) => {
		await dclass.asistentesClase.pull(this._id);
		await dclass.save();
	})
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
	return bcrypt.compare(candidatePassword, this.passwordUsuario);
};

UserSchema.plugin(idvalidator);
UserSchema.plugin(uniqueValidator, { message: 'Ya existe un usuario con ese alias'});
const User = mongoose.model("Usuario", UserSchema);
module.exports = User;