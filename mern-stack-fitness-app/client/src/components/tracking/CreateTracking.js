import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { createTracking } from '../../api';
import { TrackingForm } from '../common/forms/tracking/TrackingForm';

export const CreateTracking = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await createTracking(data);	// Llamamos a la API para crear el seguimiento
		history.push("/tracking/list");	// Redireccionamos al listado de seguimientos
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear seguimiento</h3>
				<TrackingForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}