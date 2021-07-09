import React, { useState, useEffect } from 'react';
import { Link, Switch } from 'react-router-dom';
import { getMessagesForUser } from '../../api';
import { useRouteMatch } from "react-router-dom";

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import { Table, TableBody, TableCell, Paper, Checkbox, TextField, Grid, Typography, InputLabel, Divider, IconButton, InputAdornment, Switch as VisualSwitch } from '@material-ui/core';
import { HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer, ContainerWithPadding, NoMarginFormControlLabel as FormControlLabel } from '../../style/style';

import { getMessagesReceivedByUser, getMessagesSentByUser } from '../../api';

export const MessageList = () => {
	const match = useRouteMatch();
	const [messages, setMessages] = useState([]);	// Creamos una variable de estado para almacenar la información de los mensajes y una función para actualizarlos
	const [toggleSent, setToggleSent] = useState(false);

	useEffect(() => {
		const fetchMessages = async () => {
			var messages;
			if(toggleSent === false)
				messages = await getMessagesReceivedByUser(match.params.id);
			else 
				messages = await getMessagesSentByUser(match.params.id);
			setMessages(messages);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los mensajes
		}
		fetchMessages();	// Llamamos aparte a fetchMessages para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, [toggleSent]);

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Listado de mensajes
			</Typography>
			<ContainerWithPadding>
				<HorizontalGrid container spacing={1}>
					<HorizontalGrid item xs={6}>
					</HorizontalGrid>
					{
						<HorizontalGrid item xs={3}>
							<FormControlLabel
								control={
									<VisualSwitch 
										onChange={(e)=>setToggleSent(e.target.checked)} 
										name="toggleSent" 
									/>
								}
								label={toggleSent ? "Enviados" : "Recibidos"}
								labelPlacement="start"
							/>
						</HorizontalGrid>
					}
				</HorizontalGrid>
			</ContainerWithPadding>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Emisor</TableHeaderCell>
							<TableHeaderCell>Receptor</TableHeaderCell>
							<TableHeaderCell>Asunto</TableHeaderCell>
							<TableHeaderCell align="center">Acción</TableHeaderCell>							
						</TableRow>
					</TableHead>
					<TableBody>
						{messages.length > 0 && messages.map(message => (
							<TableRow key={message._id}>
								<TableCell component="th" scope="row">
									<Link to={`/user/profile/${message.emisorMensaje._id}`}>{message.emisorMensaje.aliasUsuario}</Link>
								</TableCell>
								<TableCell>
									<Link to={`/user/profile/${message.receptorMensaje._id}`}>{message.receptorMensaje.aliasUsuario}</Link>
								</TableCell>
								<TableCell>
									{message.asuntoMensaje}
								</TableCell>
								<TableCell align="center">
									<Link to={`/message/info/${message._id}`}><VisibilityOutlinedIcon color='primary'/></Link>
								</TableCell>
							</TableRow>
							
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}