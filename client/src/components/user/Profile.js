import React, {useState, useEffect} from 'react';
import { getUser } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { SendFriendRequest } from '../request/SendFriendRequest';
import { SendTrainingRequest } from '../request/SendTrainingRequest';
import { DeleteUser } from './DeleteUser';

import {Grid, Paper, Modal, Button, List, Avatar, ListItemAvatar, Divider, CardActionArea} from '@material-ui/core';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import {NavLink, CustomCardContent, FullWidthCard, ButtonAvatarSecondary, CustomListItem as ListItem, ContainerWithPadding, CustomListItemText as ListItemText, HorizontalList, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin as InputLabel, PrimaryLink, CenterPaper, CapacityInputLabel} from '../../style/style'

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { ActivateUser } from './ActivateUser';

export const Profile = () => {

	const match = useRouteMatch();
	const [user, setUser] = useState();
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openFriendModal, setOpenFriendModal] = useState(false);
	const [openActivateModal, setOpenActivateModal] = useState(false);
	const [openTrainingModal, setOpenTrainingModal] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUser(match.params.id);
			if(user.response) {
				setError(user.response);
			}
			else {
				setUser(user)
			}
		}
		fetchUser();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Perfil
			</Typography>
			{
				user && (
					<>
						<Modal
							open={openFriendModal}
							onClose={() => {setOpenFriendModal(false)}}
						>
							<CenterPaper><SendFriendRequest setOpen={setOpenFriendModal}/></CenterPaper>
						</Modal>
						<Modal
							open={openTrainingModal}
							onClose={() => {setOpenTrainingModal(false)}}
						>
							<CenterPaper><SendTrainingRequest setOpen={setOpenTrainingModal}/></CenterPaper>
						</Modal>
						<Modal
							open={openDeleteModal}
							onClose={() => {setOpenDeleteModal(false)}}
						>
							<CenterPaper><DeleteUser setOpen={setOpenDeleteModal}/></CenterPaper>
						</Modal>
						<Modal
							open={openActivateModal}
							onClose={() => {setOpenActivateModal(false)}}
						>
							<CenterPaper><ActivateUser setOpen={setOpenActivateModal}/></CenterPaper>
						</Modal>
						<VerticalGrid container spacing={1}>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Alias</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={user.userInfo.aliasUsuario}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Email</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={user.userInfo.emailUsuario}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Rol</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={user.userInfo.role}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							{
								user && user.userInfo.role === "Miembro" && (
									<>
										<HorizontalGrid container spacing={1}>
											<Grid item xs={3}>
												<InputLabel>Suscripción</InputLabel>
											</Grid>
											<Grid item xs={9}>
												<TextField
													variant="outlined"
													fullWidth
													type="text"
													defaultValue={user.userInfo.suscripcionMiembro.planSuscripcion.nombreSuscripcion}
													InputProps={{
														readOnly: true,
													}}
												/>
											</Grid>
										</HorizontalGrid>
										<HorizontalGrid container spacing={1}>
											<Grid item xs={3}>
												<InputLabel>P-Coins</InputLabel>
											</Grid>
											<Grid item xs={9}>
												<TextField
													variant="outlined"
													fullWidth
													type="text"
													defaultValue={user.userInfo.balanceMonedas}
													InputProps={{
														readOnly: true,
													}}
												/>
											</Grid>
										</HorizontalGrid>
									</>
								)
							}
							{
								user && user.permission.includes('checkplans') && (
									<ContainerWithPadding>
										<Grid container>
											<FullWidthCard className="card">
												<CardActionArea component={NavLink} to={`/user/plans/${user.userInfo._id}`}>
													<CustomCardContent>
														<HorizontalGrid container spacing={4}>
															<HorizontalGrid className="logo" item xs>
																<ButtonAvatar><FitnessCenterOutlinedIcon /></ButtonAvatar>
															</HorizontalGrid>
															<HorizontalGrid item xs>
																<Typography className="white caps" component="h2" variant="h5">
																	Planes
																</Typography>
															</HorizontalGrid>
														</HorizontalGrid>
													</CustomCardContent>
												</CardActionArea>
											</FullWidthCard>
										</Grid>
									</ContainerWithPadding>
								)
							}
							{
								user.permission.includes('allowfriends') || user.permission.includes('write') || user.permission.includes('delete') ? (
									<Typography component="h3" variant="h6">Opciones</Typography>)
								: (
									<></>
								)
							}
							{
								user.permission.includes('activateaccount') ? (
									<ContainerWithPadding>
										<Grid container spacing={3}>
											{
												<Grid item xs>
													<PrimaryLink to={"#"} onClick={() => {setOpenActivateModal(true)}}>
														<FullWidthPaper>												
															<VerticalGrid item xs className="zoom">
																<ButtonAvatar><CheckOutlinedIcon/></ButtonAvatar>
																<Typography color='primary' className="caps">
																	Activar cuenta
																</Typography>
															</VerticalGrid>
														</FullWidthPaper>
													</PrimaryLink>
												</Grid>
											}
											{
												<Grid item xs>
													<PrimaryLink to={"#"} onClick={() => {setOpenDeleteModal(true)}}>
														<FullWidthPaper>												
															<VerticalGrid item xs className="zoom">
																<ButtonAvatarSecondary><ClearOutlinedIcon/></ButtonAvatarSecondary>
																<Typography color='secondary' className="caps">
																	Deshabilitar cuenta
																</Typography>
															</VerticalGrid>
														</FullWidthPaper>
													</PrimaryLink>
												</Grid>
											}
										</Grid>
									</ContainerWithPadding>
								) : (
									<>
										<ContainerWithPadding>
											<Grid container spacing={3}>
												{
													user.permission.includes('allowfriends') && (
														<Grid item xs={12}>
															<FullWidthCard className="card">
																<CardActionArea component={NavLink} to={"#"} onClick={() => {setOpenFriendModal(true)}}>
																	<CustomCardContent className="secondary">
																		<HorizontalGrid container spacing={4}>
																			<HorizontalGrid className="logo" item xs>
																				<ButtonAvatar><FavoriteBorderOutlinedIcon /></ButtonAvatar>
																			</HorizontalGrid>
																			<HorizontalGrid item xs>
																				<Typography className="white caps" component="h2" variant="h5">
																					Agregar como amigo
																				</Typography>
																			</HorizontalGrid>
																		</HorizontalGrid>
																	</CustomCardContent>
																</CardActionArea>
															</FullWidthCard>
														</Grid>
														
													)
												}
												{
													user.permission.includes('write') && (
														<Grid item xs={12}>
															<FullWidthCard className="card">
																<CardActionArea component={NavLink} to={`/edit/user/${user.userInfo._id}`}>
																	<CustomCardContent className="secondary">
																		<HorizontalGrid container spacing={4}>
																			<HorizontalGrid className="logo" item xs>
																				<ButtonAvatar><EditOutlinedIcon /></ButtonAvatar>
																			</HorizontalGrid>
																			<HorizontalGrid item xs>
																				<Typography className="white caps" component="h2" variant="h5">
																					Editar
																				</Typography>
																			</HorizontalGrid>
																		</HorizontalGrid>
																	</CustomCardContent>
																</CardActionArea>
															</FullWidthCard>
														</Grid>
													)
												}
												{
													user.permission.includes('delete') && (
														<Grid item xs={12}>
															<FullWidthCard className="card">
																<CardActionArea component={NavLink} to={"#"} onClick={() => {setOpenDeleteModal(true)}}>
																	<CustomCardContent className="secondary">
																		<HorizontalGrid container spacing={4}>
																			<HorizontalGrid className="logo" item xs>
																				<ButtonAvatar><DeleteForeverOutlinedIcon /></ButtonAvatar>
																			</HorizontalGrid>
																			<HorizontalGrid item xs>
																				<Typography className="white caps" component="h2" variant="h5">
																					Eliminar
																				</Typography>
																			</HorizontalGrid>
																		</HorizontalGrid>
																	</CustomCardContent>
																</CardActionArea>
															</FullWidthCard>
														</Grid>
													)
												}
												{
													user.permission.includes('allowtraining') && (
														<Grid item xs={12}>
															<FullWidthCard className="card">
																<CardActionArea component={NavLink} to={`#`} onClick={() => {setOpenTrainingModal(true)}}>
																	<CustomCardContent className="secondary">
																		<HorizontalGrid container spacing={4}>
																			<HorizontalGrid className="logo" item xs>
																				<ButtonAvatar><TrendingUpOutlinedIcon /></ButtonAvatar>
																			</HorizontalGrid>
																			<HorizontalGrid item xs>
																				<Typography className="white caps" component="h2" variant="h5">
																					Solicitar entrenamiento personal
																				</Typography>
																			</HorizontalGrid>
																		</HorizontalGrid>
																	</CustomCardContent>
																</CardActionArea>
															</FullWidthCard>
														</Grid>
													)
												}
											</Grid>
										</ContainerWithPadding>
									</>
								)
							}
						</VerticalGrid>
					</>
				)
			}
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	)
};