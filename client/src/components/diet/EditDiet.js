import React, {useState, useEffect} from 'react';
import { getDiet, updateDiet } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { DietForm } from '../common/forms/diet/DietForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditDiet = () => {
	const match = useRouteMatch();
	const [diet, setDiet] = useState();
	const [error, setError] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchDiet = async () => {
			const diet = await getDiet(match.params.id);
			setDiet(diet);
		}
		fetchDiet();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const updatedDiet = await updateDiet(data, match.params.id);
		if(updatedDiet.response) {
			setError(updatedDiet.response);
		}
		else {
			history.push(`/diet/list/${match.params.userid}`);
		}
	}

	return diet ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar dieta
			</CustomTypography>
			<DietForm diet={diet} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};