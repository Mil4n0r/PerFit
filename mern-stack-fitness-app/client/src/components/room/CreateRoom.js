import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { createRoom } from '../../api';
import { RoomForm } from '../common/forms/room/RoomForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CreateRoom = () => {
	const history = useHistory();

	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const createdRoom = await createRoom(data);
		if(createdRoom.response) {
			setError(createdRoom.response);
		}
		else {
			history.push("/room/list");
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear sala
			</CustomTypography>
			<RoomForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}