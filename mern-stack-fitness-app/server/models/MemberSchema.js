const mongoose = require('mongoose');

const UserModel = require('./UserSchema');

const options = {
	discriminatorKey: "role", // El nombre de nuestra clave de discriminación
};

const MemberSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	suscripcionMiembro: { type: mongoose.Schema.Types.ObjectId, ref: "Suscripcion"},
	balanceMonedas: { type: Number }
}, options);

module.exports = UserModel.discriminator("Miembro", MemberSchema);