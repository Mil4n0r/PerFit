const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreSala: { type: String, required: true, trim: true },
	equipamientoSala: [{ 
		type: String,
		enum: ['Bicicletas', 'Peso libre', 'Piscina', 'Esterillas', 'Cintas de correr']
	}],
	aforoSala: { type: Number, required: true }
});

module.exports = mongoose.model("Sala", RoomSchema);