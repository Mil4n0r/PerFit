import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getExercisesCreated } from '../../api';

import { Table, TableBody, TableCell, Paper } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import { HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';

import AuthContext from '../../context/AuthContext';

export const MyExercises = () => {
	const [exercises, setExercises] = useState([])	// Creamos una variable de estado para almacenar la información de los ejercicios y una función para actualizarla

	const { loggedIn } = useContext(AuthContext);

	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await getExercisesCreated(loggedIn._id);	// Llamamos a la API para obtener la información de los ejercicios
			setExercises(exercises);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los ejercicios
		}
		fetchExercises();	// Llamamos aparte a fetchExercises para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de ejercicios creados por mi
			</CustomTypography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre</TableHeaderCell>
							<TableHeaderCell>Tipo</TableHeaderCell>
							<TableHeaderCell align='center'>
								<Link to={'/create/exercise'}><AddCircleOutlinedIcon color='secondary'/></Link>
							</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{exercises.map(exercise => (
							<TableRow key={exercise._id}>
								<TableCell component="th" scope="row">{exercise.nombreEjercicio}</TableCell>
								<TableCell>{exercise.tipoEjercicio}</TableCell>
								<TableCell>
									<HorizontalGrid container spacing={1}>
										<HorizontalGrid item xs>
											<Link to={`/exercise/info/${exercise._id}`}>
												<VisibilityOutlinedIcon color='primary'/>
											</Link>
										</HorizontalGrid>
									</HorizontalGrid>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}