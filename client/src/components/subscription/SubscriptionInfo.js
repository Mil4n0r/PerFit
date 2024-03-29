import React, {useState, useEffect} from 'react';
import { getSubscription } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import {Grid, Paper, Modal, Button} from '@material-ui/core';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import {ContainerWithPadding, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin as InputLabel, PrimaryLink, CenterPaper, FullWidthPaper} from '../../style/style'

import { DeleteSubscription } from './DeleteSubscription';
import { ContractSubscription } from './ContractSubscription';

export const SubscriptionInfo = () => {

	const match = useRouteMatch();
	const [subscription, setSubscription] = useState();
	const [open, setOpen] = useState(false);
	const [openContract, setOpenContract] = useState(false);
	const [error, setError] = useState();

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	const handleContractOpen = () => {
		setOpenContract(true);
	};
	
	const handleContractClose = () => {
		setOpenContract(false);
	};

	useEffect(() => {
		const fetchSubscription = async () => {
			const subscription = await getSubscription(match.params.id);
			if(subscription.response) {
				setError(subscription.response);
			}
			else {
				setSubscription(subscription);
			}
		}
		fetchSubscription();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Suscripción
			</Typography>
			{
				subscription && (
					<>
						<VerticalGrid container spacing={1}>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Nombre</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={subscription.subscriptionInfo.nombreSuscripcion}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Descripción</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={subscription.subscriptionInfo.descripcionSuscripcion}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Coste</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={`${subscription.subscriptionInfo.costeSuscripcion}€ / ${subscription.subscriptionInfo.costeSuscripcionPCoins} P-Coins`}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Duración suscripción</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="number"
										defaultValue={subscription.subscriptionInfo.duracionSuscripcion}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel htmlFor="permissions">
										Permisos
									</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={subscription.subscriptionInfo.permisosSuscripcion}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							
							
						</VerticalGrid>
						{
							subscription.permission.includes('write') || subscription.permission.includes('delete') ? (
								<Typography component="h3" variant="h6">Opciones</Typography>
							) : 
								<></>
						}
						<ContainerWithPadding>
							<Grid container spacing={3}>
								{
									subscription.permission.includes('write') && (
										<Grid item xs>
											<PrimaryLink to={`/edit/subscription/${subscription.subscriptionInfo._id}`}>
												<FullWidthPaper>
													<VerticalGrid item xs className="zoom">
														<ButtonAvatar><EditOutlinedIcon /></ButtonAvatar>
														<Typography color='primary' className="caps">
															Editar
														</Typography>
													</VerticalGrid>
												</FullWidthPaper>
											</PrimaryLink>
										</Grid>
									)
								}
								{
									subscription.permission.includes('delete') && (
										<Grid item xs>
											<PrimaryLink to={"#"} onClick={handleOpen}>
												<FullWidthPaper>												
													<VerticalGrid item xs className="zoom">
														<ButtonAvatar><DeleteForeverOutlinedIcon /></ButtonAvatar>
														<Typography color='primary' className="caps">
															Eliminar
														</Typography>
													</VerticalGrid>
												</FullWidthPaper>
											</PrimaryLink>
										</Grid>
									)
								}
								{
									subscription.permission.includes('renew') && (
										<Grid item xs={12}>
											<PrimaryLink to={"#"} onClick={handleContractOpen}>
												<FullWidthPaper>												
													<VerticalGrid item xs className="zoom">
														<ButtonAvatar><AddCircleOutlineOutlinedIcon /></ButtonAvatar>
														<Typography color='primary' className="caps">
															Contratar
														</Typography>
													</VerticalGrid>
												</FullWidthPaper>
											</PrimaryLink>
										</Grid>
									)
								}
								<Modal
									open={open}
									onClose={handleClose}
								>
									<CenterPaper><DeleteSubscription setOpen={setOpen}/></CenterPaper>
								</Modal>
								<Modal
									open={openContract}
									onClose={handleContractClose}
								>
									<CenterPaper><ContractSubscription setOpen={setOpenContract}/></CenterPaper>
								</Modal>
							</Grid>
						</ContainerWithPadding>
					</>
				)
			}
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	)
};