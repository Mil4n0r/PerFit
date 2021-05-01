import React, {useState, useEffect} from 'react';
import { getSubscription, updateSubscription } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { SubscriptionForm } from '../common/forms/subscription/SubscriptionForm';

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
		<div className="container">
			<div className="mt-3">
				<h3>Editar suscripción</h3>
				<SubscriptionForm subscription={subscription} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};