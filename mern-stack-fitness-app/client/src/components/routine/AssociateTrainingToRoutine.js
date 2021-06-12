import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
//import { associateRoutine } from '../../api';
import { deleteTraining, getRoutine, deleteWorkout, getTrainingsForDate } from '../../api';

import { Table, TableBody, TableCell, Paper, List, ListItem, Divider, Grid } from '@material-ui/core';

import {format} from 'date-fns';
import { es } from 'date-fns/locale'

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import { CircleLink, TableBottomCell, TableBottomRow, CustomTableCell, FullWidthPaper, CustomDeleteForeverOutlinedIcon, CustomEditOutlinedIcon, CustomListItemText as ListItemText, NutrientBar, VerticalDivider, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography as Typography, TableContainerWithMargin as TableContainer, VerticalGrid } from '../../style/style';

import { RoutineCalendar } from './RoutineCalendar';

const createArrayWithNumbers = (length) => {
	return Array.from({ length }, (_, k) => k);
}

const seriesFormat = (series, reps, weights) => {

	return (
		<List dense>
			{
				createArrayWithNumbers(series).map((i) => (
					<React.Fragment key={"series"+i} >
						<ListItem>
							<HorizontalGrid container key={"serie"+i}>
								<HorizontalGrid item xs>
									<ListItemText className="bold">Serie {i+1}</ListItemText>
								</HorizontalGrid>
								<HorizontalGrid item xs>
									<ListItemText>{reps[i]} x {weights[i]} kg</ListItemText>
								</HorizontalGrid>
							</HorizontalGrid>
						</ListItem>
						<Divider />
					</React.Fragment>
				))
			}
		</List>
	)
}

const workoutFormat = (w) => {
	const exercisename = w.ejercicioEntrenamiento?.nombreEjercicio
	const exercisetype = w.ejercicioEntrenamiento?.tipoEjercicio

	const series = seriesFormat(w.numSeries, w.numRepeticiones, w.pesosUtilizados)

	return (
		<HorizontalGrid container className="centerText">
			<Grid item xs>{exercisename}</Grid>
			<Grid item xs>{series}</Grid>
		</HorizontalGrid>
	)
}

export const AssociateTrainingToRoutine = () => {
	const match = useRouteMatch();

	const [routine, setRoutine] = useState();
	const [trainings, setTrainings] = useState();
	const [deleted, setDeleted] = useState(); // Permite recargar la lista de entrenamientos al borrar

	const [selectedDate, handleDateChange] = useState(new Date(localStorage.getItem('currentDate')) || new Date() );

	useEffect(() => {
		const setLocalStorageDate = async () => {
			localStorage.setItem('currentDate', selectedDate);
		}
		setLocalStorageDate();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, [selectedDate]);

	useEffect(() => {
		const fetchRoutine = async () => {
			const routine = await getRoutine(match.params.id);
			setRoutine(routine);
		}
		fetchRoutine();

		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	useEffect(() => {
		const fetchTrainings = async () => {
			const trainings = await getTrainingsForDate(match.params.id, selectedDate);
			setTrainings(trainings);
		}
		fetchTrainings();
	}, [deleted, selectedDate]);
	
	const deleteTrainingFromRoutine = async (trainingid) => {
		await deleteTraining(match.params.id, trainingid); // Debemos borrar tanto el entrenamiento como su referencia en la rutina...
		setDeleted(trainingid);
	}

	const deleteWorkoutFromTraining = async (trainingid, workoutid) => {
		await deleteWorkout(routine._id, trainingid, workoutid);
		setDeleted(workoutid);
	}

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Entrenamientos de {routine?.nombrePlan}
			</Typography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>
								<HorizontalGrid container spacing={1}>
									<HorizontalGrid item xs={8}>
										Entrenamientos del {format(selectedDate, 'PPPP', {locale: es})}
									</HorizontalGrid>
									<HorizontalGrid item xs={4}>
										<RoutineCalendar selectedDate={selectedDate} routine={routine} handleChange={handleDateChange} deleted={deleted}/>
									</HorizontalGrid>
								</HorizontalGrid>
							</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<CustomTableCell className="separator">
								<Typography className="center">Tiempo estimado: {routine?.tiempoRutina} minutos</Typography>
							</CustomTableCell>
						</TableRow>
						{trainings && trainings.length > 0 && trainings.map((training) => (
							<React.Fragment key={training._id}>
								<TableRow>
									<CustomTableCell className="separator">
										<HorizontalGrid container spacing={1}>
											<HorizontalGrid item xs={8}>
												<Typography component="h3" variant="h6">
													{training.nombreEntrenamiento}
												</Typography>
											</HorizontalGrid>
											<HorizontalGrid item xs={2}>
												<CircleLink className='primary' to={`/edit/training/${routine._id}/${training._id}`}><CustomEditOutlinedIcon /></CircleLink>
											</HorizontalGrid>
											<HorizontalGrid item xs={2}>
												<CircleLink className='secondary' to={"#"} onClick={() => { deleteTrainingFromRoutine(training._id) } }><CustomDeleteForeverOutlinedIcon /></CircleLink>
											</HorizontalGrid>
										</HorizontalGrid>
									</CustomTableCell>
								</TableRow>
								{
									training.trabajoEntrenamiento.map(workout => (
										<TableRow key={workout._id}>
											<TableCell >
												<HorizontalGrid container spacing={1}>
													<HorizontalGrid item xs={8}>
														{workoutFormat(workout)}
													</HorizontalGrid>
													<HorizontalGrid item xs={2}>
														<Link to={`/edit/workout/${match.params.id}/${training._id}/${workout._id}`}><CustomEditOutlinedIcon /></Link>
													</HorizontalGrid>
													<HorizontalGrid item xs={2}>
														<Link to={"#"} onClick={() => { deleteWorkoutFromTraining(training._id, workout._id) } }><CustomDeleteForeverOutlinedIcon /></Link>
													</HorizontalGrid>
												</HorizontalGrid>												
											</TableCell>
										</TableRow>
									))}
								<TableRow>
									<CustomTableCell className="separator">
										<HorizontalGrid container>
											<HorizontalGrid item xs>
												<Link to={`/associate/training/exercise/${routine._id}/${training._id}`}>Añadir series</Link>
											</HorizontalGrid>
										</HorizontalGrid>
									</CustomTableCell>
								</TableRow>
							</React.Fragment>
						))}
						<TableBottomRow>
							<TableCell>
								<Link to={`/create/training/${match.params.id}`}>
									<HorizontalGrid container spacing={1}>
										<HorizontalGrid item xs>
											<AddCircleOutlinedIcon color='secondary'/>
										</HorizontalGrid>
									</HorizontalGrid>
								</Link>
							</TableCell>
						</TableBottomRow>
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}

