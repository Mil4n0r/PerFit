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

MealSchema.post('remove', async function() {
	await RationModel.deleteMany({_id: {$in: this.racionesComida} }).exec();
});

MealSchema.plugin(idvalidator);
module.exports = mongoose.model("Comida", MealSchema);