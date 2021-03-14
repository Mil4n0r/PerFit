import React, {useState, useEffect} from 'react';
import { getExercise } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const ExerciseInfo = () => {

	const match = useRouteMatch();
	const [exercise, setExercise] = useState();

	useEffect(() => {
		const fetchExercise = async () => {
			const exercise = await getExercise(match.params.id);
			setExercise(exercise);
		}
		fetchExercise();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
	<>
		<h1>Ejercicio</h1>
		{
			exercise && (
				<>
					<p>Nombre: {exercise.exerciseInfo.nombreEjercicio}</p>
					<p>Tipo: {exercise.exerciseInfo.tipoEjercicio}</p>
					{
						exercise.permission.includes('write') && (
							<Link to={`/edit/exercise/${exercise.exerciseInfo._id}`}>Editar</Link>
						)
					}
					{
						exercise.permission.includes('delete') && (
							<Link to={`/delete/exercise/${exercise.exerciseInfo._id}`}>Eliminar</Link>
						)
					}
				</>
			)
		}
	</>
	)
};