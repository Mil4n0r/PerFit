import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getClasses } from '../../api';
import AuthContext from '../../context/AuthContext';

import { Table, TableBody, TableCell, Paper, Modal, Button } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';

const formatCapacity = (usersJoined, roomCapacity) => {
	return roomCapacity ? `${usersJoined} / ${roomCapacity}` : usersJoined;
}

export const ClassList = () => {
	const [classes, setClasses] = useState([])	// Creamos una variable de estado para almacenar la información de las clases y una función para actualizarla

	const { loggedIn } = useContext(AuthContext);

	useEffect(() => {
		const fetchClasses = async () => {
			const classes = await getClasses();	// Llamamos a la API para obtener la información de las clases
			setClasses(classes);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los ejercicios
		}
		fetchClasses();	// Llamamos aparte a fetchClasses para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de clases
			</CustomTypography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Actividad de la clase</TableHeaderCell>
							<TableHeaderCell>Fecha y hora de la clase</TableHeaderCell>
							<TableHeaderCell>Monitor de la clase</TableHeaderCell>
							<TableHeaderCell>Sala de la clase</TableHeaderCell>
							<TableHeaderCell>Asistentes de la clase</TableHeaderCell>
							{
								loggedIn?.role === "Administrador" ? (
									<TableHeaderCell align='center'><Link to={'/create/class'}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
								) :
									<TableHeaderCell align='center'>Acción</TableHeaderCell>
							}							
						</TableRow>
					</TableHead>
					<TableBody>
						{classes.map(sclass => (
							<TableRow key={sclass._id}>
								<TableCell component="th" scope="row"> {sclass.actividadClase?.nombreActividad}</TableCell>
								<TableCell>{sclass.diaClase}</TableCell>
								<TableCell>
									{sclass.monitorClase?.aliasUsuario}
								</TableCell>
								<TableCell>{sclass.salaClase?.nombreSala}</TableCell>
								<TableCell>{formatCapacity(sclass.asistentesClase?.length, sclass.salaClase?.aforoSala)}</TableCell>
								<TableCell align='center'><Link to={`/class/info/${sclass._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}