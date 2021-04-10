import React from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateTracking } from '../../api';
import { TrackingForm } from '../common/forms/tracking/TrackingForm';

export const AssociateTrackingToUser = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await associateTracking(data, match.params.id); // ID usuario
		history.push(`/tracking/list/${match.params.id}`);
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Asociar seguimiento</h3>
				<TrackingForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}