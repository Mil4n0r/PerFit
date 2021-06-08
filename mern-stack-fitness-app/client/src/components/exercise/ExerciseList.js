import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExercises } from '../../api';

import { Table, TableBody, TableCell, Paper } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

import { CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';


export const ExerciseList = (props) => {
	const [exercises, setExercises] = useState([])	// Creamos una variable de estado para almacenar la información de los ejercicios y una función para actualizarla

	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await getExercises();	// Llamamos a la API para obtener la información de los ejercicios
			setExercises(exercises);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los ejercicios
		}
		fetchExercises();	// Llamamos aparte a fetchExercises para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de ejercicios
			</CustomTypography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre</TableHeaderCell>
							<TableHeaderCell>Tipo</TableHeaderCell>
							<TableHeaderCell align='center'>
								{
									props && props.training ? (
										<Link to={`/create/exercise/${props.routine}/${props.training}`}><AddCircleOutlinedIcon color='secondary'/></Link>
									) : 
										<Link to={'/create/exercise'}><AddCircleOutlinedIcon color='secondary'/></Link>
								}
							</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{exercises.map(exercise => (
							<TableRow key={exercise._id}>
								<TableCell component="th" scope="row">{exercise.nombreEjercicio}</TableCell>
								<TableCell>{exercise.tipoEjercicio}</TableCell>
								{ 
									props && props.training ? (
										<TableCell align="center"><Link to={`/create/workout/${props.routine}/${props.training}/${exercise._id}`}><ArrowForwardOutlinedIcon/></Link></TableCell>
									) :
										<TableCell align='center'><Link to={`/exercise/info/${exercise._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
								}
								
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}