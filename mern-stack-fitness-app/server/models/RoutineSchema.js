const mongoose = require('mongoose');

const Plan = require('./PlanSchema.js');


const RoutineSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreRutina: { type: String, required: true },
	tiempoRutina: { type: Number, required: true },
	entrenamientosRutina: 
	[{
		ejercicioEntrenamiento: { type: mongoose.Schema.Types.ObjectId, ref: "Ejercicio" },
		numSeries: { type: Number, required: true, trim: true },
		numRepeticiones: [{ type: Number, required: true, trim: true }],
		pesosUtilizados: [{ type: Number, required: true, trim: true }],
		diaEntrenamiento: { type: Date, required: true, trim: true },
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
//module.exports = mongoose.model("Rutina", RoutineSchema);
module.exports = Plan.discriminator("Rutina", RoutineSchema);