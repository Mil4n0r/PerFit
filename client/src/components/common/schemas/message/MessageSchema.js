import * as yup from 'yup';

export const MessageSchema = yup.object().shape({
	messagesender: yup.string()
		.required("Introduzca un emisor para el mensaje"),
	messagereceiver: yup.string()
		.required("Introduzca un receptor para el mensaje"),
	messagesubject: yup.string()
		.required("Introduzca un asunto para el mensaje"),
	messagecontent: yup.string()
		.required("Introduzca un contenido para el mensaje"),
});