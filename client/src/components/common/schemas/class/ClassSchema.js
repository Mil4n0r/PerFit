import * as yup from 'yup';

export const ClassSchema = yup.object().shape({
	classactivity: yup.string()
		.required("Por favor introduzca una actividad para la clase")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre a la clase"),
	classday: yup.date()
		.typeError("Por favor introduzca una fecha válida")
		.required("Por favor introduzca la fecha de la clase"),
	classmonitor: yup.string(),
	classroom: yup.string()
		.required("Por favor introduzca una sala para la clase"),
});