const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const UserModel = require('./UserSchema');
const SubscriptionModel = require('./SubscriptionSchema');

const options = {
	discriminatorKey: "role", // El nombre de nuestra clave de discriminación
};

const MemberSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	suscripcionMiembro: {
		planSuscripcion: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: "Suscripción"
		},
		fechaVencimiento: { 
			type: Date, 
			required: true
		}
	},
	balanceMonedas: { 
		type: Number,
		required: true,
		min: [0, "El número de monedas introducido debe ser mayor que 0"], 
	}
}, options);

MemberSchema.plugin(idvalidator);
module.exports = UserModel.discriminator("Miembro", MemberSchema);