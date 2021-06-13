const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const ClassSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	diaClase: { 
		type: Date, 
		required: true, 
	},
	monitorClase: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Monitor",
		required: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre a la actividad"
		},
	},
	asistentesClase: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Usuario"
	}],
	actividadClase: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Actividad",
		required: true
	},
	salaClase: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Sala",
		required: true
	}
});

ClassSchema.plugin(idvalidator);

module.exports = mongoose.model("Clase", ClassSchema);