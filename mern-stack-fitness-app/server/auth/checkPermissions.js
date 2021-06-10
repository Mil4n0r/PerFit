const UserModel = require('../models/UserSchema');
const FoodModel = require('../models/FoodSchema');
const ExerciseModel = require('../models/ExerciseSchema');
const ActivityModel = require('../models/ActivitySchema');
const MeasureModel = require('../models/MeasureSchema');
const TrackingModel = require('../models/TrackingSchema');
const RoomModel = require('../models/RoomSchema');
const ClassModel = require('../models/ClassSchema');
const SubscriptionModel = require('../models/SubscriptionSchema');

const checkPermissionsUser = async (activeUser, req) => {
	const id = req.params.id;
	const checkedUser = await UserModel.findById(id);

	var error;
	var user;
	var permission;

	if(!checkedUser) {
		error = {
			code: 404, message: "Usuario no encontrado"
		};
		user = false;
		permission = [];
		/*
		return {
			error: {
				code: 404, message: "Usuario no encontrado"
			},
			user: false,
			permission: []
		};
		*/
	}
	else {
		if(checkedUser._id.equals(activeUser._id)) {
			error = null;
			user = checkedUser;
			permission = ["read", "write", "checkplans", "managefriends"];
			/*
			return {
				error: null,
				user: checkedUser,
				permission: ["read", "write", "checkplans", "managefriends"]
			};
			*/
		}
		else if(activeUser.role === "Administrador") {
			if(!checkedUser.cuentaActivada) {
				error = null;
				user = checkedUser;
				permission = ["read", "write", "delete", "checkplans", "allowfriends", "activateaccount"];
				/*
				return {
					error: null,
					user: checkedUser,
					permission: ["read", "write", "delete", "checkplans", "allowfriends", "activateaccount"]
				};
				*/
			}
			else {
				error = null;
				user = checkedUser;
				permission = ["read", "write", "delete", "checkplans", "allowfriends"];
				/*
				return {
					error: null,
					user: checkedUser,
					permission: ["read", "write", "delete", "checkplans", "allowfriends"]
				};
				*/
			}
		}
		else if(activeUser.role === "Entrenador") {
			if(activeUser.alumnosEntrenados.includes(checkedUser._id)) {
				error = null;
				user = checkedUser;
				permission = ["read", "checkplans", "allowfriends"];
				/*
				return {
					error: null,
					user: checkedUser,
					permission: ["read", "checkplans", "allowfriends"]
				};
				*/
			}
			else {
				error = null;
				user = checkedUser;
				permission = ["read", "allowfriends"];
				/*
				return {
					error: null,
					user: checkedUser,
					permission: ["read", "allowfriends"]
				};
				*/
			}
		}
		else if(checkedUser.privacidadUsuario === "Público") {
			error = null;
			user = checkedUser;
			permission = ["read"];
			/*
			return {
				error: null,
				user: checkedUser,
				permission: ["read"]
			};
			*/
		}
		else if(checkedUser.privacidadUsuario === "Sólo amigos") {
			if(activeUser.amigosUsuario.includes(checkedUser._id)) {
				error = null;
				user = checkedUser;
				permission = ["read"];
				/*
				return {
					error: null,
					user: checkedUser,
					permission: ["read"]
				};
				*/
			}
			else {
				error = null;
				user = checkedUser;
				permission = ["allowfriends"];
				/*
				return {
					error: null,
					user: checkedUser,
					permission: ["allowfriends"]
				};
				*/
			}
		}
		else {
			error = {
				code: 401,
				message: "Usuario no autorizado"
			};
			user = checkedUser;
			permission = [];
			/*
			return {
				error: {
					code: 401,
					message: "Usuario no autorizado"
				},
				user: false,
				permission: []
			}
			*/
		}
		if(checkedUser.role === "Entrenador" && !checkedUser.tieneEntrenador) {// && activeUser.suscripcionUsuario.permisosSuscripcion.includes("Entrenador Personal"))) 
			permission.push("allowtraining");
		}
	}
	return {
		error: error,
		user: user,
		permission: permission
	}
};

const checkPermissionsFood = async (activeUser, req) => {
	const id = req.params.id;
	const checkedFood = await FoodModel.findById(id);
	if(!checkedFood) {
		return {
			error: {
				code: 404, message: "Alimento no encontrado"
			},
			food: false,
			permission: []
		};
	}
	else {
		if(checkedFood.creadoPor.equals(activeUser._id) || activeUser.role === "Administrador") { 
			return {
				error: null,
				food: checkedFood,
				permission: ["read", "write", "delete"]
			};
		}
		else {
			return {
				error: null,
				food: checkedFood,
				permission: ["read"]
			};
		}
	}
};

