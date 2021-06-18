import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { createSubscription } from '../../api';
import { SubscriptionForm } from '../common/forms/subscription/SubscriptionForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CreateSubscription = () => {
	const history = useHistory();

	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const createdSubscription = await createSubscription(data);
		if(createdSubscription.response) {
			setError(createdSubscription.response);
		}
		else {
			history.push("/subscription/list");
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear suscripción
			</CustomTypography>
			<SubscriptionForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}