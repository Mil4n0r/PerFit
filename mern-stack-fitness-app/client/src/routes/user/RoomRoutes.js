import { Route } from 'react-router-dom';

import { RoomList } from '../../components/room/RoomList';
import { RoomInfo } from '../../components/room/RoomInfo';

function RoomRoutes() {
	return (
		<>
			<Route path="/room/list" component={ RoomList } />
			<Route path="/room/info/:id" component={ RoomInfo } />
		</>
	)
}

export default RoomRoutes;