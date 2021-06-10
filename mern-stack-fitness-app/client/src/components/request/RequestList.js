import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRequestsForUser } from '../../api';
import { useRouteMatch } from "react-router-dom";

import { Grid, Table, TableBody, TableCell, Paper } from '@material-ui/core';

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import { CenterPaper, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography as Typography, TableContainerWithMargin as TableContainer, HorizontalGrid } from '../../style/style';

import { acceptFriendRequest, rejectFriendRequest, acceptTrainingRequest, rejectTrainingRequest } from '../../api';

export const RequestList = () => {
	const match = useRouteMatch();
	const [requests, setRequests] = useState([])	// Creamos una variable de estado para almacenar la información de las solicitudes y una función para actualizarlas
	const [updated, setUpdated] = useState()

	const acceptRequest = async (req) => {
		const requestId = req._id;
		const requestType = req.tipoPeticion;

		if(requestType === "Amistad") {
			await acceptFriendRequest(requestId);
		}
		else if(requestType === "Entrenamiento") {
			await acceptTrainingRequest(requestId);
		}
		setUpdated(requestId);
	}
	
	const rejectRequest = async (req) => {
		const requestId = req._id;
		const requestType = req.tipoPeticion;
	
		if(requestType === "Amistad") {
			await rejectFriendRequest(requestId);
		}
		else if(requestType === "Entrenamiento") {
			await rejectTrainingRequest(requestId);
		}
		setUpdated(requestId);
	}

	useEffect(() => {
		const fetchRequests = async () => {
			const requests = await getRequestsForUser(match.params.id);	// Llamamos a la API para obtener la información de las solcitudes
			setRequests(requests);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las solicitudes
		}
		fetchRequests();	// Llamamos aparte a fetchRequests para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, [updated]);

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Listado de solicitudes
			</Typography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Solicitante</TableHeaderCell>
							<TableHeaderCell>Tipo de solicitud</TableHeaderCell>
							<TableHeaderCell align="center">Acción</TableHeaderCell>							
						</TableRow>
					</TableHead>
					<TableBody>
						{requests.map(request => (
							<TableRow key={request._id}>
								<TableCell component="th" scope="row">
									<Link to={`/user/profile/${request.usuarioSolicitante._id}`}>{request.usuarioSolicitante.aliasUsuario}</Link>
								</TableCell>
								<TableCell>
									{request.tipoPeticion}
								</TableCell>
								<TableCell>
									<HorizontalGrid container spacing={1}>
										<HorizontalGrid item xs>
											<Link to={"#"} onClick={() => { acceptRequest(request) } }><CheckCircleOutlinedIcon color='primary'/></Link>
										</HorizontalGrid>
										<HorizontalGrid item xs>
											<Link to={"#"} onClick={() => { rejectRequest(request) } }><CancelOutlinedIcon color='secondary'/></Link>
										</HorizontalGrid>
									</HorizontalGrid>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}