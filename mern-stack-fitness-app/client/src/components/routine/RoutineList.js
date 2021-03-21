import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRoutines } from '../../api';

export const RoutineList = () => {
	const [routines, setRoutines] = useState([])	// Creamos una variable de estado para almacenar la información de los ejercicios y una función para actualizarla

	useEffect(() => {
		const fetchRoutines = async () => {
			const routines = await getRoutines();	// Llamamos a la API para obtener la información de los ejercicios
			setRoutines(routines);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los ejercicios
		}
		fetchRoutines();	// Llamamos aparte a fetchRoutines para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Rutinas</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Nombre de la rutina</th>
							<th>Tiempo de la rutina</th>
							<th>Usuario asociado a la rutina</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{
							routines.map(routine => (
								<tr key={routine._id}>
									<td>
										{routine.nombrePlan}
									</td>
									<td>
										{routine.tiempoRutina}
									</td>
									<td>
										{routine.usuarioPlan}
									</td>
									<td>
										<Link to={`/edit/routine/${routine._id}`}>Editar</Link>
										<Link to={`/delete/routine/${routine._id}`}>Eliminar</Link>
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