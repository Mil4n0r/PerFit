import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { UserList } from './components/UserList';
import { CreateFood } from './components/CreateFood';
import { EditUser } from './components/EditUser';
import { DeleteUser } from './components/DeleteUser';
import { Login } from './components/Login';
import { LogOut } from './components/Logout';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import { FoodList } from './components/FoodList';

import AuthContext from "./context/AuthContext";

function Router() {

	const { loggedIn } = useContext(AuthContext);
	// DIFERENCIAR ENTRE 'socio', 'entrenador_personal', 'monitor', 'moderador', 'admin'
    return(
        <div>
			<Switch>
				<Route exact path="/" component={ Home } />
				{
					loggedIn === "socio" && (
						<>
							<Route path="/edit/:id" component={ EditUser } />
							<Route path="/create" component={ CreateFood } />
							<Route path="/delete/:id" component={ DeleteUser } />
							<Route path="/user/profile/:id" component={ Profile } />
							<Route exact path="/admin/list" component={ UserList } />
							<Route exact path="/list" component={ FoodList } />
							<Route path="/logout" component={ LogOut } />
						</>
					)
				}
				{
					loggedIn === false && (
						<>
							<Route path="/login" component={ Login } />
							<Route path="/register" component={ Register } />
						</>
					)
				}
			</Switch>
		</div>
    )
}

export default Router;