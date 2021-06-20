import React, {useState, useEffect} from 'react';
import { getClass, checkClassAssistance } from '../../api'; 
import { useRouteMatch, useHistory } from 'react-router-dom';
import { ClassAssistanceForm } from '../common/forms/class/ClassAssistanceForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CheckClassAssistance = () => {
	const match = useRouteMatch();
	const [sclass, setClass] = useState();
	const [error, setError] = useState();
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
		const checkedClass = await checkClassAssistance(data, match.params.id);
		if(checkedClass.response) {
			setError(checkedClass.response);
		}
		else {
			history.push("/class/list");
		}
	}

	return sclass ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Pasar asistencia de la clase
			</CustomTypography>
			<ClassAssistanceForm sclass={sclass} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};