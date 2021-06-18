import React, {useState} from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createClass } from '../../api';
import { ClassForm } from '../common/forms/class/ClassForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CreateClass = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const createdClass = await createClass(data);
		if(createdClass.response) {
			setError(createdClass.response);
		}
		else {
			history.push("/class/list");
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear clase
			</CustomTypography>
			<ClassForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}