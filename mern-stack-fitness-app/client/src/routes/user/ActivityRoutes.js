import { Route } from 'react-router-dom';

import { ActivityList } from '../../components/activity/ActivityList';
import { ActivityInfo } from '../../components/activity/ActivityInfo';

function ActivityRoutes() {
	return (
		<>
			<Route path="/activity/list" component={ ActivityList } />
			<Route path="/activity/info/:id" component={ ActivityInfo } />
		</>
	)
}

export default ActivityRoutes;