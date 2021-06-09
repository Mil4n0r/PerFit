import { Route } from 'react-router-dom';

import { CreateActivity } from '../../components/activity/CreateActivity';
import { EditActivity } from '../../components/activity/EditActivity';

function ActivityRoutes() {
	return (
		<>
			<Route path="/create/activity" component={ CreateActivity } />
			<Route path="/edit/activity/:id" component={ EditActivity } />
		</>
	)
}

export default ActivityRoutes;