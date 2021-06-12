import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { getRation, updateRation } from '../../api';
import { RationForm } from '../common/forms/meal/RationForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const EditRation = () => {
	const match = useRouteMatch();
	const [ration, setRation] = useState();
	const history = useHistory();
	useEffect(() => {
		const fetchRation = async() => {
			const ration = await getRation(match.params.dietid, match.params.id);
			setRation(ration);
		}
		fetchRation();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateRation(match.params.dietid, match.params.id, data);
		history.push(`/associate/diet/meal/${match.params.dietid}`);
	};

	return ration ? (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Editar ración
			</CustomTypography>
			<RationForm ration={ration} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
}