import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { UserList } from './components/UserList';
import { CreateFood } from './components/CreateFood';
import { EditUser } from './components/EditUser';
import { DeleteUser } from './components/DeleteUser';
import { EditFood } from './components/EditFood';
import { DeleteFood } from './components/DeleteFood';
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
					loggedIn && loggedIn.rol === "socio" && (
						<>
							<Route path="/create/food" component={ CreateFood } />
							<Route path="/edit/food/:id" component={ EditFood } />
							<Route path="/delete/food/:id" component={ DeleteFood } />
							<Route path="/edit/user/:id" component={ EditUser } />
							<Route path="/delete/user/:id" component={ DeleteUser } />
							<Route path="/user/profile/:id" component={ Profile } />
							<Route exact path="/admin/list" component={ UserList } />
							<Route exact path="/food/list" component={ FoodList } />
							<Route path="/admin/logout" component={ LogOut } />
						</>
					)
				}
				{
					!loggedIn && (
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