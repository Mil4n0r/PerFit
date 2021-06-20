import * as yup from 'yup';

export const MealSchema = yup.object().shape({
	mealname: yup.string()
		.required("Introduzca un nombre para la comida")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre a la comida"),
	mealday: yup.date()
		.typeError("Por favor introduzca una fecha válida")
		.required("Por favor introduzca la fecha de la comida"),
});