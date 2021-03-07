const mongoose = require('mongoose');

const Plan = require('./PlanSchema.js');

const RoutineSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreRutina: { type: String, required: true },
	tiempoRutina: { type: Number, required: true },
	entrenamientosRutina: [{ type: mongoose.Schema.Types.ObjectId, ref: "Entrenamiento" }]
});

//module.exports = mongoose.model("Rutina", RoutineSchema);
module.exports = Plan.discriminator("Rutina", RoutineSchema);