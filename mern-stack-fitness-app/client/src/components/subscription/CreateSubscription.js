import React from 'react';
import { useHistory } from 'react-router-dom';
import { createSubscription } from '../../api';
import { SubscriptionForm } from '../common/forms/subscription/SubscriptionForm';

export const CreateSubscription = () => {
	const history = useHistory();
	const onSubmit = async (data) => {
		await createSubscription(data);
		history.push("/subscription/list");
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear suscripción</h3>
				<SubscriptionForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}