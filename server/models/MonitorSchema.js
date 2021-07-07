const mongoose = require('mongoose');

const UserModel = require('./UserSchema');
const ClassModel = require('./ClassSchema');

const options = {
	discriminatorKey: "role", // El nombre de nuestra clave de discriminación
};

const MonitorSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	especialidadesMonitor: [{ 
		type: String,
		enum: ['Bicicletas', 'Peso libre', 'Piscina', 'Esterillas', 'Cintas de correr'],
		required: true
	}]
}, options);

MonitorSchema.pre('deleteOne',{document:true, query: true}, async function() {
	const classes = await ClassModel.find({monitorClase: {$in: this._id}})
	classes.forEach(async (dclass) => {
		dclass.monitorClase = null;
		await dclass.save();
	})
});

module.exports = UserModel.discriminator("Monitor", MonitorSchema);