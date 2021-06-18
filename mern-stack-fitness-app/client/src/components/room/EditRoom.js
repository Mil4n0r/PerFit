import React, {useState, useEffect} from 'react';
import { getRoom, updateRoom } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { RoomForm } from '../common/forms/room/RoomForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditRoom = () => {
	const match = useRouteMatch();
	const [room, setRoom] = useState();
	const [error, setError] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchRoom = async () => {
			const room = await getRoom(match.params.id);
			setRoom(room);
		}
		fetchRoom();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const updatedRoom = await updateRoom(data, match.params.id);
		if(updatedRoom.response) {
			setError(updatedRoom.response);
		}
		else {
			history.push("/room/list");
		}
	}

	return room ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar sala
			</CustomTypography>
			<RoomForm room={room} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};