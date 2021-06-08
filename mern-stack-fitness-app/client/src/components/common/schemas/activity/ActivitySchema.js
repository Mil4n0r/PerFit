import * as yup from 'yup';

export const ActivitySchema = yup.object().shape({
	activityname: yup.string()
		.required("Introduzca un nombre para la actividad")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre a la actividad"),
	activitydescription: yup.string()
		.required("Introduzca una descripción para la actividad"),
	activityequipment: yup.array()
		.of(
			yup.string()
			.required("El equipamiento seleccionado no es válido")
		)
});