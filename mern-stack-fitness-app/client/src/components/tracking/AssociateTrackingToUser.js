import React, {useState} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateTracking } from '../../api';
import { TrackingForm } from '../common/forms/tracking/TrackingForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const AssociateTrackingToUser = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const trackingRes = await associateTracking(data, match.params.id); // ID usuario
		if(trackingRes.response) {
			setError(trackingRes.response);
		}
		else {
			history.push(`/tracking/list/${match.params.id}`);
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear seguimiento
			</CustomTypography>
			<TrackingForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}