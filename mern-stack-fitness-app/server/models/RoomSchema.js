const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreSala: { 
		type: String, 
		required: true, 
		trim: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre a la sala"
		}, 
	},
	equipamientoSala: [{ 
		type: String,
		enum: ['Bicicletas', 'Peso libre', 'Piscina', 'Esterillas', 'Cintas de correr']
	}],
	aforoSala: { 
		type: Number, 
		required: true,
		min: [1, "El número introducido debe ser superior a 0"],
	}
});

module.exports = mongoose.model("Sala", RoomSchema);