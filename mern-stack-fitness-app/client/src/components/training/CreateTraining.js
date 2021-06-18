import React, {useState} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addTraining} from '../../api';
import { TrainingForm } from '../common/forms/training/TrainingForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CreateTraining = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const createdTraining = await addTraining(data, match.params.id); // ID rutina
		if(createdTraining.response) {
			setError(createdTraining.response);
		}
		else {
			history.push(`/associate/routine/training/${match.params.id}`);
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear entrenamiento
			</CustomTypography>
			<TrainingForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}