import { Route } from 'react-router-dom';

import { RoomList } from '../../components/room/RoomList';
import { CreateRoom } from '../../components/room/CreateRoom';
import { EditRoom } from '../../components/room/EditRoom';
import { RoomInfo } from '../../components/room/RoomInfo';

function RoomRoutes() {
	return (
		<>
			<Route path="/create/room" component={ CreateRoom } />
			<Route path="/room/list" component={ RoomList } />
			<Route path="/room/info/:id" component={ RoomInfo } />
			<Route path="/edit/room/:id" component={ EditRoom } />
		</>
	)
}

export default RoomRoutes;