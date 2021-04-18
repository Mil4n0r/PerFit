const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
    nombreSuscripcion: { type: String, required: true },
    descripcionSuscripcion: { type: String, required: true },
    costeSuscripcion: { type: Number, required: true },
    vencimientoSuscripcion: { type: Date, required: true, trim: true }
}, options);

module.exports = mongoose.model("Suscripción", SubscriptionSchema);