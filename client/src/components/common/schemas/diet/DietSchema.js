import * as yup from 'yup';

export const DietSchema = yup.object().shape({
	dietname: yup.string()
		.required("Introduzca un nombre para la dieta")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre a la dieta"),
	calories: yup.number()
		.typeError("Introduzca el número de calorías por ración")
		.required("Introduzca el número de calorías por ración")
		.min(0, "El número introducido debe ser positivo")
		.test(
			"valid-calories",
			"Las calorías no se corresponden con los macronutrientes introducidos (Kcal = 4 ⋅ g carbohidratos + 4 ⋅ g proteinas + 9 ⋅ g grasas)",
			function(val) { // No usamos arrow function para poder acceder a los parámetros de "this"
				return val === this.parent.carbs * 4 + this.parent.proteins * 4 + this.parent.fats * 9;
			}
		),
	carbs: yup.number()
		.typeError("Introduzca los gramos de carbohidratos por ración")
		.required("Introduzca los gramos de carbohidratos por ración")
		.min(0, "El número introducido debe ser positivo"),
	proteins: yup.number()
		.typeError("Introduzca los gramos de proteinas por ración")
		.required("Introduzca los gramos de proteinas por ración")
		.min(0, "El número introducido debe ser positivo"),
	fats: yup.number()
		.typeError("Introduzca los gramos de grasas por ración")
		.required("Introduzca los gramos de grasas por ración")
		.min(0, "El número introducido debe ser positivo"),
});