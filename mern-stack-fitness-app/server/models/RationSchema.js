const mongoose = require('mongoose');

const RationSchema = mongoose.Schema({
	alimentoComida: { type: mongoose.Schema.Types.ObjectId, ref: "Alimento" },
	numRaciones: { type: Number, required: true, trim: true },
});

module.exports = mongoose.model("Ración", RationSchema);