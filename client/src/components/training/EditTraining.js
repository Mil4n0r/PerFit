import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { updateTraining, getTraining } from '../../api';
import { TrainingForm } from '../common/forms/training/TrainingForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditTraining = () => {
	const match = useRouteMatch();
	const [training, setTraining] = useState();
	const [error, setError] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchTraining = async() => {
			const training = await getTraining(match.params.routineid, match.params.id);
			setTraining(training);
		}
		fetchTraining();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const updatedTraining = await updateTraining(match.params.routineid, match.params.id, data);
		if(updatedTraining.response) {
			setError(updatedTraining.response);
		}
		else {
			history.push(`/associate/routine/training/${match.params.routineid}`);
		}
	};

	return training ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar entrenamiento
			</CustomTypography>
			<TrainingForm training={training} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
}