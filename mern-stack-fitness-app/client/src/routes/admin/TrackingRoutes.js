import { Route } from 'react-router-dom';

import { CreateTracking } from '../../components/tracking/CreateTracking';
import { TrackingList } from '../../components/tracking/TrackingList';
import { UserTrackingList } from '../../components/tracking/UserTrackingList';
import { EditTracking } from '../../components/tracking/EditTracking';
import { DeleteTracking } from '../../components/tracking/DeleteTracking';
import { AssociateTrackingToUser } from '../../components/tracking/AssociateTrackingToUser';

/*
	<Route path="/create/tracking" component={ CreateTracking } />
*/

function TrackingRoutes() {
	return (
		<>
			<Route exact path="/tracking/list" component={ TrackingList } />
			<Route exact path="/tracking/list/:id" component={ UserTrackingList } />
			<Route path="/edit/tracking/:id" component={ EditTracking } />
			<Route path="/delete/tracking/:id" component={ DeleteTracking } />
			<Route exact path="/associate/tracking/:id" component={ AssociateTrackingToUser } />
		</>
	)
}

export default TrackingRoutes;