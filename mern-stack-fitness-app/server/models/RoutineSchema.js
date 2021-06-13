const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const PlanModel = require('./PlanSchema');

const TrainingModel = require('./TrainingSchema');
const WorkoutModel = require('./WorkoutSchema');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const RoutineSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	tiempoRutina: { 
		type: Number, 
		required: true,
		min: [30, "El número introducido debe ser igual o superior a 30"]
	},
	entrenamientosRutina: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Entrenamiento" 
	}]
}, options);

RoutineSchema.post('remove', async function() {
	const trainings = await TrainingModel.find({_id: {$in: this.entrenamientosRutina} })
	await WorkoutModel.deleteMany({_id: {$in: trainings.map(t => t.trabajoEntrenamiento)} });
	await TrainingModel.deleteMany({_id: {$in: this.entrenamientosRutina} })
});

RoutineSchema.plugin(idvalidator);
module.exports = PlanModel.discriminator("Rutina", RoutineSchema);