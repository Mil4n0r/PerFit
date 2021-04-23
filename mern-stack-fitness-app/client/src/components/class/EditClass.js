import React, {useState, useEffect} from 'react';
import { getClass, updateClass } from '../../api'; 
import { useRouteMatch, useHistory } from 'react-router-dom';
import { ClassForm } from '../common/forms/class/ClassForm';

export const EditClass = () => {
	const match = useRouteMatch();
	const [sclass, setClass] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchClass = async () => {
			const sclass = await getClass(match.params.id);
			setClass(sclass);
		}
		fetchClass();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateClass(data, match.params.id);
		history.push("/class/list");
	}

	return sclass ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar clase</h3>
				<ClassForm sclass={sclass} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};