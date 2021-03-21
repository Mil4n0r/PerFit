const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
    nombreActividad: { type: String, required: true, trim: true },
    equipamientoActividad: [{ 
		type: String,
		enum: ['bicicletas', 'peso libre', 'piscina', 'esterillas', 'cintas de correr']
	}],
    descripcionActividad: { type: String, required: true, trim: true }
});

module.exports = mongoose.model("Actividad", ActivitySchema);