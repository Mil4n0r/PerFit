import React, {useState, useEffect} from 'react';
import { getMeasure, updateMeasure, getTracking } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { MeasureForm } from '../common/forms/measure/MeasureForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditMeasure = () => {
	const match = useRouteMatch();
	const [measure, setMeasure] = useState();
	const [error, setError] = useState();
	const history = useHistory();

	const [trackingUnit, setTrackingUnit] = useState()

	useEffect(() => {
		const fetchMeasure = async () => {
			const measure = await getMeasure(match.params.id);
			setMeasure(measure);
		}
		const fetchTrackingUnit = async () => {
			const tracking = await getTracking(match.params.trackingid);
			setTrackingUnit(tracking.unidadObjetivo);
		}
		fetchMeasure();
		fetchTrackingUnit();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const updatedMeasure = await updateMeasure(data, match.params.id);
		if(updatedMeasure.response) {
			setError(updatedMeasure.response);
		}
		else {
			history.push(`/associate/tracking/measure/${match.params.trackingid}`);
		}
	}

	return measure ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar medida
			</CustomTypography>
			<MeasureForm measure={measure} unit={trackingUnit} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};