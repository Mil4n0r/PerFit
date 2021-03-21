import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/common/layout/Home';

import ExerciseRoutes from './routes/user/ExerciseRoutes';
import RoutineRoutes from './routes/admin/RoutineRoutes';
import DietRoutes from './routes/admin/DietRoutes';
import FoodRoutes from './routes/user/FoodRoutes';
import UserRoutes from './routes/admin/UserRoutes';
import AuthenticationRoutes from './routes/unprotected/AuthenticationRoutes';

import AuthContext from "./context/AuthContext";

function Router() {

	const { loggedIn } = useContext(AuthContext);
	// DIFERENCIAR ENTRE 'socio', 'entrenador_personal', 'monitor', 'moderador', 'admin'
    return(
        <div>
			<Switch>
				<Route exact path="/" component={ Home } />
				{
					loggedIn && (//loggedIn.rol === "socio" && (
						<>
							{ExerciseRoutes()}
							{RoutineRoutes()}
							{DietRoutes()}
							{FoodRoutes()}
							{UserRoutes()}
						</>
					)
				}
				{
					!loggedIn && (
						<>
							{AuthenticationRoutes()}
						</>
					)
				}
			</Switch>
		</div>
    )
}

export default Router;