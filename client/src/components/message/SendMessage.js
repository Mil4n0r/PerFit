import React, {useState, useContext, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { sendMessage, getUser} from '../../api';
import { MessageForm } from '../common/forms/message/MessageForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

import AuthContext from '../../context/AuthContext'

export const SendMessage = () => {
	const match = useRouteMatch();
	const history = useHistory();
	const [receiver, setReceiver] = useState();
	const [error, setError] = useState();

	const { loggedIn } = useContext(AuthContext);

	useEffect(() => {
		const fetchReceiver = async () => {
			const receiver = await getUser(match.params.id);
			if(receiver.response) {
				setError(receiver.response);
			}
			else {
				setReceiver(receiver.userInfo);
			}
		}
		fetchReceiver();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	const onSubmit = async (data) => {
		const sentMessage = await sendMessage(data, match.params.id);
		if(sentMessage.response) {
			setError(sentMessage.response);
		}
		else {
			history.push(`/message/list/${loggedIn._id}`);
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Enviar mensaje
			</CustomTypography>
			{loggedIn && receiver && (
				<MessageForm sender={loggedIn} receiver={receiver} onSubmit={onSubmit} />
			)}
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}