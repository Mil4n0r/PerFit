import { Route } from 'react-router-dom';

import { UserTrackingList } from '../../components/tracking/UserTrackingList';
import { EditTracking } from '../../components/tracking/EditTracking';
import { DeleteTracking } from '../../components/tracking/DeleteTracking';
import { AssociateTrackingToUser } from '../../components/tracking/AssociateTrackingToUser';
import { TrackingInfo } from '../../components/tracking/TrackingInfo';

function TrackingRoutes() {
	return (
		<>
			<Route exact path="/tracking/list/:id" component={ UserTrackingList } />
			<Route exact path="/edit/tracking/:userid/:id" component={ EditTracking } />
			<Route exact path="/delete/tracking/:userid/:id" component={ DeleteTracking } />
			<Route exact path="/associate/tracking/:id" component={ AssociateTrackingToUser } />
			<Route exact path="/tracking/info/:id" component={ TrackingInfo } />
		</>
	)
}

export default TrackingRoutes;