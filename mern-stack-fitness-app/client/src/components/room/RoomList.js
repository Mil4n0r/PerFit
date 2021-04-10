import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRooms } from '../../api';

export const RoomList = () => {
	const [rooms, setRooms] = useState([])	// Creamos una variable de estado para almacenar la información de la sala y una función para actualizarla

	useEffect(() => {
		const fetchRooms = async () => {
			const rooms = await getRooms();	// Llamamos a la API para obtener la información de los alimentos
			setRooms(rooms);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchRooms();	// Llamamos aparte a fetchRooms para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Salas</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Nombre de la sala</th>
							<th>Equipamiento de la sala</th>
							<th>Aforo</th>
						</tr>
					</thead>
					<tbody>
						{
							rooms.map(room => (
								<tr key={room._id}>
									<td>
										{room.nombreSala}
									</td>
									<td>
										{room.equipamientoSala}
									</td>
									<td>
										{room.aforoSala}
									</td>
									<td>
										<Link to={`/room/info/${room._id}`}>Ver</Link>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}