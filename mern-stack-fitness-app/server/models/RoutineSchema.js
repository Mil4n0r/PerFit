const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const PlanModel = require('./PlanSchema');

const TrainingModel = require('./TrainingSchema');

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

RoutineSchema.pre('findOneAndDelete', async (data) => {
	await TrainingModel.deleteMany({_id: {$in: data.entrenamientosRutina} })
});

RoutineSchema.pre('deleteOne',{document:true, query: true}, async (data) => {
	await TrainingModel.deleteMany({_id: {$in: data.entrenamientosRutina} })
});

RoutineSchema.pre('deleteMany', async function() {
	const condition = this._conditions;
	const deletedRoutines = await Routine.find(condition);
	const trainingsToDelete = deletedRoutines.map(d => d.entrenamientosRutina);
	await TrainingModel.deleteMany({_id: {$in: trainingsToDelete} });
});

RoutineSchema.plugin(idvalidator);
const Routine = PlanModel.discriminator("Rutina", RoutineSchema);
module.exports = Routine;