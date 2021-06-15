import React, {useState, useEffect} from 'react';
import { getRoutine, getUser } from '../../api';
import { useRouteMatch } from "react-router-dom";

import {Grid, Modal, InputLabel, } from '@material-ui/core';

import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {ContainerWithPadding, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin, PrimaryLink, CenterPaper} from '../../style/style'

import { DeleteRoutine } from './DeleteRoutine';

export const RoutineInfo = () => {

	const match = useRouteMatch();
	const [routine, setRoutine] = useState();
	const [user, setUser] = useState();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchRoutineAndUser = async () => {
			const routine = await getRoutine(match.params.id);
			setRoutine(routine);
			const user = await getUser(routine.usuarioPlan);
			setUser(user);
		}
		fetchRoutineAndUser();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Rutina
			</Typography>
			{
				routine && (
					<>
						<VerticalGrid container spacing={1}>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Nombre</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={routine.nombrePlan}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Tiempo estimado</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={routine.tiempoRutina}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
						</VerticalGrid>
						{
							user && user.permission.includes('checkplans') && (
								<>
									<Typography component="h3" variant="h6">Opciones</Typography>
									<ContainerWithPadding>
										<Grid container spacing={3}>
											{
												<Grid item xs>
													<PrimaryLink to={`/associate/routine/training/${routine._id}`}>
														<FullWidthPaper>
															<VerticalGrid item xs className="zoom">
																<ButtonAvatar><FitnessCenterOutlinedIcon /></ButtonAvatar>
																<Typography color='primary' className="caps">
																	Entrenamientos
																</Typography>
															</VerticalGrid>
														</FullWidthPaper>
													</PrimaryLink>
												</Grid>
											}
											{
												<Grid item xs>
													<PrimaryLink to={`/edit/routine/${user.userInfo._id}/${match.params.id}`}>
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
											}
											{
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
											}
											<Modal
												open={open}
												onClose={handleClose}
											>
												<CenterPaper><DeleteRoutine setOpen={setOpen} userId={user.userInfo._id}/></CenterPaper>
											</Modal>
										</Grid>
									</ContainerWithPadding>
								</>
							)
						}
					</>
				)
			}
		</BodyContainer>
	)
};