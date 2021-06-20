import { Route } from 'react-router-dom';

import { CreateSubscription } from '../../components/subscription/CreateSubscription';
import { EditSubscription } from '../../components/subscription/EditSubscription';

function SubscriptionRoutes() {
	return (
		<>
			<Route path="/create/subscription" component={ CreateSubscription } />
			<Route path="/edit/subscription/:id" component={ EditSubscription } />
		</>
	)
}

export default SubscriptionRoutes;