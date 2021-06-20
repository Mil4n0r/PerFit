import React, {useState, useEffect} from 'react';
import { getRoom } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { DeleteRoom } from './DeleteRoom';

import {Grid, Modal} from '@material-ui/core';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {ContainerWithPadding, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin as InputLabel, PrimaryLink, CenterPaper, FullWidthPaper} from '../../style/style'

export const RoomInfo = () => {

	const match = useRouteMatch();
	const [room, setRoom] = useState();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState();

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchRoom = async () => {
			const room = await getRoom(match.params.id);
			if(room.response) {
				setError(room.response);
			}
			else {
				setRoom(room);
			}
		}
		fetchRoom();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Sala
			</Typography>
			{
				room && (
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
										defaultValue={room.roomInfo.nombreSala}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Equipamiento</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={room.roomInfo.equipamientoSala}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Aforo</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={room.roomInfo.aforoSala}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
						</VerticalGrid>
						{
							room.permission.includes('write') || room.permission.includes('delete') ? (
								<Typography component="h3" variant="h6">Opciones</Typography>
							) : 
								<></>
						}
						<ContainerWithPadding>
							<Grid container spacing={3}>
								{
									room.permission.includes('write') && (
										<Grid item xs>
											<PrimaryLink to={`/edit/room/${room.roomInfo._id}`}>
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
									room.permission.includes('delete') && (
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
								<Modal
									open={open}
									onClose={handleClose}
								>
									<CenterPaper><DeleteRoom setOpen={setOpen}/></CenterPaper>
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