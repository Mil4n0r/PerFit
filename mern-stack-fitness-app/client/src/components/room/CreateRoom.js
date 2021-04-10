import React from 'react';
import { useHistory } from 'react-router-dom';
import { createRoom } from '../../api';
import { RoomForm } from '../common/forms/room/RoomForm';

export const CreateRoom = () => {
	const history = useHistory();
	const onSubmit = async (data) => {
		await createRoom(data);
		history.push("/room/list");
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear actividad</h3>
				<RoomForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}