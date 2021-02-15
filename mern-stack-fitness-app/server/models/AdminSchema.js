const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombre: { type:String, required: true }
});

module.exports = mongoose.model("Admin", AdminSchema);