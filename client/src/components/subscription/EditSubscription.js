import React, {useState, useEffect} from 'react';
import { getSubscription, updateSubscription } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { SubscriptionForm } from '../common/forms/subscription/SubscriptionForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditSubscription = () => {
	const match = useRouteMatch();
	const [subscription, setSubscription] = useState();
	const [error, setError] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchSubscription = async () => {
			const subscription = await getSubscription(match.params.id);
			setSubscription(subscription);
		}
		fetchSubscription();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const updatedSubscription = await updateSubscription(data, match.params.id);
		if(updatedSubscription.response) {
			setError(updatedSubscription.response);
		}
		else {
			history.push("/subscription/list");
		}
	}

	return subscription ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar suscripción
			</CustomTypography>
			<SubscriptionForm subscription={subscription} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};