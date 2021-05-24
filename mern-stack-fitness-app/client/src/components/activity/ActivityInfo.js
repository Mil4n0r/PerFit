import React, {useState, useEffect} from 'react';
import { getActivity } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import {Grid, Paper, Typography, Modal, Button} from '@material-ui/core';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {BodyContainer, CustomTypography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin as InputLabel, PrimaryLink, CenterPaper} from '../../style/style'

import { DeleteActivity } from './DeleteActivity';

export const ActivityInfo = () => {

	const match = useRouteMatch();
	const [activity, setActivity] = useState();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchActivity = async () => {
			const activity = await getActivity(match.params.id);
			setActivity(activity);
		}
		fetchActivity();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Actividad
			</CustomTypography>
			{
				activity && (
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
										defaultValue={activity.activityInfo.nombreActividad}
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
										defaultValue={activity.activityInfo.equipamientoActividad}
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
										defaultValue={activity.activityInfo.descripcionActividad}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
						</VerticalGrid>
						{
							activity.permission.includes('write') || activity.permission.includes('delete') ? (
								<CustomTypography component="h3" variant="h6">Opciones</CustomTypography>
							) : 
								<></>
						}
						<Grid container>
							{
								activity.permission.includes('write') && (
									<Grid item xs>
										<Button>
											<VerticalGrid item xs>
												<PrimaryLink to={`/edit/activity/${activity.activityInfo._id}`}>
													<ButtonAvatar><EditOutlinedIcon /></ButtonAvatar>
													<Typography color='primary'>
														Editar
													</Typography>
												</PrimaryLink>
											</VerticalGrid>
										</Button>
									</Grid>
								)
							}
							{
								activity.permission.includes('delete') && (
									<Grid item xs>
									<Button onClick={handleOpen}>
										<VerticalGrid item xs>
										<ButtonAvatar><DeleteForeverOutlinedIcon /></ButtonAvatar>
										<Typography color='primary'>
											Eliminar
										</Typography>
										</VerticalGrid>
									</Button>
									</Grid>
								)
							}
							<Modal
								open={open}
								onClose={handleClose}
							>
								<CenterPaper><DeleteActivity setOpen={setOpen}/></CenterPaper>
							</Modal>
						</Grid>
					</>
				)
			}
		</BodyContainer>
	)
};