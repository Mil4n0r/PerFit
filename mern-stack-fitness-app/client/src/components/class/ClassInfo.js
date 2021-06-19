import React, {useState, useEffect} from 'react';
import { getClass } from '../../api';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {format, parseISO, parse, formatISO} from 'date-fns';
import { es } from 'date-fns/locale'
import { utcToZonedTime } from 'date-fns-tz';

import {Grid, Paper, Modal, Button, List, Avatar, ListItemAvatar, Divider} from '@material-ui/core';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import NoMeetingRoomOutlinedIcon from '@material-ui/icons/NoMeetingRoomOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

import {CustomListItem as ListItem, ContainerWithPadding, CustomListItemText as ListItemText, HorizontalList, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin as InputLabel, PrimaryLink, CenterPaper, CapacityInputLabel} from '../../style/style'

import { DeleteClass } from './DeleteClass';
import { JoinClass } from './JoinClass';
import { LeaveClass } from './LeaveClass';

const formatCapacity = (usersJoined, roomCapacity) => {
	return roomCapacity ? `${usersJoined} / ${roomCapacity}` : usersJoined;
}

const getClassStatus = (usersJoined, roomCapacity) => {
	const threshold = Math.ceil(roomCapacity * 0.2);
	if(roomCapacity === usersJoined) {
		return "Full";
	}
	else if(roomCapacity - usersJoined <= threshold)
	{
		return "AlmostFull";
	}
	else {
		return "Available";
	}
}

export const ClassInfo = () => {

	const match = useRouteMatch();
	const [sclass, setClass] = useState();
	const [openJoinModal, setOpenJoinModal] = useState(false);
	const [openLeaveModal, setOpenLeaveModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	useEffect(() => {
		const fetchClass = async () => {
			const sclass = await getClass(match.params.id);
			setClass(sclass);
		}
		fetchClass();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Clase
			</Typography>
			{
				sclass && (
					<>
						<VerticalGrid container spacing={1}>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Actividad</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={sclass.classInfo?.actividadClase?.nombreActividad}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Fecha</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="datetime-local"
										defaultValue={sclass && formatISO(utcToZonedTime(sclass.classInfo.diaClase, 'Europe/Madrid')).substr(0,16)}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Monitor</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={sclass.classInfo?.monitorClase?.aliasUsuario}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Sala</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={sclass.classInfo?.salaClase?.nombreSala}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<ContainerWithPadding>
								<CapacityInputLabel className={getClassStatus(sclass.classInfo?.asistentesClase?.length, sclass.classInfo?.salaClase?.aforoSala)}>
									Asistentes: {formatCapacity(sclass.classInfo?.asistentesClase?.length, sclass.classInfo?.salaClase?.aforoSala)}
								</CapacityInputLabel>
								{
									sclass.classInfo?.asistentesClase?.length > 0 && (
										<FullWidthPaper className="external">
											<HorizontalList>
												{
													sclass.classInfo?.asistentesClase?.map(user => (
														<ListItem key={user._id} className="quarter">
															<FullWidthPaper>
																<Grid container>
																	<HorizontalGrid item xs={3}>
																		<ListItemAvatar>
																			<Avatar alt="Avatar del usuario" src={user?.avatarUsuario} />
																		</ListItemAvatar>
																	</HorizontalGrid>
																	<HorizontalGrid item xs={9}>
																		<ListItemText className="center" primary={user?.aliasUsuario}/>
																	</HorizontalGrid>
																</Grid>
															</FullWidthPaper>
														</ListItem>
														
													))
												}
											</HorizontalList>
										</FullWidthPaper>
									)
								}
							</ContainerWithPadding>
						</VerticalGrid>
						{
							sclass.permission.includes('join') || sclass.permission.includes('leave') ||
							sclass.permission.includes('write') || sclass.permission.includes('delete') ? (
								<Typography component="h3" variant="h6">Opciones</Typography>
							) : 
								<></>
						}
						<ContainerWithPadding>
							<Grid container spacing={3} >
									{
										sclass.permission.includes('join') && (
											<Grid item xs>
												<PrimaryLink to={"#"} onClick={() => {setOpenJoinModal(true)}}>
													<FullWidthPaper>
														<VerticalGrid item xs className="zoom">
															<ButtonAvatar><MeetingRoomOutlinedIcon /></ButtonAvatar>
															<Typography color='primary' className="caps">
																Unirse
															</Typography>
														</VerticalGrid>
													</FullWidthPaper>
												</PrimaryLink>
											</Grid>
										)
									}
									{
										sclass.permission.includes('leave') && (
											<Grid item xs>
												<PrimaryLink to={"#"} onClick={() => {setOpenLeaveModal(true)}}>
													<FullWidthPaper>
														<VerticalGrid item xs className="zoom">
															<ButtonAvatar><NoMeetingRoomOutlinedIcon /></ButtonAvatar>
															<Typography color='primary' className="caps">
																Abandonar
															</Typography>
														</VerticalGrid>
													</FullWidthPaper>
												</PrimaryLink>
											</Grid>
										)
									}
									{
										sclass.permission.includes('write') && (
											<Grid item xs>
												<PrimaryLink to={`/edit/class/${sclass.classInfo._id}`}>
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
										sclass.permission.includes('delete') && (
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
									{
										sclass.permission.includes('checkassistance') && (
											<Grid item xs>
												<PrimaryLink to={`/check/class/assistance/${sclass.classInfo._id}`}>
													<FullWidthPaper>
														<VerticalGrid item xs className="zoom">
															<ButtonAvatar><AssignmentTurnedInOutlinedIcon /></ButtonAvatar>
															<Typography color='primary' className="caps">
																Pasar asistencia
															</Typography>
														</VerticalGrid>
													</FullWidthPaper>
												</PrimaryLink>
											</Grid>
										)
									}
								<Modal
									open={openJoinModal}
									onClose={() => {setOpenJoinModal(false)}}
								>
									<CenterPaper><JoinClass setOpen={setOpenJoinModal}/></CenterPaper>
								</Modal>
								<Modal
									open={openLeaveModal}
									onClose={() => {setOpenLeaveModal(false)}}
								>
									<CenterPaper><LeaveClass setOpen={setOpenLeaveModal}/></CenterPaper>
								</Modal>
								<Modal
									open={openDeleteModal}
									onClose={() => {setOpenDeleteModal(false)}}
								>
									<CenterPaper><DeleteClass setOpen={setOpenDeleteModal}/></CenterPaper>
								</Modal>
							</Grid>
						</ContainerWithPadding>
					</>
				)
			}
		</BodyContainer>
	)
};