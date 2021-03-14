const mongoose = require('mongoose');

const PlanModel = require('./PlanSchema');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const DietSchema = mongoose.Schema({
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
}, options);

DietSchema.pre('remove', function(next) {
	// PROXIMAMENTE
    //MealModel.remove({client_id: this.diarioDieta._id}).exec();
    //next();
});

//module.exports = mongoose.model("Dieta", DietSchema);
module.exports = PlanModel.discriminator("Dieta", DietSchema);