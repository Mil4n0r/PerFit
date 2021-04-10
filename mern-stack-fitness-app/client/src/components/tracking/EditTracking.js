import React, {useState, useEffect} from 'react';
import { getTracking, updateTracking } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { TrackingForm } from '../common/forms/tracking/TrackingForm';

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
		history.push("/tracking/list");
	}

	return tracking ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar seguimiento</h3>
				<TrackingForm tracking={tracking} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};