import { Route } from 'react-router-dom';

import { UserList } from '../../components/user/UserList';
import { FriendList } from '../../components/user/FriendList';
import { ClientList } from '../../components/user/ClientList';
import { Profile } from '../../components/user/Profile';
import { EditUser } from '../../components/user/EditUser';
import { DeleteFriend } from '../../components/user/DeleteFriend';

function UserRoutes() {
	return (
		<>
			<Route path="/edit/user/:id" component={ EditUser } />
			<Route path="/user/profile/:id" component={ Profile } />
			<Route exact path="/user/list" component={ UserList } />
			<Route exact path="/friend/list/:id" component={ FriendList } />
			<Route exact path="/client/list/:id" component={ ClientList } />
			<Route path="/delete/friend/:id/:id2" component={ DeleteFriend } />
		</>
	)
}

export default UserRoutes;
