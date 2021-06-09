const mongoose = require('mongoose');

const RationModel = require('./RationSchema');

const MealSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreComida: { type: String, required: true, trim: true },
	diaComida: { type: Date, required: true, trim: true },
	racionesComida: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ración"}]
});

MealSchema.post('remove', async function() {
	await RationModel.deleteMany({_id: {$in: this.racionesComida} }).exec();
});

module.exports = mongoose.model("Comida", MealSchema);