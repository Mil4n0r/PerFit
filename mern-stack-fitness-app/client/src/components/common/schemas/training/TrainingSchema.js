import * as yup from 'yup';

export const TrainingSchema = yup.object().shape({
	numberofseries: yup.number()
		.typeError("Introduzca el número de series")
		.required("Introduzca el número de series"),
	numberofreps: yup.number()
		.typeError("Introduzca el número de repeticiones")
		.required("Introduzca el número de repeticiones")
		.positive("El número introducido debe ser positivo")
		.integer("El dato introducido debe ser un entero"),
	weightsused: yup.number()
		.typeError("Introduzca el peso utilizado (kg)")
		.required("Introduzca el peso utilizado (kg)")
		.positive("El número introducido debe ser positivo")
		.integer("El dato introducido debe ser un entero"),
	trainingday: yup.date()
		.required("Por favor introduzca la fecha del entrenamiento")
});