import React, {useState, useEffect} from 'react';
import { getSubscription, updateSubscription } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { SubscriptionForm } from '../common/forms/subscription/SubscriptionForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const EditSubscription = () => {
	const match = useRouteMatch();
	const [subscription, setSubscription] = useState();
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
		await updateSubscription(data, match.params.id);
		history.push("/subscription/list");
	}

	return subscription ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar suscripción
			</CustomTypography>
			<SubscriptionForm subscription={subscription} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
};