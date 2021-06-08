import React from 'react';
import { useHistory } from 'react-router-dom';
import { createRoom } from '../../api';
import { RoomForm } from '../common/forms/room/RoomForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateRoom = () => {
	const history = useHistory();
	const onSubmit = async (data) => {
		await createRoom(data);
		history.push("/room/list");
	};

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Crear sala
			</CustomTypography>
			<RoomForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}