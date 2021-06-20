const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const FoodSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreAlimento: { 
		type:String, 
		required: true, 
		trim: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre al alimento"
		},
	},
	tamRacion: { 
		type: Number, 
		required: true, 
		min: [0, "El número introducido debe ser positivo"],
	},
	nutrientesRacion: { 
		calorias: { 
			type: Number, 
			required: true, 
			min: [0, "El número introducido debe ser positivo"],
			validate: {
				validator: function(v) {
					return v >= this.nutrientesRacion.carbohidratos * 4 + this.nutrientesRacion.proteinas * 4 + this.nutrientesRacion.grasas * 9;
				},
				message: "Las calorías no se corresponden con los macronutrientes introducidos"
			},
		},
		carbohidratos: { 
			type: Number, 
			required: true, 
			min: [0, "El número introducido debe ser positivo"],
		},
		proteinas: { 
			type: Number, 
			required: true, 
			min: [0, "El número introducido debe ser positivo"], 
		},
		grasas: { 
			type: Number, 
			required: true, 
			min: [0, "El número introducido debe ser positivo"],
		}
	},
	creadoPor: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Usuario",
		required: true, 
	}
});

FoodSchema.plugin(idvalidator);
module.exports = mongoose.model("Alimento", FoodSchema);