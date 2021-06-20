const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
	nombreSuscripcion: { 
		type: String, 
		required: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre a la suscripción"
		},  
	},
	descripcionSuscripcion: { 
		type: String, 
		required: true,
	},
	costeSuscripcion: { 
		type: Number, 
		required: true,
		min: [0, "El número introducido debe ser positivo"],
	},
	costeSuscripcionPCoins: { 
		type: Number, 
		required: true,
		min: [0, "El número introducido debe ser positivo"],
	},
	duracionSuscripcion: {
		type: Number,
		required: true,
		min: [0, "El número introducido debe ser positivo"],
	},
	permisosSuscripcion: [{ 
		type: String,
		enum: ['Clases dirigidas', 'Planes', 'Entrenador personal'],
		required: true
	}]
});

module.exports = mongoose.model("Suscripción", SubscriptionSchema);