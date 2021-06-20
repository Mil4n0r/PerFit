import * as yup from 'yup';

export const TrackingSchema = yup.object().shape({
	trackingname: yup.string()
		.required("Introduzca un nombre para el seguimiento")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre al seguimiento"),
	targetvalue: yup.number()
		.typeError("Introduzca el valor objetivo")
		.required("Introduzca el valor objetivo")
		.min(0, "El número introducido debe ser positivo"),
	trackingunit: yup.string()
		.required("Introduzca un nombre para la unidad de medida")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para la unidad de medida"),
});