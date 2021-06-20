const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const WorkoutModel = require('./WorkoutSchema');

const TrainingSchema = mongoose.Schema({
	nombreEntrenamiento: { 
		type: String, 
		required: true, 
		trim: true, 
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre al entrenamiento"
		}, 
	},
	diaEntrenamiento: { 
		type: Date, 
		required: true, 
	},
	trabajoEntrenamiento: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Trabajo"
	}]
});

TrainingSchema.pre('findOneAndDelete', async (data) => {
	await WorkoutModel.deleteMany({_id: {$in: data.trabajoEntrenamiento} });
});

TrainingSchema.pre('deleteOne',{document:true, query: true}, async (data) => {
	await WorkoutModel.deleteMany({_id: {$in: data.trabajoEntrenamiento} });
});

TrainingSchema.pre('deleteMany', async function() {
	const condition = this._conditions;
	const deletedTrainings = await Training.find(condition);
	const workoutsToDelete = deletedTrainings.map(m => m.trabajoEntrenamiento);
	await WorkoutModel.deleteMany({_id: {$in: workoutsToDelete} });
});

TrainingSchema.plugin(idvalidator);
const Training = mongoose.model("Entrenamiento", TrainingSchema);
module.exports = Training;