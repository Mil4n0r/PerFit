import { Route } from 'react-router-dom';

import { ActivityList } from '../../components/activity/ActivityList';
import { CreateActivity } from '../../components/activity/CreateActivity';
import { EditActivity } from '../../components/activity/EditActivity';
import { ActivityInfo } from '../../components/activity/ActivityInfo';

function ActivityRoutes() {
	return (
		<>
			<Route path="/create/activity" component={ CreateActivity } />
			<Route path="/activity/list" component={ ActivityList } />
			<Route path="/activity/info/:id" component={ ActivityInfo } />
			<Route path="/edit/activity/:id" component={ EditActivity } />
		</>
	)
}

export default ActivityRoutes;