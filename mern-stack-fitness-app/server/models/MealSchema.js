const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const RationModel = require('./RationSchema');

const MealSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombreComida: { 
		type: String, 
		required: true, 
		trim: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/.test(v);
			},
			message: "Ha empleado caracteres no válidos para darle nombre a la comida"
		},
	},
	diaComida: {
		type: Date, 
		required: true
	},
	racionesComida: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Ración"
	}]
});

MealSchema.pre('findOneAndDelete', async (data) => {
	await RationModel.deleteMany({_id: {$in: data.racionesComida} });
});

MealSchema.pre('deleteOne',{document:true, query: true}, async (data) => {
	await RationModel.deleteMany({_id: {$in: data.racionesComida} });
});

MealSchema.pre('deleteMany', async function() {
	const condition = this._conditions;
	const deletedMeals = await Meal.find(condition);
	const rationsToDelete = deletedMeals.map(m => m.racionesComida);
	await RationModel.deleteMany({_id: {$in: rationsToDelete} });
});

MealSchema.plugin(idvalidator);
const Meal = mongoose.model("Comida", MealSchema);
module.exports = Meal;