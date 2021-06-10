import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getTrackingsForUser, getUser } from '../../api';
import AuthContext from '../../context/AuthContext';

import { Table, TableBody, TableCell, Paper, List, ListItem, Divider, Grid } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { CustomListItemText as ListItemText, NutrientBar, VerticalDivider, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography as Typography, TableContainerWithMargin as TableContainer } from '../../style/style';

export const UserTrackingList = () => {
	const [trackings, setTrackings] = useState([])	// Creamos una variable de estado para almacenar la información de los seguimientos y una función para actualizarla
	const [user, setUser] = useState();

	const { loggedIn } = useContext(AuthContext);

	const match = useRouteMatch();
	
	useEffect(() => {
		const fetchTrackings = async () => {
			const trackings = await getTrackingsForUser(match.params.id);	// Llamamos a la API para obtener la información de los seguimientos del usuario
			setTrackings(trackings);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los seguimientos del usuario
		}
		const fetchUser = async () => {
			const user = await getUser(match.params.id);
			setUser(user);
		}
		fetchTrackings();	// Llamamos aparte a fetchTrackings para no hacer el useEffect completo asíncrono (práctica no recomendada)
		fetchUser();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Listado de seguimientos de {user?.userInfo?.aliasUsuario || "???"}
			</Typography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre del seguimiento</TableHeaderCell>
							<TableHeaderCell>Valor objetivo</TableHeaderCell>
							{}
							{
								loggedIn && loggedIn.role === "Administrador" ? (
									<TableHeaderCell align='center'><Link to={`/associate/tracking/${user?.userInfo?._id}`}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
								) :
									<TableHeaderCell align='center'>Acción</TableHeaderCell>
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{trackings.map(tracking => (
							<TableRow key={tracking._id}>
								<TableCell component="th" scope="row">{tracking.nombrePlan}</TableCell>
								<TableCell>{tracking.valorObjetivo} {tracking.unidadObjetivo}</TableCell>
								<TableCell align='center'><Link to={`/tracking/info/${tracking._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}