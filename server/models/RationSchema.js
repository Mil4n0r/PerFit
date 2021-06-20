const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const RationSchema = mongoose.Schema({
	alimentoComida: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Alimento",
		required: true
	},
	numRaciones: { 
		type: Number, 
		required: true,
		min: [0, "El número introducido debe ser positivo"],
	},
});


RationSchema.plugin(idvalidator);
module.exports = mongoose.model("Ración", RationSchema);