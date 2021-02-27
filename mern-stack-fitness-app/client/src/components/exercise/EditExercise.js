import React, {useState, useEffect} from 'react';
import { getExercise, updateExercise } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { ExerciseForm } from '../common/forms/exercise/ExerciseForm';

export const EditExercise = () => {
	const match = useRouteMatch();
	const [exercise, setExercise] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchExercise = async () => {
			const exercise = await getExercise(match.params.id);
			setExercise(exercise);
		}
		fetchExercise();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateExercise(data, match.params.id);
		history.push("/exercise/list");
	}

	return exercise ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar ejercicio</h3>
				<ExerciseForm exercise={exercise} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};