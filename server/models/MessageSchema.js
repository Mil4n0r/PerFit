const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const MessageSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	emisorMensaje: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Usuario",
		required: true
	},
	receptorMensaje: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Usuario",
		required: true
	},
	asuntoMensaje: {
		type:String, 
		required: true, 
	},
	contenidoMensaje: {
		type:String, 
		required: true, 
	},
	createdAt: { type: Date, expires: '30d', default: Date.now } // Elimina los mensajes cada 30 días (1 mes)
});

MessageSchema.plugin(idvalidator);
module.exports = mongoose.model("Mensaje", MessageSchema);