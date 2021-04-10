import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/common/layout/Home';

import ExerciseRoutes from './routes/user/ExerciseRoutes';
import RoutineRoutes from './routes/admin/RoutineRoutes';
import DietRoutes from './routes/admin/DietRoutes';
import FoodRoutes from './routes/user/FoodRoutes';
import UserRoutes from './routes/admin/UserRoutes';
import AuthenticationRoutes from './routes/unprotected/AuthenticationRoutes';
import ActivityRoutes from './routes/admin/ActivityRoutes';

import AuthContext from './context/AuthContext';
import TrackingRoutes from './routes/admin/TrackingRoutes';
import MeasureRoutes from './routes/user/MeasureRoutes';
import RoomRoutes from './routes/admin/RoomRoutes';

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
							{ActivityRoutes()}
							{ExerciseRoutes()}
							{RoutineRoutes()}
							{DietRoutes()}
							{FoodRoutes()}
							{UserRoutes()}
							{TrackingRoutes()}
							{MeasureRoutes()}
							{RoomRoutes()}
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