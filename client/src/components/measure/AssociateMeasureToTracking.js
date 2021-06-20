import React, {useState, useEffect} from 'react';
import { useRouteMatch } from "react-router-dom";
import { getTracking } from '../../api';

import { CircularProgress } from '@material-ui/core';

import { BodyContainer } from '../../style/style';

import { MeasureList } from './MeasureList';

export const AssociateMeasureToTracking = () => {
	
	const match = useRouteMatch();

	const [tracking, setTracking] = useState();
	
	useEffect(() => {
		const fetchTracking = async () => {
			const tracking = await getTracking(match.params.id);
			setTracking(tracking);
		}
		fetchTracking();

		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	return tracking ? (
		<MeasureList tracking={tracking}/>
	) : (
		<BodyContainer>
			<CircularProgress/>
		</BodyContainer>
	);
}

