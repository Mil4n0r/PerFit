const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const options = {
	discriminatorKey: "role", // El nombre de nuestra clave de discriminación
	timestamps: true
};

const PlanModel = require('./PlanSchema');
/*
const RoutineModel = require('./RoutineSchema');
const DietModel = require('./DietSchema');
*/
const UserSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	emailUsuario: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	passwordUsuario: { type: String, required: true },
	
	datosPersonales: { // FALTA VALIDACIÓN DE LOS DATOS (EMAIL, TLFN, FECHA...)
		nombreUsuario: { type: String, required: true, trim: true },
		apellidosUsuario: { type: String, required: true, trim: true },
		dniUsuario: { type: String, required: true, trim: true },
		direccionUsuario: { type: String, trim: true },
		telefonoUsuario: { type: String, trim: true },
		fechaNacUsuario: { type: Date, required: true }		
	},
	privacidadUsuario: { 
		type: String,
		default: 'publico',
		enum: ['publico', 'solo amigos', 'privado']
	},
	
	aliasUsuario: { type: String, required: true, unique: true, trim: true },

	amigosUsuario: [ { type: mongoose.Schema.Types.ObjectId, ref: "Usuario"} ],

	peticionesPendientes: [ 
		{
			usuarioSolicitante: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
			tipoPeticion: { 
				type: String,
				enum: ['Amistad', 'Entrenamiento']
			},
		}
	]
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

UserSchema.post('remove', async function() {
	await PlanModel.deleteMany({usuarioPlan: {$in: this._id} }).exec();
	//await RoutineModel.deleteMany({usuarioPlan: {$in: this._id} }).exec();
	//await DietModel.deleteMany({usuarioPlan: {$in: this._id} }).exec();
	//await TrackingModel.deleteMany({usuarioPlan: {$in: this._id} }).exec();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {	// CB = Callback para recoger los errores
    return bcrypt.compare(candidatePassword, this.passwordUsuario);
};

module.exports = mongoose.model("Usuario", UserSchema);