import React, {useState, useContext} from 'react';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';
import { contractSubscription } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';
import AuthContext from '../../context/AuthContext';

export const ContractSubscription = (props) => {
	const match = useRouteMatch();
	const history = useHistory();
	const [error, setError] = useState();

	const setOpen = props.setOpen;

	const { loggedIn } = useContext(AuthContext);

	const onClick = async () => {
		const contractedSubscription = await contractSubscription(match.params.id);
		if(contractedSubscription.response) {
			setError(contractedSubscription.response);
		}
		else {
			history.push(`/subscription/list/${loggedIn._id}`);
		}
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Contratar suscripción con P-Coins
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea contratar la suscripción usando sus P-Coins?
			</Typography>
			<Typography>
				Actualmente tiene {loggedIn.balanceMonedas} P-Coins
			</Typography>
			<ButtonsContainer>
				<Grid container spacing={1}>
					<Grid item xs>
						<Button
							onClick={onClick} 
							fullWidth
							variant="contained"
							color="secondary"
						>
							Contratar
						</Button>
					</Grid>
					<Grid item xs>
						<Button
							onClick={onClose}
							fullWidth
							variant="contained"
							color="primary"
						>
							Volver
						</Button>
					</Grid>
				</Grid>
			</ButtonsContainer>	
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
};