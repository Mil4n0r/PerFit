const mongoose = require('mongoose');

const UserModel = require('./UserSchema');

const options = {
	discriminatorKey: "rol", // El nombre de nuestra clave de discriminación
};

const AdminSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
}, options);

module.exports = UserModel.discriminator("Administrador", AdminSchema);