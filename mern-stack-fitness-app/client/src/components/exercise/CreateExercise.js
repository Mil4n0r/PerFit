import React from 'react';
import { useHistory } from 'react-router-dom';
import { createExercise } from '../../api';
import { ExerciseForm } from '../common/forms/exercise/ExerciseForm';

export const CreateExercise = () => {
	const history = useHistory();
	
	const onSubmit = async (data) => {
		await createExercise(data);	// Llamamos a la API para crear el ejercicio
		history.push("/exercise/list");	// Redireccionamos al listado de ejercicio
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear ejercicio</h3>
				<ExerciseForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}