const mongoose = require('mongoose');

const MeasureSchema = mongoose.Schema({
    // _id se incluye por defecto (Clave primaria)
    valorMedida: { type: Number, required: true, trim: true },
    fechaMedida: { type: Date, required: true, trim: true },
    //fotoMedida: { type: String, trim: true }
});

module.exports = mongoose.model("Medida", MeasureSchema);