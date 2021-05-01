import { Route } from 'react-router-dom';

import { SubscriptionList } from '../../components/subscription/SubscriptionList';


function SubscriptionUnprotectedRoutes() {
	return (
		<>
			<Route path="/subscription/list" component={ SubscriptionList } />
		</>
	)
}

export default SubscriptionUnprotectedRoutes;