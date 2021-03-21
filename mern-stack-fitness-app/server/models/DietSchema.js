const mongoose = require('mongoose');

const PlanModel = require('./PlanSchema');

const MealModel = require('./MealSchema');
const RationModel = require('./RationSchema');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const DietSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	objetivoDiario: { 
		calorias: { type: Number, required: true, trim: true},
		carbohidratos: { type: Number, required: true, trim: true },
		proteinas: { type: Number, required: true, trim: true },
		grasas: { type: Number, required: true, trim: true }
	},
	comidasDieta: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comida" }]
}, options);

DietSchema.post('remove', async function() {
	const meals = await MealModel.find({_id: {$in: this.comidasDieta} })
	await RationModel.deleteMany({_id: {$in: meals.map(m => m.racionesComida)} });
	await MealModel.deleteMany({_id: {$in: this.comidasDieta} })
});

//module.exports = mongoose.model("Dieta", DietSchema);
module.exports = PlanModel.discriminator("Dieta", DietSchema);