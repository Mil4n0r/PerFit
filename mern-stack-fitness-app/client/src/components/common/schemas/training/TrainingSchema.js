import * as yup from 'yup';

export const TrainingSchema = yup.object().shape({
	trainingname: yup.string()
		.required("Introduzca un nombre para la rutina")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre al ejercicio"),
});