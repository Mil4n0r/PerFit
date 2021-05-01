import { Route } from 'react-router-dom';

import { CreateSubscription } from '../../components/subscription/CreateSubscription';
import { EditSubscription } from '../../components/subscription/EditSubscription';
import { DeleteSubscription } from '../../components/subscription/DeleteSubscription';
import { SubscriptionInfo } from '../../components/subscription/SubscriptionInfo';

function SubscriptionRoutes() {
	return (
		<>
			<Route path="/create/subscription" component={ CreateSubscription } />
			<Route path="/edit/subscription/:id" component={ EditSubscription } />
			<Route path="/subscription/info/:id" component={ SubscriptionInfo } />
			<Route path="/delete/subscription/:id" component={ DeleteSubscription } />
		</>
	)
}

export default SubscriptionRoutes;