const mongoose = require('mongoose');

const PlanModel = require('./PlanSchema');

const TrainingModel = require('./TrainingSchema');
const WorkoutModel = require('./WorkoutSchema');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const RoutineSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreRutina: { type: String, required: true },
	tiempoRutina: { type: Number, required: true },
	entrenamientosRutina: [{ type: mongoose.Schema.Types.ObjectId, ref: "Entrenamiento" }]
}, options);

RoutineSchema.post('save', async function() {
	console.log("PRUEBA");
});

RoutineSchema.post('remove', async function() {
	const trainings = await TrainingModel.find({_id: {$in: this.entrenamientosRutina} })
	await WorkoutModel.deleteMany({_id: {$in: trainings.map(t => t.trabajoEntrenamiento)} });
	await TrainingModel.deleteMany({_id: {$in: this.entrenamientosRutina} })
});

//module.exports = mongoose.model("Rutina", RoutineSchema);
module.exports = PlanModel.discriminator("Rutina", RoutineSchema);