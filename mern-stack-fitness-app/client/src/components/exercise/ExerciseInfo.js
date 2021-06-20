import React, {useState, useEffect} from 'react';
import { getExercise } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import {Grid, Paper, Modal, Button} from '@material-ui/core';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {ContainerWithPadding, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin as InputLabel, PrimaryLink, CenterPaper, FullWidthPaper} from '../../style/style'

import { DeleteExercise } from './DeleteExercise';

export const ExerciseInfo = () => {

	const match = useRouteMatch();
	const [exercise, setExercise] = useState();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState();

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchExercise = async () => {
			const exercise = await getExercise(match.params.id);
			if(exercise.response) {
				setError(exercise.response);
			}
			else {
				setExercise(exercise);
			}
		}
		fetchExercise();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Ejercicio
			</Typography>
			{
				exercise && (
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
										defaultValue={exercise.exerciseInfo.nombreEjercicio}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabel>Tipo</InputLabel>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={exercise.exerciseInfo.tipoEjercicio}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
						</VerticalGrid>
						{
							exercise.permission.includes('write') || exercise.permission.includes('delete') ? (
								<Typography component="h3" variant="h6">Opciones</Typography>
							) : 
								<></>
						}
						<ContainerWithPadding>
							<Grid container spacing={3}>
								{
									exercise.permission.includes('write') && (
										<Grid item xs>
											<PrimaryLink to={`/edit/exercise/${exercise.exerciseInfo._id}`}>
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
									exercise.permission.includes('delete') && (
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
									<CenterPaper><DeleteExercise setOpen={setOpen}/></CenterPaper>
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