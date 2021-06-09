const mongoose = require('mongoose');

const UserModel = require('./UserSchema');

const options = {
	discriminatorKey: "role", // El nombre de nuestra clave de discriminación
};

const TrainerSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	alumnosEntrenados: [ { type: mongoose.Schema.Types.ObjectId, ref: "Miembro"} ]
}, options);

module.exports = UserModel.discriminator("Entrenador", TrainerSchema);