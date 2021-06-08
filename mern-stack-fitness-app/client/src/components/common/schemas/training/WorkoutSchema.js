import * as yup from 'yup';

export const WorkoutSchema = yup.object().shape({
	numberofseries: yup.number()
		.typeError("Introduzca el número de series")
		.required("Introduzca el número de series")
		.positive("El número introducido debe ser positivo"),
	numberofreps: yup.array()
		.of(yup.number()
			.typeError("Introduzca el número de repeticiones")
			.required("Introduzca el número de repeticiones")
			.positive("El número de repeticiones introducido debe ser positivo")
		),
	weightsused: yup.array()
		.of(yup.number()
			.typeError("Introduzca el peso utilizado")
			.required("Introduzca el peso utilizado")
			.min(0, "El peso introducido debe ser positivo"),
		)
});