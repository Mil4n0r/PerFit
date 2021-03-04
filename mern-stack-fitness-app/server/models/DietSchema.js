const mongoose = require('mongoose');

const Plan = require('./PlanSchema.js') 

const DietSchema = Plan.discriminator("Diet", 
	new mongoose.Schema({
		// _id se incluye por defecto (Clave primaria)
		nombreDieta: { type: String, required: true },
		objetivoDiario: { 
			calorias: { type: Number, required: true, trim: true},
			carbohidratos: { type: Number, required: true, trim: true },
			proteinas: { type: Number, required: true, trim: true },
			grasas: { type: Number, required: true, trim: true }
		},
		diarioDieta: [{
			comida: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comida"}],
			diaComida: { type: Date, required: true, trim: true },
		}]
			
	})
);

module.exports = mongoose.model("Dieta", DietSchema);