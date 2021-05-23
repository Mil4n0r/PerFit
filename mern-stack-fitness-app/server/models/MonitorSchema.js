const mongoose = require('mongoose');

const UserModel = require('./UserSchema');

const options = {
	discriminatorKey: "role", // El nombre de nuestra clave de discriminación
};

const MonitorSchema = mongoose.Schema({
    // _id se incluye por defecto (Clave primaria)
    especialidadesMonitor: [{ 
		type: String,
		enum: ['Bicicletas', 'Peso libre', 'Piscina', 'Esterillas', 'Cintas de correr']
	}]
}, options);

module.exports = UserModel.discriminator("Monitor", MonitorSchema);