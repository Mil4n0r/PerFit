const mongoose = require('mongoose');

const MeasureSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	valorMedida: { 
		type: Number, 
		required: true, 
		min: [0, "El número introducido debe ser positivo"],
	},
	fechaMedida: { 
		type: Date, 
		required: true
	},
	//fotoMedida: { type: String, trim: true }
});

module.exports = mongoose.model("Medida", MeasureSchema);