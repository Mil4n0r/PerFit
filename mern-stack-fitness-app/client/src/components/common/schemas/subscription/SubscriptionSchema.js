import * as yup from 'yup';

export const SubscriptionSchema = yup.object().shape({
	subscriptionname: yup.string()
		.required("Introduzca un nombre para la suscripción")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre a la rutina"),
	subscriptiondescription: yup.string()
		.required("Introduzca una descripción para la suscripción"),
	subscriptioncost: yup.number()
		.typeError("Introduzca el coste (€) de la suscripción")
		.required("Introduzca el coste (€) de la suscripción")
		.min(0, "El número introducido debe ser positivo"),
	subscriptionend: yup.date()
		.typeError("Por favor introduzca una fecha válida")
		.required("Por favor introduzca la fecha límite de la suscripción"),
});