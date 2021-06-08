import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../api';

import { DeleteUser } from './DeleteUser';

import { Table, TableBody, TableCell, Paper } from '@material-ui/core';
import { HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

export const UserList = () => {
	const [users, setUsers] = useState([])	// Creamos una variable de estado para almacenar la información del usuario y una función para actualizarla

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();	// Llamamos a la API para obtener la información de los usuarios
			setUsers(users);	// Actualizamos la información de nuestra variable de estado para que contenga la información del usuario
		}
		fetchUsers();	// Llamamos aparte a fetchUsers para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de usuarios
			</CustomTypography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Alias</TableHeaderCell>
							<TableHeaderCell>Email</TableHeaderCell>
							<TableHeaderCell>Rol</TableHeaderCell>
							<TableHeaderCell>Perfil</TableHeaderCell>
							<TableHeaderCell align="center">Acción</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow key={user._id}>
								<TableCell>
									{user.aliasUsuario}
								</TableCell>
								<TableCell>
									{user.emailUsuario}
								</TableCell>
								<TableCell>
									{user.role}
								</TableCell>
								<TableCell>
									{user.privacidadUsuario}
								</TableCell>
								<TableCell align="center">
									<Link to={`/user/profile/${user._id}`}><AccountBoxOutlinedIcon color='primary' /></Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}