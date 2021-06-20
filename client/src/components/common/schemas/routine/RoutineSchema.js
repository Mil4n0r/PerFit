import * as yup from 'yup';

export const RoutineSchema = yup.object().shape({
	routinename: yup.string()
		.required("Introduzca un nombre para la rutina")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre a la rutina"),
	routinetime: yup.number()
		.typeError("Introduzca el tiempo medio por sesión de la rutina")
		.required("Introduzca el tiempo medio por sesión de la rutina")
		.min(30, "El número introducido debe ser igual o superior a 30"),
});