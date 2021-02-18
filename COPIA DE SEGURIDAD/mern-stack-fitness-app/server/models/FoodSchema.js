const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
    nombreAlimento: { type:String, required: true, trim: true },
    tamRacion: { type: Number, required: true, trim: true },
    unidadesRacion: { type: String, required: true, trim: true },
    nutrientesRacion: { 
        calorias: { type: Number, required: true, trim: true},
        carbohidratos: { type: Number, required: true, trim: true },
        proteinas: { type: Number, required: true, trim: true },
        grasas: { type: Number, required: true, trim: true }
    }
});

module.exports = mongoose.model("Alimento", FoodSchema);