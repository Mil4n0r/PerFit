import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { yupResolver } from '@hookform/resolvers/yup';

import { ResetPasswordSchema } from '../../../schemas/user/login/ResetPasswordSchema';
import { Typography, Container, Box } from '@material-ui/core';
import { FormContainer, FullWidthForm, TextFieldWithMargin as TextField, LoginButton } from '../../../../../style/style';

export const ResetPasswordForm = ({ onSubmit }) => {
	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(ResetPasswordSchema),
		criteriaMode: 'all',
		mode: "onTouched"
	});
	
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={(event) => {
				event.preventDefault();
				submitHandler();
			}}>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Contraseña"
					type="password"
					name="password"
					id="password"
				/>
				<ErrorMessage className="error"
					errors={errors} name="password" render={
						({ messages }) =>
							messages &&
								Object.entries(messages).map(([typeArray, messageArray]) => (
									<Box key={"password " + typeArray}>
										{Array.isArray(messageArray) ? (
											messageArray.map((message,id) => <Typography className="error" key={"password" + id}>{message}</Typography>)
										) : <Typography>{messageArray}</Typography>}
									</Box>
								))
					}
				/>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Confirmar contraseña"
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
				/>
				<ErrorMessage className="error" errors={errors} name="passwordConfirm" as={Typography} />
				<LoginButton
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
				>
					CAMBIAR CONTRASEÑA
				</LoginButton>
			</FullWidthForm>
		</FormContainer>
	);
};