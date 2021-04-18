const mongoose = require('mongoose');

const UserModel = require('./UserSchema');

const options = {
	discriminatorKey: "rol", // El nombre de nuestra clave de discriminación
};

const MonitorSchema = mongoose.Schema({
    // _id se incluye por defecto (Clave primaria)
    especialidadesMonitor: [{ 
		type: String,
		enum: ['bicicletas', 'peso libre', 'piscina', 'esterillas', 'cintas de correr']
	}],
}, options);

module.exports = UserModel.discriminator("Monitor", MonitorSchema);