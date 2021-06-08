import React, {useState, useEffect} from 'react';
import { getClass, updateClass } from '../../api'; 
import { useRouteMatch, useHistory } from 'react-router-dom';
import { ClassForm } from '../common/forms/class/ClassForm';

import { BodyContainer, CustomTypography } from '../../style/style';

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
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Editar clase
			</CustomTypography>
			<ClassForm sclass={sclass} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
};