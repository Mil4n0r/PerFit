import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/common/layout/Home';

import ExerciseRoutes from './routes/user/ExerciseRoutes';
import RoutineRoutes from './routes/admin/RoutineRoutes';
import DietRoutes from './routes/admin/DietRoutes';
import FoodRoutes from './routes/user/FoodRoutes';
import UserRoutes from './routes/admin/UserRoutes';
import AuthenticationRoutes from './routes/unprotected/AuthenticationRoutes';
import AuthenticationProtectedRoutes from './routes/unprotected/AuthenticationProtectedRoutes';
import ActivityRoutes from './routes/admin/ActivityRoutes';
import ClassRoutes from './routes/admin/ClassRoutes';

import AuthContext from './context/AuthContext';
import TrackingRoutes from './routes/admin/TrackingRoutes';
import MeasureRoutes from './routes/user/MeasureRoutes';
import RoomRoutes from './routes/admin/RoomRoutes';
import SubscriptionRoutes from './routes/admin/SubscriptionRoutes';
import SubscriptionUnprotectedRoutes from './routes/unprotected/SubscriptionUnprotectedRoutes';
import RequestRoutes from './routes/admin/RequestRoutes';

function Router() {

	const { loggedIn } = useContext(AuthContext);
	// DIFERENCIAR ENTRE 'Miembro', 'Entrenador', 'Monitor', 'Administrador'
    return(
        <div>
			<Switch>
				<Route exact path="/" component={ Home } />
				{
					loggedIn && (//loggedIn.role === "Miembro" && (
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
							{ClassRoutes()}
							{SubscriptionRoutes()}
							{SubscriptionUnprotectedRoutes()}
							{RequestRoutes()}
							{AuthenticationProtectedRoutes()}
						</>
					)
				}
				{
					!loggedIn && (
						<>
							{AuthenticationRoutes()}
							{SubscriptionUnprotectedRoutes()}
						</>
					)
				}
			</Switch>
		</div>
    )
}

export default Router;