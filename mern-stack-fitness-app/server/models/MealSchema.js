const mongoose = require('mongoose');

const MealSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)

    // REFERENCIAR ID ALIMENTO

    numRaciones: { type: Number, required: true, trim: true }
});

module.exports = mongoose.model("Comida", FoodSchema);