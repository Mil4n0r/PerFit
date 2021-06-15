import React, {useState, useEffect} from 'react';
import { getTracking, updateTracking } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { TrackingForm } from '../common/forms/tracking/TrackingForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const EditTracking = () => {
	const match = useRouteMatch();
	const [tracking, setTracking] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchTracking = async () => {
			const tracking = await getTracking(match.params.id);
			setTracking(tracking);
		}
		fetchTracking();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateTracking(data, match.params.id);
		history.push(`/tracking/list/${match.params.userid}`);
	}

	return tracking ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar seguimiento
			</CustomTypography>
			<TrackingForm tracking={tracking} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
};