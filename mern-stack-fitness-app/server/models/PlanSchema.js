const mongoose = require('mongoose');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const PlanSchema = mongoose.Schema({
	nombrePlan: { type: String, required: true },
	usuarioPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario"}
}, options);

module.exports = mongoose.model("Plan", PlanSchema);