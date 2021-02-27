const mongoose = require('mongoose');

const TrainingSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
    entrenamientoDia: [{ 
        ejercicioDia: { type: mongoose.Schema.Types.ObjectId, ref: "Ejercicio" },
        numSeries: { type: Number, required: true, trim: true },
        numRepeticiones: [{ type: Number, required: true, trim: true }],
        pesosUtilizados: [{ type: Number, required: true, trim: true }],
        diaComida: { type: Date, required: true, trim: true },
    }]
});

module.exports = mongoose.model("Entrenamiento", TrainingSchema);