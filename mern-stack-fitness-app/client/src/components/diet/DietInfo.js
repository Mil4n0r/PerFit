import React, {useState, useEffect} from 'react';
import { getDiet, getUser } from '../../api';
import { useRouteMatch } from "react-router-dom";

import {Grid, Modal, InputLabel, } from '@material-ui/core';

import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {ContainerWithPadding, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin, PrimaryLink, CenterPaper} from '../../style/style'

import { DeleteDiet } from './DeleteDiet';
import { NutrientList } from './NutrientList';

export const DietInfo = () => {

	const match = useRouteMatch();
	const [diet, setDiet] = useState();
	const [user, setUser] = useState();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchDietAndUser = async () => {
			const diet = await getDiet(match.params.id);
			setDiet(diet);
			const user = await getUser(diet.usuarioPlan);
			setUser(user);
		}
		fetchDietAndUser();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Dieta
			</Typography>
			{
				diet && (
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
										defaultValue={diet.nombrePlan}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<ContainerWithPadding>
								<InputLabel>Objetivo diario</InputLabel>
								{
									diet && diet.objetivoDiario && (
										<FullWidthPaper className="external">
											<NutrientList nutrients={diet.objetivoDiario} format={"Diet"}/>
										</FullWidthPaper>
									)
								}
							</ContainerWithPadding>
							{
								user && user.permission.includes('checkplans') && (
									<>
										<Typography component="h3" variant="h6">Opciones</Typography>
										<ContainerWithPadding>
											<Grid container spacing={3}>
												{
													<Grid item xs>
														<PrimaryLink to={`/associate/diet/meal/${diet._id}`}>
															<FullWidthPaper>
																<VerticalGrid item xs className="zoom">
																	<ButtonAvatar><FastfoodOutlinedIcon /></ButtonAvatar>
																	<Typography color='primary' className="caps">
																		Comidas
																	</Typography>
																</VerticalGrid>
															</FullWidthPaper>
														</PrimaryLink>
													</Grid>
												}
												{
													<Grid item xs>
														<PrimaryLink to={`/edit/diet/${user.userInfo._id}/${match.params.id}`}>
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
													<CenterPaper><DeleteDiet setOpen={setOpen} userId={user.userInfo._id}/></CenterPaper>
												</Modal>
											</Grid>
										</ContainerWithPadding>
									</>
								)
							}
						</VerticalGrid>
					</>
				)
			}
		</BodyContainer>
	)
};