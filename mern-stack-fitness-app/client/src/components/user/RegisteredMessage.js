import React from 'react';
import { deleteDiet } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography, LoginAvatar } from '../../style/style';
import { Button, Typography } from '@material-ui/core';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

export const RegisteredMessage = () => {
	const history = useHistory();

	return (
		<BodyContainer>
			<LoginAvatar>
				<CheckOutlinedIcon />
			</LoginAvatar>
			<CustomTypography component="h3" variant="h6">
				Los datos del registro son válidos
			</CustomTypography>
			<Typography>
				Debe esperar a la validación de un administrador para poder iniciar sesión
			</Typography>
			<ButtonsContainer>
				<Button
					onClick={() => history.push("/")}
					fullWidth
					variant="contained"
					color="primary"
				>
					Volver a la página de inicio
				</Button>
			</ButtonsContainer>	
		</BodyContainer>
	);
};