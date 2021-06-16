const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const PlanSchema = mongoose.Schema({
	nombrePlan: {
		type: String, 
		required: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre al plan"
		},
	},
	usuarioPlan: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: "Usuario",
		required: true
	}
}, options);

PlanSchema.plugin(idvalidator);

module.exports = mongoose.model("Plan", PlanSchema);