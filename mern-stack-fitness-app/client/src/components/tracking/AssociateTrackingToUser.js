import React from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateTracking } from '../../api';
import { TrackingForm } from '../common/forms/tracking/TrackingForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const AssociateTrackingToUser = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await associateTracking(data, match.params.id); // ID usuario
		history.push(`/tracking/list/${match.params.id}`);
	};

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Crear seguimiento
			</CustomTypography>
			<TrackingForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}