import * as yup from 'yup';

export const FoodSchema = yup.object().shape({
	foodname: yup.string()
		.required("Introduzca un nombre para el alimento")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre al alimento"),
	foodsize: yup.number()
		.typeError("Introduzca el tamaño de la ración")
		.required("Introduzca el tamaño de la ración")
		.min(0, "El número introducido debe ser positivo"),
	calories: yup.number()
		.typeError("Introduzca el número de calorías por ración")
		.required("Introduzca el número de calorías por ración")
		.min(0, "El número introducido debe ser positivo")
		.test(
			"valid-calories",
			"Las calorías no se corresponden con los macronutrientes introducidos",
			function(val) { // No usamos arrow function para poder acceder a los parámetros de "this"
				return val >= this.parent.carbs * 4 + this.parent.proteins * 4 + this.parent.fats * 9; // Puede no ser exactamente igual debido a alcohol, fibra...
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