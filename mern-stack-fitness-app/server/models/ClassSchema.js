const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    // _id se incluye por defecto (Clave primaria)
    diaClase: { type: Date, required: true, trim: true },
    monitorClase: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario"}, // Cambiar por Monitor cuando lo tengamos
    asistentesClase: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario"}],
    actividadClase: { type: mongoose.Schema.Types.ObjectId, ref: "Actividad"},
    salaClase: { type: mongoose.Schema.Types.ObjectId, ref: "Sala"}
});


module.exports = mongoose.model("Clase", ClassSchema);