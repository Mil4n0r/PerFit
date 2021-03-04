const mongoose = require('mongoose');

const MealSchema = mongoose.Schema({
    // _id se incluye por defecto (Clave primaria)
    nombreComida: { type: String, required: true, trim: true },
    alimentosComida: [{ 
        alimentoComida: { type: mongoose.Schema.Types.ObjectId, ref: "Alimento" },
        numRaciones: { type: Number, required: true, trim: true },
    }]
});

module.exports = mongoose.model("Comida", FoodSchema);