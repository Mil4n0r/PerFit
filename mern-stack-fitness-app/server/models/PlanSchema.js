const mongoose = require('mongoose');

//const UserModel = require('./UserSchema');

const options = {
	discriminatorKey: "kind", // El nombre de nuestra clave de discriminación
};

const PlanSchema = mongoose.Schema({
	nombrePlan: { type: String, required: true },
	usuarioPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario"}
}, options);
/*
PlanSchema.post('save', async function() {
	await UserModel.findByIdAndUpdate(this.usuarioPlan, { $push: { planesUsuario: mongoose.Types.ObjectId(this._id) } }, {useFindAndModify: false} );
});
*/
module.exports = mongoose.model("Plan", PlanSchema);