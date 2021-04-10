import React, {useState, useEffect} from 'react';
import { getRoom, updateRoom } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { RoomForm } from '../common/forms/room/RoomForm';

export const EditRoom = () => {
	const match = useRouteMatch();
	const [room, setRoom] = useState();
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
		await updateRoom(data, match.params.id);
		history.push("/room/list");
	}

	return room ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar sala</h3>
				<RoomForm room={room} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};