const checkPermissionsExercise = async (activeUser, req) => {
	const id = req.params.id;
	const checkedExercise = await ExerciseModel.findById(id);
	if(!checkedExercise) {
		return {
			error: {
				code: 404, message: "Ejercicio no encontrado"
			},
			exercise: false,
			permission: []
		};
	}
	else {
		if(checkedExercise.creadoPor.equals(activeUser._id) || activeUser.role === "Administrador") { 
			return {
				error: null,
				exercise: checkedExercise,
				permission: ["read", "write", "delete"]
			};
		}
		else {
			return {
				error: null,
				exercise: checkedExercise,
				permission: ["read"]
			};
		}
	}
};

const checkPermissionsActivity = async (activeUser, req) => {
	const id = req.params.id;
	const checkedActivity = await ActivityModel.findById(id);
	if(!checkedActivity) {
		return {
			error: {
				code: 404, message: "Actividad no encontrada"
			},
			activity: false,
			permission: []
		};
	}
	else {
		if(activeUser.role === "Administrador") {
			return {
				error: null,
				activity: checkedActivity,
				permission: ["read", "write", "delete"]
			};
		}
		else {
			return {
				error: null,
				activity: checkedActivity,
				permission: ["read"]
			};
		}
	}
};

const checkPermissionsRoom = async (activeUser, req) => {
	const id = req.params.id;
	const checkedRoom = await RoomModel.findById(id);
	if(!checkedRoom) {
		return {
			error: {
				code: 404, message: "Sala no encontrada"
			},
			room: false,
			permission: []
		};
	}
	else {
		if(activeUser.role === "Administrador") {
			return {
				error: null,
				room: checkedRoom,
				permission: ["read", "write", "delete"]
			};
		}
		else {
			return {
				error: null,
				room: checkedRoom,
				permission: ["read"]
			};
		}
	}
};

const checkPermissionsMeasure = async (activeUser, req) => {
	const id = req.params.id;
	const checkedMeasure = await MeasureModel.findById(id);
	if(!checkedMeasure) {
		return {
			error: {
				code: 404, message: "Medida no encontrada"
			},
			user: false,
			permission: []
		};
	}
	else {
		const userTrackings = await TrackingModel.find({usuarioPlan: activeUser._id}).exec();
		var included = false;
		userTrackings.map((tracking) => {
			if(tracking.medidasSeguidas.includes(id)) {
				included = true;
			}
		})
		if(included) {
			return {
				error: null,
				measure: checkedMeasure,
				permission: ["read", "write", "delete"]
			}
		}
		else {
			return {
				error: {
					code: 401,
					message: "Usuario no autorizado"
				},
				measure: false,
				permission: []
			}
		}
	}
};

const checkPermissionsClass = async (activeUser, req) => {
	const id = req.params.id;
	const checkedClass = 
		await ClassModel.findById(id).populate("monitorClase")
			.populate("asistentesClase")
			.populate("actividadClase")
			.populate("salaClase");
	if(!checkedClass) {
		return {
			error: {
				code: 404, message: "Clase no encontrada"
			},
			class: false,
			permission: []
		};
	}
	else {
		//if(activeUser.rolUsuario === "admin") {
		if(activeUser.role === "Administrador") {
			return {
				error: null,
				class: checkedClass,
				permission: ["read", "write", "delete", "join", "leave"] // QUITAR JOIN Y LEAVE
			};
		}
		else if(activeUser)//.suscripcionUsuario.permisosSuscripcion.includes("Clases Dirigidas")) { // AÑADIR SUSCRIPCIONES
		{
			if(checkedClass.asistentesClase.includes(activeUser._id)) {
				return {
					error: null,
					class: checkedClass,
					permission: ["read", "leave"]
				}
			}
			else {
				return {
					error: null,
					class: checkedClass,
					permission: ["read", "join"]
				}
			}
		}
		else {
			return {
				error: {
					code: 401,
					message: "Usuario no autorizado"
				},
				class: false,
				permission: []
			}
		}
	}
};

const checkPermissionsSubscription = async (activeUser, req) => {
	const id = req.params.id;
	const checkedSubscription = await SubscriptionModel.findById(id);
	if(!checkedSubscription) {
		return {
			error: {
				code: 404, message: "Sala no encontrada"
			},
			subscription: false,
			permission: []
		};
	}
	else {
		if(activeUser.role === "Administrador") {
			return {
				error: null,
				subscription: checkedSubscription,
				permission: ["read", "write", "delete"]
			};
		}
		else {
			return {
				error: null,
				subscription: checkedSubscription,
				permission: ["read"]
			};
		}
	}
};

module.exports = {
	checkPermissionsUser,
	checkPermissionsFood,
	checkPermissionsExercise,
	checkPermissionsActivity,
	checkPermissionsMeasure,
	checkPermissionsRoom,
	checkPermissionsClass,
	checkPermissionsSubscription
}
