const mongoose = require('mongoose');

const DietSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombre: { type:String, required: true }
});

module.exports = mongoose.model("Dieta", DietSchema);