import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addTraining, getExercises } from '../../api';
import { TrainingForm } from '../common/forms/training/TrainingForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateTraining = () => {
	const match = useRouteMatch();
	const [exercises, setExercises] = useState();	
	const history = useHistory();
	
	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await getExercises();
			setExercises(exercises);
		}
		fetchExercises();	// Llamamos aparte a fetchUser para no hacer el useEffect completo asíncrono (práctica no recomendada)
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await addTraining(data, match.params.id); // ID rutina
		history.push(`/associate/routine/training/${match.params.id}`);
	};

	return exercises ? (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Crear entrenamiento
			</CustomTypography>
			<TrainingForm onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
}