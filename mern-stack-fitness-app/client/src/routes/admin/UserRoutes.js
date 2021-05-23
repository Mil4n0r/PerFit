import { Route } from 'react-router-dom';

import { UserList } from '../../components/user/UserList';
import { FriendList } from '../../components/user/FriendList';
import { Profile } from '../../components/user/Profile';
import { EditUser } from '../../components/user/EditUser';
import { DeleteUser } from '../../components/user/DeleteUser';
import { DeleteFriend } from '../../components/user/DeleteFriend';

function UserRoutes() {
	return (
		<>
			<Route path="/edit/user/:id" component={ EditUser } />
			<Route path="/delete/user/:id" component={ DeleteUser } />
			<Route path="/user/profile/:id" component={ Profile } />
			<Route exact path="/user/list" component={ UserList } />
			<Route exact path="/friend/list/:id" component={ FriendList } />
			<Route path="/delete/friend/:id/:id2" component={ DeleteFriend } />
		</>
	)
}

export default UserRoutes;
