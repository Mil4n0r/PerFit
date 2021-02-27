const mongoose = require('mongoose');

const MealSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
    comidaDia: [{ 
        alimentoDia: { type: mongoose.Schema.Types.ObjectId, ref: "Alimento" },
        numRaciones: { type: Number, required: true, trim: true },
        diaComida: { type: Date, required: true, trim: true },
    }]
});

module.exports = mongoose.model("Comida", FoodSchema);