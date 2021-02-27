import { Route } from 'react-router-dom';

import { UserList } from '../../components/user/UserList';
import { Profile } from '../../components/user/Profile';
import { EditUser } from '../../components/user/EditUser';
import { DeleteUser } from '../../components/user/DeleteUser';

function UserRoutes() {
	return (
		<>
			<Route path="/edit/user/:id" component={ EditUser } />
			<Route path="/delete/user/:id" component={ DeleteUser } />
			<Route path="/user/profile/:id" component={ Profile } />
			<Route exact path="/user/list" component={ UserList } />
		</>
	)
}

export default UserRoutes;
