import * as yup from 'yup';

export const RoomSchema = yup.object().shape({
	roomname: yup.string()
		.required("Introduzca un nombre para la sala")
		.matches(/^[a-zA-Z\'\/\-\.\"\% À-ú0-9]+$/, "Ha empleado caracteres no válidos para darle nombre a la sala"),
	roomequipment: yup.array()
		.of(
			yup.string()
			.required("El equipamiento seleccionado no es válido")
		),
	roomcapacity: yup.number()
		.typeError("Introduzca la capacidad máxima de la sala")
		.required("Introduzca la capacidad máxima de la sala")
		.positive("El número introducido debe ser superior a 0"),
});