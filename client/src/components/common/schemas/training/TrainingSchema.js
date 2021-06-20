import * as yup from 'yup';

export const TrainingSchema = yup.object().shape({
	trainingname: yup.string()
		.required("Introduzca un nombre para el entrenamiento")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre al entrenamiento"),
	trainingday: yup.date()
		.typeError("Por favor introduzca una fecha válida")
		.required("Por favor introduzca la fecha del entrenamiento"),
});