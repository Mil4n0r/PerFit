import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { getRation, updateRation } from '../../api';
import { RationForm } from '../common/forms/meal/RationForm';

export const EditRation = () => {
	const match = useRouteMatch();
	const [ration, setRation] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchRation = async() => {
			const ration = await getRation(match.params.id);
			setRation(ration);
		}
		fetchRation();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateRation(data, match.params.id);
		history.push(`/associate/meal/food/${match.params.mealid}`);
	};

	return ration ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar comidas</h3>
                <RationForm ration={ration} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
}