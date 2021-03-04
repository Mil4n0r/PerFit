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
const TrainingSchema = mongoose.Schema({
	nombreEntrenamiento: { type: String, required: true, trim: true },
	trabajoEntrenamiento: 
	[{
		ejercicioEntrenamiento: { type: mongoose.Schema.Types.ObjectId, ref: "Ejercicio" },
		numSeries: { type: Number, required: true, trim: true },
		numRepeticiones: [{ type: Number, required: true, trim: true }],
		pesosUtilizados: [{ type: Number, required: true, trim: true }],
	}]
});
*/
module.exports = mongoose.model("Entrenamiento", TrainingSchema);