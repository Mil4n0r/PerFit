const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreActividad: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre a la actividad"
		},
		required: true
	},
	equipamientoActividad: [{ 
		type: String,
		enum: ['Bicicletas', 'Peso libre', 'Piscina', 'Esterillas', 'Cintas de correr']
	}],
	descripcionActividad: {
		type: String,
		required: true,
		trim: true 
	}
});

module.exports = mongoose.model("Actividad", ActivitySchema);