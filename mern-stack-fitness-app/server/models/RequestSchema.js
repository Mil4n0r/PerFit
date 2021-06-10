const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	usuarioSolicitante: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
	tipoPeticion: { 
		type: String,
		enum: ['Amistad', 'Entrenamiento']
	},
});

module.exports = mongoose.model("Solicitud", RequestSchema);