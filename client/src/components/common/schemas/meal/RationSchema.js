import * as yup from 'yup';

export const RationSchema = yup.object().shape({
	numberofrations: yup.number()
		.typeError("Introduzca el número de raciones")
		.required("Introduzca el número de raciones")
		.min(0, "El número introducido debe ser positivo"),
});