const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const ExerciseSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreEjercicio: {
		type: String, 
		required: true, 
		trim: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre al ejercicio"
		},
	},
	tipoEjercicio: { 
		type: String, 
		required: true, 
		trim: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre al ejercicio"
		},
	},
	creadoPor: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Usuario",
		required: true
	}
});

ExerciseSchema.plugin(idvalidator);
module.exports = mongoose.model("Ejercicio", ExerciseSchema);