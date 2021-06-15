import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addTraining} from '../../api';
import { TrainingForm } from '../common/forms/training/TrainingForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateTraining = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await addTraining(data, match.params.id); // ID rutina
		history.push(`/associate/routine/training/${match.params.id}`);
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear entrenamiento
			</CustomTypography>
			<TrainingForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}