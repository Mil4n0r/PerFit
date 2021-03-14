import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExercises } from '../../api';

export const ExerciseList = () => {
	const [exercises, setExercises] = useState([])	// Creamos una variable de estado para almacenar la información de los ejercicios y una función para actualizarla

	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await getExercises();	// Llamamos a la API para obtener la información de los ejercicios
			setExercises(exercises);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los ejercicios
		}
		fetchExercises();	// Llamamos aparte a fetchExercises para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Ejercicios</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Nombre del ejercicio</th>
							<th>Tipo de ejercicio</th>
						</tr>
					</thead>
					<tbody>
						{
							exercises.map(exercise => (
								<tr key={exercise._id}>
									<td>
										{exercise.nombreEjercicio}
									</td>
									<td>
										{exercise.tipoEjercicio}
									</td>
									<td>
										<Link to={`/exercise/info/${exercise._id}`}>Ver</Link>
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