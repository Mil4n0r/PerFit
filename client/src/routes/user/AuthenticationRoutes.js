import { Route } from 'react-router-dom';

import { Logout } from '../../components/user/Logout';

function AuthenticationRoutes() {
	return (
		<>
			<Route path="/logout" component={ Logout } />
		</>
	)
}

export default AuthenticationRoutes;
