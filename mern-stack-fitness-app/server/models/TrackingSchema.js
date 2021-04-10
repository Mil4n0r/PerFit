const mongoose = require('mongoose');

const PlanModel = require('./PlanSchema');

const MeasureModel = require('./MeasureSchema');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const TrackingSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
    valorObjetivo: {  type: Number, required: true, trim: true },
    medidasSeguidas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medida" }]
}, options);

TrackingSchema.post('remove', async function() {
    await MeasureModel.deleteMany({_id: {$in: this.medidasSeguidas} }).exec();
});

//module.exports = mongoose.model("Dieta", DietSchema);
module.exports = PlanModel.discriminator("Seguimiento", TrackingSchema);