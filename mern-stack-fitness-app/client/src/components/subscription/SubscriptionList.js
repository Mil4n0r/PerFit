import React, { useState, useEffect, useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { getSubscriptions } from '../../api';
import AuthContext from '../../context/AuthContext';

import {format, parseISO} from 'date-fns';
import { es } from 'date-fns/locale'

import { Table, TableBody, TableCell, Paper, Card, CardContent } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { FullWidthCard, CustomCardContent, HorizontalGrid, ButtonAvatar, CustomTypography as Typography, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer, ContainerWithPadding } from '../../style/style';

import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { getUser } from '../../api/user_api';

export const SubscriptionList = () => {
	const [subscriptions, setSubscriptions] = useState([])	// Creamos una variable de estado para almacenar la información de la sala y una función para actualizarla
	const [user, setUser] = useState();
	const match = useRouteMatch();
	const { loggedIn } = useContext(AuthContext);

	useEffect(() => {
		const fetchSubscriptions = async () => {
			const subscriptions = await getSubscriptions();	// Llamamos a la API para obtener la información de los alimentos
			setSubscriptions(subscriptions);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		const fetchUser = async () => {
			if(match.params.id) {
				const user = await getUser(match.params.id);
				setUser(user);
			}
		}
		fetchSubscriptions();	// Llamamos aparte a fetchSubscriptions para no hacer el useEffect completo asíncrono (práctica no recomendada)
		fetchUser();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			{
				user && user.userInfo.role === "Miembro" && (
					<ContainerWithPadding>
						<CustomTypography component="h2" variant="h5">
							Suscripción activa:
						</CustomTypography>
						<FullWidthCard className="bg">
							<CardContent>
								<Typography component="h3" variant="h6">
									{user.userInfo.suscripcionMiembro.planSuscripcion.nombreSuscripcion}
								</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									{user.userInfo.suscripcionMiembro.planSuscripcion.descripcionSuscripcion}
								</Typography>
								<Typography variant="subtitle2" color="textSecondary">
									{`${user.userInfo.suscripcionMiembro.planSuscripcion.costeSuscripcion}€ / ${user.userInfo.suscripcionMiembro.planSuscripcion.costeSuscripcion} P-Coins`}
								</Typography>
								<Typography variant="subtitle2" color={new Date(user.userInfo.suscripcionMiembro.fechaVencimiento) > new Date() ? "textSecondary" : "error"}>
									Fecha de caducidad: {format(parseISO(user.userInfo.suscripcionMiembro.fechaVencimiento), 'dd/MM/yyyy')}
								</Typography>
							</CardContent>
						</FullWidthCard>
					</ContainerWithPadding>
				)
			}
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
							<TableHeaderCell>Duración de la suscripción</TableHeaderCell>
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
								<TableCell>{subscription.costeSuscripcion}€ / {subscription.costeSuscripcionPCoins} P-Coins</TableCell>
								<TableCell>{subscription.duracionSuscripcion} días</TableCell>
								<TableCell align='center'><Link to={`/subscription/info/${subscription._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}