import React, {useState, useEffect} from 'react';
import { getSubscription } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const SubscriptionInfo = () => {

	const match = useRouteMatch();
	const [subscription, setSubscription] = useState();

	useEffect(() => {
		const fetchSubscription = async () => {
			const subscription = await getSubscription(match.params.id);
			setSubscription(subscription);
		}
		fetchSubscription();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
	<>
		<h1>Suscripción</h1>
		{
			subscription && (
				<>
					<p>Nombre: {subscription.subscriptionInfo.nombreSuscripcion}</p>
					<p>Descripción: {subscription.subscriptionInfo.descripcionSuscripcion}</p>
					<p>Coste: {subscription.subscriptionInfo.costeSuscripcion}</p>
					<p>Fecha límite: {subscription.subscriptionInfo.vencimientoSuscripcion}</p>
					{
						subscription.permission.includes('write') && (
							<Link to={`/edit/subscription/${subscription.subscriptionInfo._id}`}>Editar</Link>
						)
					}
					{
						subscription.permission.includes('delete') && (
							<Link to={`/delete/subscription/${subscription.subscriptionInfo._id}`}>Eliminar</Link>
						)
					}
				</>
			)
		}
	</>
	)
};