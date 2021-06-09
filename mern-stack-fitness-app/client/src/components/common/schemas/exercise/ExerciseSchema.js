import * as yup from 'yup';

export const ExerciseSchema = yup.object().shape({
	exercisename: yup.string()
		.required("Introduzca un nombre para el ejercicio")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre al ejercicio"),
	exercisetype: yup.string()
		.required("Introduzca un tipo para el ejercicio")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle tipo al ejercicio"),
});