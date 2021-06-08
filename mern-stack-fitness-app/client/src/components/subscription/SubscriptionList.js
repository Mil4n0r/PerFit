import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getSubscriptions } from '../../api';
import AuthContext from '../../context/AuthContext';

import { Table, TableBody, TableCell, Paper } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';

export const SubscriptionList = () => {
	const [subscriptions, setSubscriptions] = useState([])	// Creamos una variable de estado para almacenar la información de la sala y una función para actualizarla

	const { loggedIn } = useContext(AuthContext);

	useEffect(() => {
		const fetchSubscriptions = async () => {
			const subscriptions = await getSubscriptions();	// Llamamos a la API para obtener la información de los alimentos
			setSubscriptions(subscriptions);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchSubscriptions();	// Llamamos aparte a fetchSubscriptions para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de suscripciones
			</CustomTypography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre de la suscripción</TableHeaderCell>
							<TableHeaderCell>Descripción</TableHeaderCell>
							<TableHeaderCell>Coste de la suscripción</TableHeaderCell>
							<TableHeaderCell>Fecha límite de la suscripción</TableHeaderCell>
							{
								loggedIn && loggedIn.role === "Administrador" ? (
									<TableHeaderCell align='center'><Link to={'/create/subscription'}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
								) :
									<TableHeaderCell align='center'>Acción</TableHeaderCell>
							}
							
						</TableRow>
					</TableHead>
					<TableBody>
						{subscriptions.map(subscription => (
							<TableRow key={subscription._id}>
								<TableCell component="th" scope="row">{subscription.nombreSuscripcion}</TableCell>
								<TableCell>{subscription.descripcionSuscripcion}</TableCell>
								<TableCell>{subscription.costeSuscripcion}</TableCell>
								<TableCell>{subscription.vencimientoSuscripcion}</TableCell>
								<TableCell align='center'><Link to={`/subscription/info/${subscription._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}