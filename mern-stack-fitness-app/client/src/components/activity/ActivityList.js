import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getActivities } from '../../api';
import AuthContext from '../../context/AuthContext';

import { Table, TableBody, TableCell, Paper, Modal, Button } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';

export const ActivityList = () => {
	const [activities, setActivities] = useState([])	// Creamos una variable de estado para almacenar la información del alimentos y una función para actualizarla

	const { loggedIn } = useContext(AuthContext);

	useEffect(() => {
		const fetchActivities = async () => {
			const activities = await getActivities();	// Llamamos a la API para obtener la información de los alimentos
			setActivities(activities);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchActivities();	// Llamamos aparte a fetchActivities para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de actividades
			</CustomTypography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre de la actividad</TableHeaderCell>
							<TableHeaderCell>Equipamiento de la actividad</TableHeaderCell>
							<TableHeaderCell>Descripción</TableHeaderCell>
							{
								loggedIn.role === "Administrador" ? (
									<TableHeaderCell align='center'><Link to={'/create/activity'}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
								) :
								<TableHeaderCell align='center'>Acción</TableHeaderCell>
							}
							
						</TableRow>
					</TableHead>
					<TableBody>
						{activities.map(activity => (
							<TableRow key={activity._id}>
								<TableCell component="td" scope="row">{activity.nombreActividad}</TableCell>
								<TableCell>{activity.equipamientoActividad}</TableCell>
								<TableCell>{activity.descripcionActividad}</TableCell>
								<TableCell align='center'><Link to={`/activity/info/${activity._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}