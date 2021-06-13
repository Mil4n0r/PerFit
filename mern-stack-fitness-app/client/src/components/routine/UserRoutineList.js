import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getRoutinesForUser, getUser } from '../../api';
import AuthContext from '../../context/AuthContext';

import { Table, TableBody, TableCell, Paper } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography as Typography, TableContainerWithMargin as TableContainer } from '../../style/style';

export const UserRoutineList = () => {
	const match = useRouteMatch();
	const [routines, setRoutines] = useState([])	// Creamos una variable de estado para almacenar la información de los ejercicios y una función para actualizarla
	const [user, setUser] = useState();

	const { loggedIn } = useContext(AuthContext);

	useEffect(() => {
		const fetchRoutines = async () => {
			const routines = await getRoutinesForUser(match.params.id);	// Llamamos a la API para obtener la información de los ejercicios
			setRoutines(routines);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los ejercicios
		}
		const fetchUser = async () => {
			const user = await getUser(match.params.id);
			setUser(user);
		}
		fetchRoutines();	// Llamamos aparte a fetchRoutines para no hacer el useEffect completo asíncrono (práctica no recomendada)
		fetchUser();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Listado de rutinas de {user?.userInfo?.aliasUsuario}
			</Typography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre de la rutina</TableHeaderCell>
							<TableHeaderCell>Tiempo de la rutina</TableHeaderCell>
							{
								loggedIn && loggedIn.role === "Administrador" ? (
									<TableHeaderCell align='center'><Link to={`/associate/routine/${match.params.id}`}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
								) :
									<TableHeaderCell align='center'>Acción</TableHeaderCell>
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{
							routines && routines.map(routine => (
								<TableRow key={routine._id}>
									<TableCell component="th" scope="row">{routine.nombrePlan}</TableCell>
									<TableCell>{routine.tiempoRutina} minutos</TableCell>
									<TableCell align='center'><Link to={`/routine/info/${routine._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
			<HorizontalGrid container>
				<HorizontalGrid item xs>
					<Link to={`/my/exercises`}>Ver mis ejercicios</Link>
				</HorizontalGrid>
			</HorizontalGrid>
		</BodyContainer>
	);
}