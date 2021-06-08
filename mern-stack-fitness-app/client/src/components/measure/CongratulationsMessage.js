import React from 'react';
import { deleteDiet } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const CongratulationsMessage = (props) => {

	const setOpen = props.setOpen;

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				¡Enhorabuena!
			</CustomTypography>
			<Typography>
				Has conseguido llegar al objetivo. No olvides que puedes fijarte nuevas metas :)
			</Typography>
			<ButtonsContainer>
				<Button
					onClick={onClose}
					fullWidth
					variant="contained"
					color="primary"
				>
					Volver
				</Button>
			</ButtonsContainer>	
		</BodyContainer>
	);
};