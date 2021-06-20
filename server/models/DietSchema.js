const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const PlanModel = require('./PlanSchema');

const MealModel = require('./MealSchema');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const DietSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	objetivoDiario: { 
		calorias: {
			type: Number,
			required: true,
			min: [0, "El número introducido debe ser positivo"],
			validate: {
				validator: function(v) {
					return v === this.objetivoDiario.carbohidratos * 4 + this.objetivoDiario.proteinas * 4 + this.objetivoDiario.grasas * 9;
				},
				message: "Las calorías no se corresponden con los macronutrientes introducidos (Kcal = 4 ⋅ g carbohidratos + 4 ⋅ g proteinas + 9 ⋅ g grasas)"
			},
		},
		carbohidratos: {
			type: Number, 
			required: true, 
			min: [0, "El número introducido debe ser positivo"]
		},
		proteinas: { 
			type: Number, 
			required: true, 
			min: [0, "El número introducido debe ser positivo"]
		},
		grasas: { 
			type: Number, 
			required: true, 
			min: [0, "El número introducido debe ser positivo"]
		}
	},
	comidasDieta: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Comida" 
	}]
}, options);

DietSchema.pre('findOneAndDelete', async (data) => {
	await MealModel.deleteMany({_id: {$in: data.comidasDieta} })
});

DietSchema.pre('deleteOne',{document:true, query: true}, async (data) => {
	await MealModel.deleteMany({_id: {$in: data.comidasDieta} })
});

DietSchema.pre('deleteMany', async function() {
	const condition = this._conditions;
	const deletedDiets = await Diet.find(condition);
	const mealsToDelete = deletedDiets.map(d => d.comidasDieta);
	await MealModel.deleteMany({_id: {$in: mealsToDelete} });
});

DietSchema.plugin(idvalidator);
const Diet = PlanModel.discriminator("Dieta", DietSchema);
module.exports = Diet;