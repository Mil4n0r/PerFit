const mongoose = require('mongoose');

const PlanModel = require('./PlanSchema');
const idvalidator = require('mongoose-id-validator');

const MeasureModel = require('./MeasureSchema');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const TrackingSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	valorObjetivo: { 
		type: Number, 
		required: true, 
		min: [0, "El número introducido debe ser positivo"],
	},
	unidadObjetivo: { 
		type: String, 
		required: true, 
		trim: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para la unidad de medida"
		},   
	},
	medidasSeguidas: [{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: "Medida",
	}]
}, options);

TrackingSchema.pre('deleteOne',{document:true, query: true}, async (data) => {
	await MeasureModel.deleteMany({_id: {$in: data.medidasSeguidas} });
});

TrackingSchema.pre('findOneAndDelete', async (data) => {
	await MeasureModel.deleteMany({_id: {$in: data.medidasSeguidas} });
});

TrackingSchema.pre('deleteMany', async function() {
	const condition = this._conditions;
	const deletedTrackings = await Tracking.find(condition);
	const measuresToDelete = deletedTrackings.map(m => m.medidasSeguidas);
	await MeasureModel.deleteMany({_id: {$in: measuresToDelete} });
});

TrackingSchema.plugin(idvalidator);
const Tracking = PlanModel.discriminator("Seguimiento", TrackingSchema);
module.exports = Tracking;