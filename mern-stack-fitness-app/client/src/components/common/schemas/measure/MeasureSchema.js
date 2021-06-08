import * as yup from 'yup';

export const MeasureSchema = yup.object().shape({
	measurevalue: yup.number()
		.typeError("Introduzca el valor de la medida")
		.required("Introduzca el valor de la medida")
		.min(0, "El número introducido debe ser positivo"),
	measuredate: yup.date()
		.typeError("Por favor introduzca una fecha válida")
		.required("Por favor introduzca la fecha de la medida"),
});