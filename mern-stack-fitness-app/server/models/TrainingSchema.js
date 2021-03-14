const mongoose = require('mongoose');

const WorkoutModel = require('./WorkoutSchema');

const TrainingSchema = mongoose.Schema({
	nombreEntrenamiento: { type: String, required: true, trim: true },
	diaEntrenamiento: { type: Date, required: true, trim: true },
	
	trabajoEntrenamiento: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trabajo"}]

	/*
	trabajoEntrenamiento: 
	[{
		ejercicioEntrenamiento: { type: mongoose.Schema.Types.ObjectId, ref: "Ejercicio" },
		numSeries: { type: Number, required: true, trim: true },
		numRepeticiones: [{ type: Number, required: true, trim: true }],
		pesosUtilizados: [{ type: Number, required: true, trim: true }],
	}]
	*/
});

TrainingSchema.post('remove', async function() {
	await WorkoutModel.deleteMany({_id: {$in: this.trabajoEntrenamiento} }).exec();
});

module.exports = mongoose.model("Entrenamiento", TrainingSchema);