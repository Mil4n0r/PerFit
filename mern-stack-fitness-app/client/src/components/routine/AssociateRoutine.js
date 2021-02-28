import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateRoutine } from '../../api';
import { RoutineForm } from '../common/forms/routine/RoutineForm';

export const AssociateRoutine = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await associateRoutine(data, match.params.id);	// Llamamos a la API para crear el ejercicio
		history.push(`/routine/list/${match.params.id}`);	// Redireccionamos al listado de ejercicio
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