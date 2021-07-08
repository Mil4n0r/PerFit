import React, {useState, useEffect} from 'react';
import { getFood } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import { getMessage } from '../../api';

import {Grid, Modal} from '@material-ui/core';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import {ContainerWithPadding, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin, PrimaryLink, CenterPaper} from '../../style/style'

import { getUser } from '../../api/user_api';

export const MessageInfo = () => {

	const match = useRouteMatch();
	const [message, setMessage] = useState();
	const [sender, setSender] = useState();
	const [receiver, setReceiver] = useState();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState();

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchMessage = async () => {
			const message = await getMessage(match.params.id);
			if(message.response) {
				setMessage(message.response);
			}
			else {
				setMessage(message);
			}
		}
		fetchMessage();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	useEffect(() => {
		const fetchUsers = async () => {
			if(message) {
				const sender = await getUser(message.messageInfo.emisorMensaje);
				if(sender.response) {
					setSender(sender.response);
				}
				else {
					setSender(sender);
				}
				const receiver = await getUser(message.messageInfo.receptorMensaje);
				if(receiver.response) {
					setReceiver(receiver.response);
				}
				else {
					setReceiver(receiver);
				}
			}
		}
		fetchUsers();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, [message]);

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Mensaje
			</Typography>
			{
				message && sender && receiver && (
					<>
					{
						console.log(message.messageInfo)
					}
						<VerticalGrid container spacing={1}>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Emisor</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={sender && sender.userInfo.aliasUsuario}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Receptor</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={receiver && receiver.userInfo.aliasUsuario}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Asunto</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={message.messageInfo.asuntoMensaje}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Contenido</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={message.messageInfo.contenidoMensaje}
										InputProps={{
											readOnly: true,
										}}
										multiline
										rows={10}
									/>
								</Grid>
							</HorizontalGrid>
						</VerticalGrid>
					</>
				)
			}
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	)
};