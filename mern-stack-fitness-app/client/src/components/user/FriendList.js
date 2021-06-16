import React, { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getFriendsForUser } from '../../api';

import { Table, TableBody, TableCell, Paper, Modal } from '@material-ui/core';
import { CenterPaper, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';

import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

import {DeleteFriend} from './DeleteFriend'

export const FriendList = () => {
	const match = useRouteMatch();
	const [friends, setFriends] = useState([])	// Creamos una variable de estado para almacenar la información del usuario y una función para actualizarla
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState();

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchFriends = async () => {
			const friends = await getFriendsForUser(match.params.id);	// Llamamos a la API para obtener la información de los usuarios
			setFriends(friends);	// Actualizamos la información de nuestra variable de estado para que contenga la información del usuario
		}
		fetchFriends();	// Llamamos aparte a fetchUsers para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, [open]);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de amigos
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
						{friends.map(friend => (
							<TableRow key={friend._id}>
								<TableCell>
									{friend.aliasUsuario}
								</TableCell>
								<TableCell>
									{friend.emailUsuario}
								</TableCell>
								<TableCell>
									{friend.role}
								</TableCell>
								<TableCell>
									{friend.privacidadUsuario}
								</TableCell>
								<TableCell>
									<HorizontalGrid container spacing={1}>
										<HorizontalGrid item xs>
											<Link to={`/user/profile/${friend._id}`}><AccountBoxOutlinedIcon color='primary' /></Link>
										</HorizontalGrid>
										<HorizontalGrid item xs>
											<Link to={"#"} onClick={() => { setSelected(friend._id); handleOpen()}}><PersonAddDisabledOutlinedIcon color='secondary'/></Link>
										</HorizontalGrid>
									</HorizontalGrid>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<HorizontalGrid container>
				<HorizontalGrid item xs>
					<Link to={`/user/list`}>Buscar amigos</Link>
				</HorizontalGrid>
			</HorizontalGrid>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<CenterPaper><DeleteFriend setOpen={setOpen} friend={selected}/></CenterPaper>
			</Modal>
		</BodyContainer>
	);
}