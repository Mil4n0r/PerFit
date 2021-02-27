import React from 'react';
import { useHistory } from 'react-router-dom';
import { createRoutine } from '../../api';
import { RoutineForm } from '../common/forms/routine/RoutineForm';

export const CreateRoutine = () => {
	const history = useHistory();
	
	const onSubmit = async (data) => {
		await createRoutine(data);	// Llamamos a la API para crear el ejercicio
		history.push("/routine/list");	// Redireccionamos al listado de ejercicio
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear rutina</h3>
				<RoutineForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}