import { Route } from 'react-router-dom';

import { SubscriptionList } from '../../components/subscription/SubscriptionList';
import { SubscriptionInfo } from '../../components/subscription/SubscriptionInfo';

function SubscriptionRoutes() {
	return (
		<>
			<Route path="/subscription/list" component={ SubscriptionList } />
			<Route path="/subscription/info/:id" component={ SubscriptionInfo } />
		</>
	)
}

export default SubscriptionRoutes;