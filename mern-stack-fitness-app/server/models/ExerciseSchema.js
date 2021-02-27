const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
    nombreEjercicio: { type:String, required: true, trim: true },
    tipoEjercicio: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Ejercicio", ExerciseSchema);