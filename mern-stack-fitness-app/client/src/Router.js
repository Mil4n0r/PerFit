import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/common/layout/Home';

import ExerciseRoutes from './routes/admin/ExerciseRoutes';
import RoutineRoutes from './routes/admin/RoutineRoutes';
import FoodRoutes from './routes/member/FoodRoutes';
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