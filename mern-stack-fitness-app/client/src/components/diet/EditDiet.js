import React, {useState, useEffect} from 'react';
import { getDiet, updateDiet } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { DietForm } from '../common/forms/diet/DietForm';

export const EditDiet = () => {
	const match = useRouteMatch();
	const [diet, setDiet] = useState();
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
		await updateDiet(data, match.params.id);
		history.push(`/diet/list/${match.params.userid}`);
	}

	return diet ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar rutina</h3>
				<DietForm diet={diet} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};