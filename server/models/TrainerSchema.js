const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const UserModel = require('./UserSchema');

const options = {
	discriminatorKey: "role", // El nombre de nuestra clave de discriminación
};

const TrainerSchema = mongoose.Schema({
	// _id se incluye por defecto (Clave primaria)
	alumnosEntrenados: [ { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "Usuario"
	} ]
}, options);

TrainerSchema.pre('deleteOne',{document:true, query: true}, async function() {
	const clients = await UserModel.find({_id: {$in: this.alumnosEntrenados}})
	clients.forEach(async (client) => {
		client.tieneEntrenador = false;
		await client.save();
	})
});

TrainerSchema.plugin(idvalidator);
module.exports = UserModel.discriminator("Entrenador", TrainerSchema);