const mongoose = require('mongoose');

const TrainingSchema = mongoose.Schema({
	diaEntrenamiento: { type: Date, required: true, trim: true },
	trabajoEntrenamiento: 
	[{
		ejercicioEntrenamiento: { type: mongoose.Schema.Types.ObjectId, ref: "Ejercicio" },
		numSeries: { type: Number, required: true, trim: true },
		numRepeticiones: [{ type: Number, required: true, trim: true }],
		pesosUtilizados: [{ type: Number, required: true, trim: true }],
	}]
});
/*
const RoutineSchema = mongoose.Schema({
		// _id se incluye por defecto (Clave primaria)
		nombreRutina: { type: String, required: true },
		tiempoRutina: { type: Number, required: true },
		entrenamientosRutina: { type: mongoose.Schema.Types.ObjectId, ref: "Entrenamiento"}
	});
*/
module.exports = mongoose.model("Entrenamiento", TrainingSchema);