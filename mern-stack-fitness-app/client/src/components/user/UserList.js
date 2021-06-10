import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getUsersMatching } from '../../api';
import AuthContext from '../../context/AuthContext';

import { DeleteUser } from './DeleteUser';

import { Table, TableBody, TableCell, Paper, Checkbox, TextField, Grid, Typography, InputLabel, Divider, IconButton, InputAdornment } from '@material-ui/core';
import { HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer, ContainerWithPadding, NoMarginFormControlLabel as FormControlLabel } from '../../style/style';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

export const UserList = () => {

	const { loggedIn } = useContext(AuthContext);

	const [users, setUsers] = useState([])	// Creamos una variable de estado para almacenar la información del usuario y una función para actualizarla
	const [search, setSearch] = useState();
	const [toggleInactive, setToggleInactive] = useState(false);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsersMatching(toggleInactive, search);	// Llamamos a la API para obtener la información de los usuarios
			setUsers(users);	// Actualizamos la información de nuestra variable de estado para que contenga la información del usuario
		}
		fetchUsers();	// Llamamos aparte a fetchUsers para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, [search, toggleInactive]);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de usuarios
			</CustomTypography>
			<ContainerWithPadding>
				<HorizontalGrid container spacing={1}>
					<HorizontalGrid item xs={6}>
						<TextField
							variant="outlined"
							fullWidth
							type="text"
							onChange={(e)=>setSearch(e.target.value)}
							placeholder="Buscar usuarios"
							InputProps={{endAdornment: <InputAdornment position="end"><SearchOutlinedIcon /></InputAdornment>}}
						/>
					</HorizontalGrid>
					{
						loggedIn && loggedIn.role === "Administrador" && (
							<HorizontalGrid item xs={3}>
								<FormControlLabel
									control={
										<Checkbox 
											onChange={(e)=>setToggleInactive(e.target.checked)} 
											name="toggleInactive" 
										/>
									}
									label="Pendientes de activación"
									labelPlacement="start"
								/>
							</HorizontalGrid>
						)
					}
					
				</HorizontalGrid>
			</ContainerWithPadding>
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
									<Link to={`/user/profile/${user._id}`}><AccountBoxOutlinedIcon color={user.cuentaActivada ? 'primary' : 'secondary'}/></Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}