const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
	ejercicioEntrenamiento: { type: mongoose.Schema.Types.ObjectId, ref: "Ejercicio" },
	numSeries: { type: Number, required: true, trim: true },
	numRepeticiones: [{ type: Number, required: true, trim: true }],
	pesosUtilizados: [{ type: Number, required: true, trim: true }],
});

module.exports = mongoose.model("Trabajo", WorkoutSchema);