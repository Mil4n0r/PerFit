import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getRooms } from '../../api';
import AuthContext from '../../context/AuthContext';

import { Table, TableBody, TableCell, Paper } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';

export const RoomList = () => {
	const [rooms, setRooms] = useState([])	// Creamos una variable de estado para almacenar la información de la sala y una función para actualizarla

	const { loggedIn } = useContext(AuthContext);

	useEffect(() => {
		const fetchRooms = async () => {
			const rooms = await getRooms();	// Llamamos a la API para obtener la información de los alimentos
			setRooms(rooms);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchRooms();	// Llamamos aparte a fetchRooms para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de salas
			</CustomTypography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre de la sala</TableHeaderCell>
							<TableHeaderCell>Equipamiento de la sala</TableHeaderCell>
							<TableHeaderCell>Aforo</TableHeaderCell>
							{
								loggedIn && loggedIn.role === "Administrador" ? (
									<TableHeaderCell align='center'><Link to={'/create/room'}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
								) :
									<TableHeaderCell align='center'>Acción</TableHeaderCell>
							}
							
						</TableRow>
					</TableHead>
					<TableBody>
						{rooms.map(room => (
							<TableRow key={room._id}>
								<TableCell component="th" scope="row">{room.nombreSala}</TableCell>
								<TableCell>{room.equipamientoSala}</TableCell>
								<TableCell>{room.aforoSala}</TableCell>
								<TableCell align='center'><Link to={`/room/info/${room._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}