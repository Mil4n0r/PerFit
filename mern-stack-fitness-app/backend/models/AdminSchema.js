const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	nombre: { type:String, required: true }
});

module.exports = mongoose.model("Admin", AdminSchema);