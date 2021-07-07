import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageSchema } from '../../schemas/message/MessageSchema';

import { Button, Typography } from '@material-ui/core';
import { TextFieldWithMargin, HiddenTextField, FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';

export const MessageForm = ({ sender, receiver, onSubmit }) => {
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			messagesenderpreview: sender ? sender.aliasUsuario : "",
			messagesender: sender ? sender._id : "",
			messagereceiverpreview: receiver ? receiver.aliasUsuario : "",
			messagereceiver: receiver ? receiver._id : "",
			messagesubject: "",
			messagecontent: ""
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(MessageSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
				<TextFieldWithMargin
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Emisor del mensaje"
					type="text"
					name="messagesenderpreview"
					id="messagesenderpreview"
					disabled
				/>
				<HiddenTextField
					inputRef={register}
					fullWidth
					label="Emisor del mensaje"
					type="text"
					name="messagesender"
					id="messagesender"
				/>
				<TextFieldWithMargin
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Receptor del mensaje"
					type="text"
					name="messagereceiverpreview"
					id="messagereceiverpreview"
					disabled
				/>
				<HiddenTextField
					inputRef={register}
					fullWidth
					label="Receptor del mensaje"
					type="text"
					name="messagereceiver"
					id="messagereceiver"
				/>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Asunto del mensaje"
					type="text"
					name="messagesubject"
					id="messagesubject"
				/>
				<ErrorMessage className="error" errors={errors} name="messagesubject" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Contenido del mensaje"
					type="text"
					name="messagecontent"
					id="messagecontent"
				/>
				<ErrorMessage className="error" errors={errors} name="messagecontent" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Enviar mensaje
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}