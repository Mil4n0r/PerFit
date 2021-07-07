const UserModel = require('../models/UserSchema');
const FoodModel = require('../models/FoodSchema');
const ExerciseModel = require('../models/ExerciseSchema');
const ActivityModel = require('../models/ActivitySchema');
const MeasureModel = require('../models/MeasureSchema');
const RoomModel = require('../models/RoomSchema');
const ClassModel = require('../models/ClassSchema');
const SubscriptionModel = require('../models/SubscriptionSchema');
const RequestModel = require('../models/RequestSchema');
const DietModel = require('../models/DietSchema');
const RoutineModel = require('../models/RoutineSchema');
const TrackingModel = require('../models/TrackingSchema');
const MessageModel = require('../models/MessageSchema');

const checkPermissionsUser = async (activeUser, req) => {
	try {
		const id = req.params.id;
		const checkedUser = await UserModel.findById(id, "-passwordUsuario").populate({
			path: "suscripcionMiembro",
			populate: {
				path: "planSuscripcion"
			}
		});
		const pendingRequests = await RequestModel.find(
			{_id: {$in: checkedUser.peticionesPendientes}}
		)	

		const activeSubscription = activeUser.role === "Miembro" && await SubscriptionModel.findById(activeUser.suscripcionMiembro.planSuscripcion);

		var error = null;
		var user = false;
		var permission = [];

		if(checkedUser._id.equals(activeUser._id)) {
			error = null;
			user = checkedUser;
			permission = ["read", "write", "managefriends", "readrequests", "readmessages"];
			if(checkedUser.role !== "Miembro" || (checkedUser.role === "Miembro" && checkedUser.suscripcionMiembro.planSuscripcion.permisosSuscripcion.includes("Planes"))) {
				permission.push("checkplans");
			}
		}
		else {
			if(activeUser.role === "Administrador") {
				if(!checkedUser.cuentaActivada) {
					error = null;
					user = checkedUser;
					permission = ["read", "activateaccount", "delete"];
				}
				else {
					error = null;
					user = checkedUser;
					permission = ["read", "write", "delete", "checkplans", "changesubscription", "readrequests"];
				}
			}
			else if(activeUser.role === "Entrenador") {
				if(activeUser.alumnosEntrenados.includes(checkedUser._id)) {
					error = null;
					user = checkedUser;
					permission = ["read", "checkplans"];
				}
				else {
					error = null;
					user = checkedUser;
					permission = ["read"];
				}
			}
			else if(checkedUser.privacidadUsuario === "Público") {
				error = null;
				user = checkedUser;
				permission = ["read"];
			}
			else if(checkedUser.privacidadUsuario === "Sólo amigos") {
				if(activeUser.amigosUsuario.includes(checkedUser._id)) {
					error = null;
					user = checkedUser;
					permission = ["read"];
				}
			}
			else {
				error = {
					code: 401,
					message: "Usuario no autorizado"
				};
				user = false;
				permission = [];
			}
			if(!activeUser.amigosUsuario.includes(checkedUser._id)) {
				const friendRequests = pendingRequests.filter(
					record => (
						record.usuarioSolicitante.equals(activeUser._id) && 
						record.tipoPeticion === 'Amistad'
					)
				)	
				if(friendRequests.length === 0)
					permission.push("allowfriends");
			}
			else {
				permission.push("allowmessages");
			}
		}

		if(checkedUser.role === "Entrenador" && !activeUser.tieneEntrenador &&
		  !checkedUser._id.equals(activeUser._id) && (activeUser.role !== "Miembro" ||
		  (activeUser.role === "Miembro" && activeSubscription.permisosSuscripcion.includes("Entrenador")))) {
			const trainingRequests = pendingRequests.filter(
				record => (
					record.usuarioSolicitante.equals(activeUser._id) && 
					record.tipoPeticion === 'Entrenamiento'
				)
			)	
			if(trainingRequests.length === 0)
				permission.push("allowtraining");
		}
		return {
			error: error,
			user: user,
			permission: permission
		}
	} catch(err) {
		return {
			error: {
				code: 404, message: "Usuario no encontrado"
			},
			user: false,
			permission: []
		};
	}
};

const checkPermissionsFood = async (activeUser, req) => {
	try {
		const id = req.params.id;
		const checkedFood = await FoodModel.findById(id);
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
	} catch(err) {
		return {
			error: {
				code: 404, message: "Alimento no encontrado"
			},
			food: false,
			permission: []
		};
	}
};

const checkPermissionsExercise = async (activeUser, req) => {
	try {
		const id = req.params.id;
		const checkedExercise = await ExerciseModel.findById(id);
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
	} catch(err) {
		return {
			error: {
				code: 404, message: "Ejercicio no encontrado"
			},
			exercise: false,
			permission: []
		};
	}
};

const checkPermissionsActivity = async (activeUser, req) => {
	try {
		const id = req.params.id;
		const checkedActivity = await ActivityModel.findById(id);
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
	} catch(err) {
		return {
			error: {
				code: 404, message: "Actividad no encontrada"
			},
			activity: false,
			permission: []
		};
	}
};

