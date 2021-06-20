import { Route } from 'react-router-dom';

import { CreateRoom } from '../../components/room/CreateRoom';
import { EditRoom } from '../../components/room/EditRoom';

function RoomRoutes() {
	return (
		<>
			<Route path="/create/room" component={ CreateRoom } />
			<Route path="/edit/room/:id" component={ EditRoom } />
		</>
	)
}

export default RoomRoutes;