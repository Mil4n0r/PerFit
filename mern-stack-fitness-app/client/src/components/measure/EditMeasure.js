import React, {useState, useEffect} from 'react';
import { getMeasure, updateMeasure } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { MeasureForm } from '../common/forms/measure/MeasureForm';

export const EditMeasure = () => {
	const match = useRouteMatch();
	const [measure, setMeasure] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchMeasure = async () => {
			const measure = await getMeasure(match.params.id);
			setMeasure(measure);
		}
		fetchMeasure();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateMeasure(data, match.params.id);
		history.push(`/associate/tracking/measure/${match.params.trackingid}`);
	}

	return measure ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar medida</h3>
				<MeasureForm measure={measure} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};