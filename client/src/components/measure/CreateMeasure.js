import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addMeasure, getTracking } from '../../api';
import { MeasureForm } from '../common/forms/measure/MeasureForm';
import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CreateMeasure = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const [trackingUnit, setTrackingUnit] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		const fetchTrackingUnit = async () => {
			const tracking = await getTracking(match.params.id);
			setTrackingUnit(tracking.unidadObjetivo);
		}
		fetchTrackingUnit();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const createdMeasure = await addMeasure(data, match.params.id); // ID seguimiento
		if(createdMeasure.response) {
			setError(createdMeasure.response);
		}
		else {
			history.push(`/associate/tracking/measure/${match.params.id}`);
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear medida
			</CustomTypography>
			<MeasureForm unit={trackingUnit} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	)
}