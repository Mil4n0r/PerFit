import { Route } from 'react-router-dom';

import { Register } from '../../components/user/Register';
import { Login } from '../../components/user/Login';

function AuthenticationRoutes() {
	return (
		<>
			<Route path="/login" component={ Login } />
			<Route path="/register/step/:step" component={ Register } />
		</>
	)
}

export default AuthenticationRoutes;
