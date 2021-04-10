import React, {useState, useEffect} from 'react';
import { getRoom } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const RoomInfo = () => {

	const match = useRouteMatch();
	const [room, setRoom] = useState();

	useEffect(() => {
		const fetchRoom = async () => {
			const room = await getRoom(match.params.id);
			setRoom(room);
		}
		fetchRoom();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
	<>
		<h1>Sala</h1>
		{
			room && (
				<>
					<p>Nombre: {room.roomInfo.nombreSala}</p>
					<p>Equipamiento: {room.roomInfo.equipamientoSala}</p>
					<p>Aforo: {room.roomInfo.aforoSala}</p>
					{
						room.permission.includes('write') && (
							<Link to={`/edit/room/${room.roomInfo._id}`}>Editar</Link>
						)
					}
					{
						room.permission.includes('delete') && (
							<Link to={`/delete/room/${room.roomInfo._id}`}>Eliminar</Link>
						)
					}
				</>
			)
		}
	</>
	)
};