const checkPermissionsRoom = async (activeUser, req) => {
	try {
		const id = req.params.id;
		const checkedRoom = await RoomModel.findById(id);
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
	} catch(err) {
		return {
			error: {
				code: 404, message: "Sala no encontrada"
			},
			room: false,
			permission: []
		};
	}
};

const checkPermissionsMeasure = async (activeUser, req) => {
	try {
		const id = req.params.id;
		const checkedMeasure = await MeasureModel.findById(id);
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
	} catch(err) {
		return {
			error: {
				code: 404, message: "Medida no encontrada"
			},
			user: false,
			permission: []
		};
	}
	
};

const checkPermissionsClass = async (activeUser, req) => {
	try {
		const id = req.params.id;
		const checkedClass = await ClassModel.findById(id)
			.populate("monitorClase", "aliasUsuario")
			.populate("asistentesClase", "aliasUsuario")
			.populate("actividadClase")
			.populate("salaClase");
		
		const activeSubscription = activeUser.role === "Miembro" && await SubscriptionModel.findById(activeUser.suscripcionMiembro.planSuscripcion);
		
		if(activeUser.role === "Administrador") {
			if(checkedClass && checkedClass.asistentesClase.some(a => a._id.equals(activeUser._id))) {
				return {
					error: null,
					class: checkedClass,
					permission: ["read", "write", "delete", "leave"]
				};
			}
			else {
				return {
					error: null,
					class: checkedClass,
					permission: ["read", "write", "delete", "join"]
				};
			}
		}
		else if(activeUser.role !== "Miembro" || (activeUser.role === "Miembro" && activeSubscription.permisosSuscripcion.includes("Clases dirigidas"))) {
			if(checkedClass.asistentesClase.some(a => a._id.equals(activeUser._id))) {
				return {
					error: null,
					class: checkedClass,
					permission: ["read", "leave"]
				}
			}
			else {
				if(checkedClass.monitorClase._id.equals(activeUser._id)) {
					return {
						error: null,
						class: checkedClass,
						permission: ["read", "checkassistance"]
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
	} catch(err) {
		return {
			error: {
				code: 404, message: "Clase no encontrada"
			},
			class: false,
			permission: []
		};
	}
};

const checkPermissionsSubscription = async (activeUser, req) => {
	try {
		const id = req.params.id;
		const checkedSubscription = await SubscriptionModel.findById(id);
		if(activeUser.role === "Administrador") {
			return {
				error: null,
				subscription: checkedSubscription,
				permission: ["read", "write", "delete"]
			};
		}
		else {
			if(activeUser.role === "Miembro") {
				return {
					error: null,
					subscription: checkedSubscription,
					permission: ["read", "renew"]
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
	} catch(err) {
		return {
			error: {
				code: 404, message: "Suscripción no encontrada"
			},
			subscription: false,
			permission: []
		};
	}
	
};

const checkPermissionsPlan = async (activeUser, kind, req) => {
	try {
		const id = req.params.id;
		var checkedPlan;
		switch(kind) {
			case "Seguimiento":
				checkedPlan = await TrackingModel.findById(id);
				await TrackingModel.populate(checkedPlan, "medidasSeguidas")
				break;
			case "Dieta":
				checkedPlan = await DietModel.findById(id)
				break;
			case "Rutina":
				checkedPlan = await RoutineModel.findById(id)
				break;
		}
		if(activeUser.role === "Administrador" || activeUser._id.equals(checkedPlan.usuarioPlan) ||
		  (activeUser.role === "Entrenador" && activeUser.alumnosEntrenados.includes(checkedPlan.usuarioPlan))) {
			return {
				error: null,
				plan: checkedPlan,
				permission: ["read", "write", "delete"]
			};
		}
		else {
			return {
				error: {
					code: 401,
					message: "Usuario no autorizado"
				},
				plan: false,
				permission: []
			};
		}
	} catch(err) {
		return {
			error: {
				code: 404, message: "Plan no encontrado"
			},
			plan: false,
			permission: []
		};
	}
	
};

const checkPermissionsMessage = async (activeUser, req) => {
	try {
		const id = req.params.id;
		const checkedMessage = await MessageModel.findById(id);
		if(checkedMessage.emisorMensaje.equals(activeUser._id) || checkedMessage.receptorMensaje.equals(activeUser._id)) {
			return {
				error: null,
				message: checkedMessage,
				permission: ["read"]
			};
		}
		else {
			
			return {
				error: {
					code: 401,
					message: "Usuario no autorizado"
				},
				message: false,
				permission: []
			};
		}
	} catch(err) {
		return {
			error: {
				code: 404, message: "Mensaje no encontrado"
			},
			message: false,
			permission: []
		};
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
	checkPermissionsSubscription,
	checkPermissionsPlan,
	checkPermissionsMessage
}
