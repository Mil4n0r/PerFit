const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const WorkoutSchema = mongoose.Schema({
	ejercicioEntrenamiento: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Ejercicio" 
	},
	numSeries: { 
		type: Number,
		required: true, 
		min: [0, "El número de repeticiones introducido debe ser mayor que 0"],
	},
	numRepeticiones: [{ 
		type: Number, 
		required: true,
		min: [0, "El número de repeticiones introducido debe ser positivo"],
	}],
	pesosUtilizados: [{ 
		type: Number, 
		required: true, 
		min: [0, "El número introducido debe ser positivo"],
	}],
});

WorkoutSchema.plugin(idvalidator);
module.exports = mongoose.model("Trabajo", WorkoutSchema);