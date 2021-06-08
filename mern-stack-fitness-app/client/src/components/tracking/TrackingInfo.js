import React, {useState, useEffect} from 'react';
import { getTracking, getUser } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import {Grid, Paper, Modal, Button, List, Avatar, ListItemAvatar, Divider, InputLabel, ListItemIcon, InputAdornment } from '@material-ui/core';

import FolderIcon from '@material-ui/icons/Folder';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {NutrientBar, VerticalDivider, CustomListItem as ListItem, ContainerWithPadding, CustomListItemText as ListItemText, HorizontalList, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin, PrimaryLink, CenterPaper, CapacityInputLabel} from '../../style/style'

import { DeleteTracking } from './DeleteTracking';


export const TrackingInfo = () => {

	const match = useRouteMatch();
	const [tracking, setTracking] = useState();
	const [user, setUser] = useState();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchTrackingAndUser = async () => {
			const tracking = await getTracking(match.params.id);
			setTracking(tracking);
			const user = await getUser(tracking.usuarioPlan);
			setUser(user);
		}
		fetchTrackingAndUser();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Seguimiento
			</Typography>
			{
				tracking && (
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
										defaultValue={tracking.nombrePlan}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Valor objetivo</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={tracking.valorObjetivo}
										InputProps={{
											readOnly: true,
											endAdornment: <InputAdornment position="end">{tracking.unidadObjetivo}</InputAdornment>
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
													<PrimaryLink to={`/associate/tracking/measure/${tracking._id}`}>
														<FullWidthPaper>
															<VerticalGrid item xs className="zoom">
																<ButtonAvatar><DescriptionOutlinedIcon /></ButtonAvatar>
																<Typography color='primary' className="caps">
																	Medidas
																</Typography>
															</VerticalGrid>
														</FullWidthPaper>
													</PrimaryLink>
												</Grid>
											}
											{
												<Grid item xs>
													<PrimaryLink to={`/edit/tracking/${user.userInfo._id}/${tracking._id}`}>
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
												<CenterPaper><DeleteTracking setOpen={setOpen} userId={user.userInfo._id}/></CenterPaper>
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