import React from 'react';
import { useHistory } from 'react-router-dom';
import { createSubscription } from '../../api';
import { SubscriptionForm } from '../common/forms/subscription/SubscriptionForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateSubscription = () => {
	const history = useHistory();
	const onSubmit = async (data) => {
		await createSubscription(data);
		history.push("/subscription/list");
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear suscripción
			</CustomTypography>
			<SubscriptionForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}