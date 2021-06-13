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

TrainingSchema.post('remove', async function() {
	await WorkoutModel.deleteMany({_id: {$in: this.trabajoEntrenamiento} }).exec();
});

TrainingSchema.plugin(idvalidator);
module.exports = mongoose.model("Entrenamiento", TrainingSchema);