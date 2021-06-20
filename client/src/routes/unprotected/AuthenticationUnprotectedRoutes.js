import { Route } from 'react-router-dom';

import { Register } from '../../components/user/Register';
import { Login } from '../../components/user/Login';
import { ForgotPassword } from '../../components/user/ForgotPassword';
import { ResetPassword } from '../../components/user/ResetPassword';

function AuthenticationRoutes() {
	return (
		<>
			<Route path="/login" component={ Login } />
			<Route path="/forgot/password" component={ ForgotPassword } />
			<Route path="/reset/password/:token" component={ ResetPassword } />
			<Route path="/register/step/:step" component={ Register } />
		</>
	)
}

export default AuthenticationRoutes;
