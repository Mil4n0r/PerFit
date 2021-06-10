import React, {useState, useEffect} from 'react';
import { getUser } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { SendFriendRequest } from '../request/SendFriendRequest';
import { SendTrainingRequest } from '../request/SendTrainingRequest';
import { DeleteUser } from './DeleteUser';

import {Grid, Paper, Modal, Button, List, Avatar, ListItemAvatar, Divider} from '@material-ui/core';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import {ButtonAvatarSecondary, CustomListItem as ListItem, ContainerWithPadding, CustomListItemText as ListItemText, HorizontalList, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin as InputLabel, PrimaryLink, CenterPaper, CapacityInputLabel} from '../../style/style'

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

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUser(match.params.id);
			setUser(user);
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
						</VerticalGrid>
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
													<Grid item xs>
														<PrimaryLink to={"#"} onClick={() => {setOpenFriendModal(true)}}>
															<FullWidthPaper>												
																<VerticalGrid item xs className="zoom">
																	<ButtonAvatar><FavoriteBorderOutlinedIcon/></ButtonAvatar>
																	<Typography color='primary' className="caps">
																		Agregar como amigo
																	</Typography>
																</VerticalGrid>
															</FullWidthPaper>
														</PrimaryLink>
													</Grid>
													
												)
											}
											{
												user.permission.includes('write') && (
													<Grid item xs>
														<PrimaryLink to={`/edit/user/${user.userInfo._id}`}>
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
												user.permission.includes('delete') && (
													<Grid item xs>
														<PrimaryLink to={"#"} onClick={() => {setOpenDeleteModal(true)}}>
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
										</Grid>
									</ContainerWithPadding>
									<ContainerWithPadding>
										{
											user.permission.includes('allowtraining') && (
												<Grid container>
													<Grid item xs>
														<PrimaryLink to={`#`} onClick={() => {setOpenTrainingModal(true)}}>
															<FullWidthPaper>
																<VerticalGrid item xs className="zoom">
																	<ButtonAvatarSecondary><TrendingUpOutlinedIcon /></ButtonAvatarSecondary>
																	<Typography color='secondary' className="caps">
																		Solicitar entrenamiento personal
																	</Typography>
																</VerticalGrid>
															</FullWidthPaper>
														</PrimaryLink>
													</Grid>
												</Grid>
											)
										}
									</ContainerWithPadding>
									<ContainerWithPadding>
										{
											user.permission.includes('checkplans') && (
												<Grid container spacing={3}>
													<Grid item xs>
														<PrimaryLink to={`/routine/list/${user.userInfo._id}`}>
															<FullWidthPaper>
																<VerticalGrid item xs className="zoom">
																	<ButtonAvatar><FitnessCenterOutlinedIcon /></ButtonAvatar>
																	<Typography color='primary' className="caps">
																		Rutinas
																	</Typography>
																</VerticalGrid>
															</FullWidthPaper>
														</PrimaryLink>
													</Grid>
													<Grid item xs>
														<PrimaryLink to={`/diet/list/${user.userInfo._id}`}>
															<FullWidthPaper>
																<VerticalGrid item xs className="zoom">
																	<ButtonAvatar><RestaurantMenuOutlinedIcon /></ButtonAvatar>
																	<Typography color='primary' className="caps">
																		Dietas
																	</Typography>
																</VerticalGrid>
															</FullWidthPaper>
														</PrimaryLink>
													</Grid>
													<Grid item xs>
														<PrimaryLink to={`/tracking/list/${user.userInfo._id}`}>
															<FullWidthPaper>
																<VerticalGrid item xs className="zoom">
																	<ButtonAvatar><TrendingUpOutlinedIcon /></ButtonAvatar>
																	<Typography color='primary' className="caps">
																		Seguimientos
																	</Typography>
																</VerticalGrid>
															</FullWidthPaper>
														</PrimaryLink>
													</Grid>
												</Grid>
											)
										}
										{
											console.log(user)
										}
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