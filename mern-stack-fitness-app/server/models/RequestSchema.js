const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const RequestSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	usuarioSolicitante: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Usuario",
		required: true
	},
	tipoPeticion: { 
		type: String,
		enum: ['Amistad', 'Entrenamiento'],
		required: true
	},
});

RequestSchema.plugin(idvalidator);
module.exports = mongoose.model("Solicitud", RequestSchema);